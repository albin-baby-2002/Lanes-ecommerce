"use server"
import { TOrderItemForm } from "@/sections/admin/orders/edit-order-modal";
import { checkIsAdmin } from "../auth-actions";
import { NOT_ADMIN_ERR_MESSAGE } from "../constants";
import { parseOrderData } from "@/lib/helpers/data-validation";
import { updateOrderItemById } from "@/lib/db-services/orders";

export const updateOrder = async (order: TOrderItemForm) => {
  try {
    // create a resp obj

    const response = { success: false, message: "" };

    // check is admin

    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;

      return response;
    }

    let parsedOrder: TOrderItemForm;

    try {
      parsedOrder = await parseOrderData(order);
    } catch (error: any) {
      response.message = error.message;
      return response;
    }

    const updatedOrder = await updateOrderItemById(parsedOrder);

    // if updated success end success repsonse

    response.success = true;
    response.message = "Successfully created new category";

    return response;
  } catch (error: any) {
    // if any unexpected error occur return error resp

    console.log(error, "error");

    return {
      success: false,
      message: "Sorry,Something went wrong. Please try again later.",
      details: error.message,
    };
  }
};
