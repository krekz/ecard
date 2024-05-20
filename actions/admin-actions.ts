"use server";
import { auth } from "@/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import prisma from "../prisma";
import {
  upsertDesignSchema,
  deleteDesignSchema,
} from "../schema/zod/admin-form";
import { revalidatePath } from "next/cache";

export const uploadDesign = async (formData: FormData) => {
  // BUG: formdata plain object
  try {
    const session = await auth();
    if (!session) {
      throw new Error("Unauthorized");
    }

    const values = Object.fromEntries(formData.entries());
    const { category, design_name, front_design, content_design, thumbnail } =
      upsertDesignSchema.parse(values);

    // TODO: session role != admin
    //TODO:  dynamically change the designId

    if (!front_design || !content_design) {
      return NextResponse.json({ error: "Image is required" });
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
        return NextResponse.json({ error: error.message });
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
  } catch (error) {
    console.error(error);
  }
};

export const updateDesign = async (formData: FormData) => {
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
  try {
    const session = await auth();
    if (!session) throw new Error("Unauthorized access");

    // TODO : Role admin

    const values = Object.fromEntries(formData.entries());
    const { choose_design } = deleteDesignSchema.parse(values);
    const supabase = createClient();

    const { data: list } = await supabase.storage
      .from("e-card bucket")
      .list(`design/${choose_design.toLowerCase()}`);

    const filesToRemove = list?.map(
      (img) => `design/${choose_design.toLowerCase()}/${img.name}`
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
      where: { designId: choose_design },
    });
  } catch (error) {
    console.log(error);
  }

  revalidatePath("/auth/admin/upload-design");
};
