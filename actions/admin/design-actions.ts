"use server";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../prisma";
import {
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

export const getDesign = async (designId: string | string[] | undefined) => {
  const design = await prisma.design.findUnique({
    where: { designId: designId as string },
    select: {
      front_design_url: true,
      content_design_url: true,
    },
  });
  return design;
};

export const uploadDesign = async (formData: FormData) => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized access");
  if (session.user.role === "user") {
    throw new Error("You have no right access");
  }

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

    const designId = design_name.toLowerCase();
    const designNameUpper = design_name.toUpperCase();

    const existedDesign = await prisma.design.findUnique({
      where: { designId },
    });

    if (existedDesign) {
      return { ok: false, message: "Design already exists" };
    }

    if (!front_design_url || !content_design_url || !thumbnail_url) {
      return { ok: false, message: "Image is required" };
    }

    const supabase = createClient();
    const images = { thumbnail_url, front_design_url, content_design_url };
    const imageUploadPromises = Object.entries(images).map(
      async ([key, value]) => {
        if (value) {
          const { data, error } = await supabase.storage
            .from(`${process.env.NEXT_PUBLIC_BUCKET_NAME}`)
            .upload(`design/${designId}/${key}-${uuidv4()}`, value as File);

          if (error) {
            throw new Error(`Error uploading ${key}: ${error.message}`);
          }

          return { [key]: data.path };
        }
        return {};
      }
    );

    const imagesUrl = (await Promise.all(imageUploadPromises)).reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    );

    await prisma.design.create({
      data: {
        designId,
        name: designNameUpper,
        thumbnail_url: imagesUrl.thumbnail_url,
        front_design_url: imagesUrl.front_design_url,
        content_design_url: imagesUrl.content_design_url,
        category,
      },
    });

    revalidatePath("/admin/designs");
    return { ok: true, message: "Design uploaded successfully" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: `Error uploading design` };
  }
};
export const deleteDesign = async (formData: FormData) => {
  const session = await auth();
  if (!session) throw new Error("Unauthorized access");
  if (session.user.role === "user") {
    throw new Error("You have no right access");
  }
  const designId = formData.get("designId");
  if (!designId) throw new Error("Design not found");
  const supabase = createClient();

  try {
    const design = await prisma.design.findUnique({
      where: {
        designId: designId as string,
      },
    });

    if (!design)
      return {
        ok: false,
        message: "Design not found",
      };

    const { data: list } = await supabase.storage
      .from(`${process.env.NEXT_PUBLIC_BUCKET_NAME}`)
      .list(`design/${designId}`);

    const filesToRemove = list?.map((img) => `design/${designId}/${img.name}`);

    const { data, error } = await supabase.storage
      .from(`${process.env.NEXT_PUBLIC_BUCKET_NAME}`)
      .remove(filesToRemove as string[]);
    if (data) {
      console.log(data);
    } else {
      console.log(error);
    }

    await prisma.design.delete({
      where: { designId: designId as string },
    });

    revalidatePath("/admin/designs");
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
  const session = await auth();
  if (!session || session.user.role === "user")
    throw new Error("Unauthorized access");

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
    const [design, existingDesignWithNewName] = await Promise.all([
      prisma.design.findUnique({ where: { designId: design_LOWERCASE } }),
      design_LOWERCASE !== newDesign_LOWERCASE
        ? prisma.design.findUnique({ where: { designId: newDesign_LOWERCASE } })
        : null,
    ]);

    if (!design) {
      return { ok: false, message: "Design not found" };
    }

    if (existingDesignWithNewName) {
      return {
        ok: false,
        message: "Design with the new name already exists",
      };
    }

    const supabase = createClient();
    const updateData: { [key: string]: any } = {
      category,
      name: newDesignName,
      designId: newDesign_LOWERCASE,
    };

    const images = { thumbnail_url, front_design_url, content_design_url };
    const imagesUrl: { [key: string]: string } = {};

    // Rename folder if design name has changed
    if (design_LOWERCASE !== newDesign_LOWERCASE) {
      const { data: files, error: listError } = await supabase.storage
        .from(`${process.env.NEXT_PUBLIC_BUCKET_NAME}`)
        .list(`design/${design_LOWERCASE}`);

      if (listError) {
        console.error(listError);
        return { ok: false, message: "Failed to list existing files" };
      }

      const renamePromises = files.map(async (file) => {
        const newPath = `design/${newDesign_LOWERCASE}/${file.name}`;
        const { error: moveError } = await supabase.storage
          .from(`${process.env.NEXT_PUBLIC_BUCKET_NAME}`)
          .move(`design/${design_LOWERCASE}/${file.name}`, newPath);

        if (moveError) {
          throw new Error(`Failed to rename file: ${file.name}`);
        }

        const key = file.name.split("-")[0];
        updateData[key] = newPath;
      });

      await Promise.all(renamePromises);
    }

    const imageUploadPromises = Object.entries(images).map(
      async ([key, value]) => {
        if (value) {
          const { data: existingImage, error: checkError } =
            await supabase.storage
              .from(`${process.env.NEXT_PUBLIC_BUCKET_NAME}`)
              .list(`design/${design_LOWERCASE}`, { search: `${key}-` });

          if (checkError) {
            throw new Error(
              `Error checking existing images: ${checkError.message}`
            );
          }

          if (existingImage && existingImage.length > 0) {
            const removePaths = existingImage.map(
              (img) => `design/${design_LOWERCASE}/${img.name}`
            );
            const { error: removeError } = await supabase.storage
              .from(`${process.env.NEXT_PUBLIC_BUCKET_NAME}`)
              .remove(removePaths);

            if (removeError) {
              throw new Error(
                `Error removing existing images: ${removeError.message}`
              );
            }
          }

          const { data, error } = await supabase.storage
            .from(`${process.env.NEXT_PUBLIC_BUCKET_NAME}`)
            .upload(
              `design/${newDesign_LOWERCASE}/${key}-${uuidv4()}`,
              value as File
            );

          if (error) {
            throw new Error(`Error uploading ${key}: ${error.message}`);
          }

          imagesUrl[key] = data.path;
        }
      }
    );

    await Promise.all(imageUploadPromises);

    Object.assign(updateData, imagesUrl);

    await prisma.design.update({
      where: { designId: design_LOWERCASE },
      data: updateData,
    });

    revalidatePath("/admin/designs");
    return { ok: true, message: "Design updated successfully" };
  } catch (error) {
    console.error(error);
    return { ok: false, message: `Error updating design` };
  }
};
