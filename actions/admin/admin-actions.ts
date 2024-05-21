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

export const uploadDesign = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());
  const { category, design_name, front_design, content_design, thumbnail } =
    uploadDesignSchema.parse(values);

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

    if (!front_design || !content_design || !thumbnail) {
      return {
        ok: false,
        message: "Image is required",
      };
    }
    const titleToLower = design_name.toLowerCase();
    const titleToUpper = design_name.toUpperCase();

    const supabase = createClient();

    const images = [thumbnail, front_design, content_design];
    const imageKeys = ["thubmnail", "front", "content"];

    let imagesUrl = [];
    for (let i = 0; i < images.length; i++) {
      const { data, error } = await supabase.storage
        .from("e-card bucket")
        .upload(
          `design/${titleToLower}/${imageKeys[i]}-${uuidv4()}`,
          images[i] as File
        );

      if (data) {
        console.log(data);
        imagesUrl.push(data);
      } else {
        console.log(error);
        return {
          ok: false,
          message: "Error uploading images",
        };
      }
    }

    await prisma.design.create({
      data: {
        designId: titleToLower,
        name: titleToUpper,
        thumbnail: imagesUrl[0].path,
        front_design_url: imagesUrl[1].path,
        content_design_url: imagesUrl[2].path,
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
  console.log(values);
  const { choose_design } = deleteDesignSchema.parse(values);
  const supabase = createClient();
  const chooseDesign = choose_design.toLowerCase();
  console.log(chooseDesign);
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
  // TODO: admin role
  const values = Object.fromEntries(formData.entries());
  const { category, design_name, front_design, content_design, thumbnail } =
    updateDesignSchema.parse(values);
  const newDesignName = design_name.toUpperCase();
  const design_LOWERCASE = designName.toLowerCase();

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

    const images = { thumbnail, front_design, content_design };
    let imagesUrl: { [key: string]: string } = {};

    for (const [key, value] of Object.entries(images)) {
      if (value) {
        const { data, error } = await supabase.storage
          .from("e-card bucket")
          .upload(`design/${design_LOWERCASE}/${key}-${uuidv4()}`, value as File);

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

    const updateData: { [key: string]: any } = {
      category,
      name: newDesignName,
    };

    if (imagesUrl.thumbnail) updateData.thumbnail = imagesUrl.thumbnail;
    if (imagesUrl.front_design)
      updateData.front_design_url = imagesUrl.front_design;
    if (imagesUrl.content_design)
      updateData.content_design_url = imagesUrl.content_design;

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
