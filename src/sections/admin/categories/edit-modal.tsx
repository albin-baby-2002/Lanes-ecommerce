"use client";
import React, { useEffect } from "react";
import AddOrEditCategoryModal from "./add-edit-category";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { categoriesReducers } from "@/store/slices/admin/categories";
import { categories } from "@/drizzle/schema";

export type TCategory = typeof categories.$inferSelect;

interface TProps {
  categoriesData: TCategory[];
}

const EditModal: React.FC<TProps> = ({ categoriesData }) => {
  const { categoryToEdit, showEditCategory } = useSelector(
    (state: RootState) => state.categories,
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <AddOrEditCategoryModal
      type="edit"
      hideTrigger
      open={showEditCategory}
      categoryToEdit={categoriesData.find((item) => item.id === categoryToEdit)}
      toggleClose={() => {
        dispatch(categoriesReducers.toggleShowEditCategory());
      }}
    />
  );
};

export default EditModal;
