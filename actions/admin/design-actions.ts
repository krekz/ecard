"use server";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../prisma";
import {
  deleteDesignSchema,
  updateDesignSchema,
  uploadDesignSchema,
} from "../../schema/zod/admin-form";
import { revalidatePath } from "next/cache";

export const getAllDesigns = async () => {
  const cards = await prisma.design.findMany({
    take: 12,
    select: {
      designId: true,
      category: true,
      name: true,
      thumbnail_url: true,
      front_design_url: true,
    },
  });

  return cards;
};

export const uploadDesign = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());
  const {
    category,
    design_name,
    front_design_url,
    content_design_url,
    thumbnail_url,
  } = uploadDesignSchema.parse(values);

  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const existedDesign = await prisma.design.findUnique({
      where: {
        designId: design_name.toLowerCase(),
      },
    });

    if (existedDesign)
      return {
        ok: false,
        message: "Design already exists",
      };
    // TODO: session role != admin
    //TODO:  dynamically change the designId

    if (!front_design_url || !content_design_url || !thumbnail_url) {
      return {
        ok: false,
        message: "Image is required",
      };
    }
    const design_LOWERCASE = design_name.toLowerCase();
    const design_UPPERCASE = design_name.toUpperCase();

    const supabase = createClient();

    const images = { thumbnail_url, front_design_url, content_design_url };
    let imagesUrl: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(images)) {
      if (value) {
        const { data, error } = await supabase.storage
          .from("e-card bucket")
          .upload(
            `design/${design_LOWERCASE}/${key}-${uuidv4()}`,
            value as File
          );

        if (data) {
          imagesUrl[key] = data.path;
        } else {
          console.log(error);
          return {
            ok: false,
            message: "Error uploading images",
          };
        }
      }
    }

    await prisma.design.create({
      data: {
        designId: design_LOWERCASE,
        name: design_UPPERCASE,
        thumbnail_url: imagesUrl.thumbnail_url,
        front_design_url: imagesUrl.front_design_url,
        content_design_url: imagesUrl.content_design_url,
        category: category,
      },
    });

    revalidatePath("/auth/admin/upload-design");
    return {
      ok: true,
      message: "Design uploaded successfully",
    };
  } catch (error) {
    console.error(error);
  }
};

export const deleteDesign = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());
  const { choose_design } = deleteDesignSchema.parse(values);
  const supabase = createClient();
  const chooseDesign = choose_design.toLowerCase();
  try {
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");

    const design = await prisma.design.findUnique({
      where: {
        designId: chooseDesign,
      },
    });

    if (!design)
      return {
        ok: false,
        message: "Design not found",
      };

    // TODO : Role admin
    const { data: list } = await supabase.storage
      .from("e-card bucket")
      .list(`design/${chooseDesign}`);

    const filesToRemove = list?.map(
      (img) => `design/${chooseDesign}/${img.name}`
    );

    const { data, error } = await supabase.storage
      .from("e-card bucket")
      .remove(filesToRemove as string[]);
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }

    await prisma.design.delete({
      where: { designId: chooseDesign },
    });

    revalidatePath("/user/cards");
    revalidatePath("/catalog");
    revalidatePath("/auth/admin/upload-design");
    return {
      ok: true,
      message: "Design deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error deleting design",
    };
  }
};

export const updateDesign = async (formData: FormData, designName: string) => {
  const values = Object.fromEntries(formData.entries());
  const {
    category,
    design_name,
    front_design_url,
    content_design_url,
    thumbnail_url,
  } = updateDesignSchema.parse(values);
  const newDesignName = design_name.toUpperCase();
  const design_LOWERCASE = designName.toLowerCase();
  const newDesign_LOWERCASE = design_name.toLowerCase();

  try {
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");

    const design = await prisma.design.findUnique({
      where: {
        designId: design_LOWERCASE,
      },
    });

    if (!design)
      return {
        ok: false,
        message: "Design not found",
      };
    const supabase = createClient();

    const updateData: { [key: string]: any } = {
      category,
      name: newDesignName,
      designId: newDesign_LOWERCASE,
    };

    const images = { thumbnail_url, front_design_url, content_design_url };
    let imagesUrl: { [key: string]: string } = {};

    // Rename folder if design name has changed
    if (design_LOWERCASE !== newDesign_LOWERCASE) {
      const { data: files, error: listError } = await supabase.storage
        .from("e-card bucket")
        .list(`design/${design_LOWERCASE}`);

      if (listError) {
        console.error(listError);
        return {
          ok: false,
          message: "Failed to list existing files",
        };
      }

      const defaultPath = `design/${design_LOWERCASE}`;
      for (const file of files) {
        let getFileName = file.name.split("-")[0];
        const newPath = `design/${newDesign_LOWERCASE}/${file.name}`;
        const { error: moveError } = await supabase.storage
          .from("e-card bucket")
          .move(`${defaultPath}/${file.name}`, newPath);

        if (moveError) {
          console.error(moveError);
          return {
            ok: false,
            message: "Failed to rename design folder",
          };
        }
        updateData[getFileName] = newPath;
        console.log("test", updateData[getFileName]);
      }
    }

    for (const [key, value] of Object.entries(images)) {
      if (value) {
        const { data: existingImage, error: checkError } =
          await supabase.storage
            .from("e-card bucket")
            .list(`design/${design_LOWERCASE}`, {
              search: `${key}-`,
            });

        if (checkError) {
          console.log(checkError);
          return {
            ok: false,
            message: "Error checking existing images",
          };
        }

        // If the image exists, remove it
        if (existingImage && existingImage.length > 0) {
          const { error: removeError } = await supabase.storage
            .from("e-card bucket")
            .remove(
              existingImage.map(
                (img) => `design/${design_LOWERCASE}/${img.name}`
              )
            );

          if (removeError) {
            console.log(removeError);
            return {
              ok: false,
              message: "Error removing existing images",
            };
          }
        }

        const { data, error } = await supabase.storage
          .from("e-card bucket")
          .upload(
            `design/${newDesign_LOWERCASE}/${key}-${uuidv4()}`,
            value as File
          );

        if (data) {
          imagesUrl[key] = data.path;
        } else {
          console.log(error);
          return {
            ok: false,
            message: "Error uploading images",
          };
        }
      }
    }

    if (imagesUrl.thumbnail_url)
      updateData.thumbnail_url = imagesUrl.thumbnail_url;
    if (imagesUrl.front_design_url)
      updateData.front_design_url = imagesUrl.front_design_url;
    if (imagesUrl.content_design_url)
      updateData.content_design_url = imagesUrl.content_design_url;

    await prisma.design.update({
      where: {
        designId: design_LOWERCASE,
      },
      data: updateData,
    });

    revalidatePath("/auth/admin/upload-design");
    return {
      ok: true,
      message: "Design updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error updating design",
    };
  }
};
