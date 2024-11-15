"use client";
import React, { useMemo } from "react";
import AddOrEditCategoryModal from "./add-edit-category-modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { categoriesReducers } from "@/store/slices/admin/categories";
import { categories } from "@/drizzle/schema";
import ConfirmationModal from "@/components/ui/confirmation-modal";
import { deleteCategory } from "@/lib/actions/admin/category-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type TCategory = typeof categories.$inferSelect;

interface TProps {
  categoriesData: TCategory[];
}

const CategoryActionModals: React.FC<TProps> = ({ categoriesData }) => {
  const router = useRouter();

  // redux states and hooks
  const dispatch = useDispatch<AppDispatch>();

  const {
    categoryToEdit,
    showEditCategory,
    pendingDeleting,
    showDeleteCategoryConfirmation,
    categoryToDelete,
  } = useSelector((state: RootState) => state.categories);

  // data

  const categoryToDeleteInfo = useMemo(() => {
    return categoriesData.find((cat) => cat.categoryId === categoryToDelete);
  }, [categoryToDelete, categoriesData]);

  // fns

  const closeDeleteConfirmation = () => {
    dispatch(categoriesReducers.toggleDeleteCategoryConfirmation());
    dispatch(categoriesReducers.setCategoryToDelete(null));
  };

  // handle delete

  const handleDelete = async () => {
    dispatch(categoriesReducers.togglePendingDeleting());

    if (!categoryToDelete) return toast.error("Unexpected error try again");

    const resp = await deleteCategory(categoryToDelete);

    if (resp.success) {
      toast.success("Successfully deleted the category");
      router.refresh();
      dispatch(categoriesReducers.togglePendingDeleting());
      return closeDeleteConfirmation();
    }

    toast.error(resp.message);
    dispatch(categoriesReducers.togglePendingDeleting());
  };

  //------------------------------------------------------------------------------------

  return (
    <>
      <AddOrEditCategoryModal
        type="edit"
        open={showEditCategory}
        categoryToEdit={categoriesData.find(
          (item) => item.categoryId === categoryToEdit,
        )}
        toggleClose={() => {
          dispatch(categoriesReducers.toggleShowEditCategory());
          dispatch(categoriesReducers.setCategoryToEdit(null));
        }}
      />

      <ConfirmationModal
        open={showDeleteCategoryConfirmation}
        title="Delete Category"
        description={`Are you sure you wanna delete the "${categoryToDeleteInfo?.name}" category`}
        secondaryAction={closeDeleteConfirmation}
        secondaryActionLabel="Cancel"
        primaryAction={handleDelete}
        primaryActionLabel="Delete"
        primaryActionPending={pendingDeleting}
        color="error"
      />
    </>
  );
};

export default CategoryActionModals;
