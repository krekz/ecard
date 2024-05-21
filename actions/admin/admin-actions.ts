"use server";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../prisma";
import {
  upsertDesignSchema,
  deleteDesignSchema,
} from "../../schema/zod/admin-form";
import { revalidatePath } from "next/cache";

export const uploadDesign = async (formData: FormData) => {
  const values = Object.fromEntries(formData.entries());
  const { category, design_name, front_design, content_design, thumbnail } =
    upsertDesignSchema.parse(values);

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

export const updateDesign = async (formData: FormData) => {
  // INCOMPLETE
  const values = Object.fromEntries(formData.entries());
  const { category, design_name, thumbnail, front_design, content_design } =
    upsertDesignSchema.parse(values);
  try {
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");
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

    if (!design) throw new Error("Design not found");

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
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/user/cards");
  revalidatePath("/auth/admin/upload-design");
};
