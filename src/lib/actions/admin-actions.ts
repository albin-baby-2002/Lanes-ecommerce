"use server";

import { TCategoryData } from "@/sections/admin/categories/add-edit-category";

export const createCategory = async (category: TCategoryData) => {
  try {
    return new Response(
      JSON.stringify({
        message: "failed",
      }),
      { status: 400 },
    );
  } catch (error: any) {
    throw error;
    console.log(error, "error");
  }
};
