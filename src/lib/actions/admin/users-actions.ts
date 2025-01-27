"use server";

import { checkIsAdmin } from "../auth-actions";
import { NOT_ADMIN_ERR_MESSAGE } from "../constants";
import { parseUserData, TParsedUser } from "@/lib/helpers/data-validation";
import {
  deleteUserById,
  findUserByEmail,
  findUserById,
  insertUser,
  updateUserById,
} from "@/lib/db-services/users";
import { Users, init } from "@kinde/management-api-js";

//-----------------------------------------------------------------------------------------

// server action to create a new user on admin req

export const createUser = async (user: TParsedUser) => {
  try {
    init();

    // create a resp obj

    const response = { success: false, message: "" };

    // check is admin

    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;

      return response;
    }

    let parsedUser: TParsedUser;

    try {
      parsedUser = await parseUserData(user);
    } catch (error: any) {
      response.message = error.message;
      return response;
    }
    // check a user with same email exist if return an error resp

    const existingUser = await findUserByEmail(parsedUser.email);

    if (existingUser?.length > 0) {
      response.message = `User with email ${parsedUser.email} already exist`;
      return response;
    }

    // insert the data to db if all checks are done

    const newKindeUser = await Users.createUser({
      requestBody: {
        profile: {
          given_name: parsedUser.firstName,
          family_name: parsedUser.lastName,
        },
        identities: [{ type: "email", details: { email: parsedUser.email } }],
      },
    });

    if (!newKindeUser.created || !newKindeUser.id) {
      response.message = "Unexpected Error : Failed to create user Try Again";
      return response;
    }

    const newKindeUserData = await Users.getUserData({ id: newKindeUser.id });

    await insertUser({
      firstName: newKindeUserData.first_name,
      lastName: newKindeUserData.last_name,
      email: newKindeUserData.preferred_email!,
      kindeId: newKindeUserData.id!,
      phone: parsedUser.phone,
      birthDate: parsedUser.birthDate,
    });

    // if insert success end success repsonse

    response.success = true;
    response.message = "Successfully created new user";

    return response;
  } catch (error: any) {
    // if any unexpected error occur return error resp

    console.log(error.body.errors[0].message, "error");

    return {
      success: false,
      message:
        error.body.errors[0].message ||
        "Sorry,Something went wrong. Please try again later.",
      details: error.message,
    };
  }
};

// server action to edit user info on admin req

export const EditUser = async (user: TParsedUser) => {
  try {
    init();

    // create a resp obj

    const response = { success: false, message: "" };

    // check is admin

    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;

      return response;
    }

    let parsedUser: TParsedUser;

    try {
      parsedUser = await parseUserData(user);
    } catch (error: any) {
      response.message = error.message;
      return response;
    }
    // check a user with same email exist if return an error resp

    const existingUser = await findUserByEmail(parsedUser.email);

    if (existingUser?.length <= 0) {
      response.message = `User with email ${parsedUser.email} not found`;
      return response;
    }

    // insert the data to db if all checks are done

    const updatedUser = await Users.updateUser({
      id: existingUser[0].kindeId,
      requestBody: {
        given_name: parsedUser.firstName,
        family_name: parsedUser.lastName,
      },
    });

    if (!updatedUser.id) {
      response.message = "Unexpected Error : Failed to update user Try Again";
      return response;
    }

    await updateUserById(existingUser[0].userId, {
      firstName: updatedUser.given_name!,
      lastName: updatedUser.family_name!,
      phone: parsedUser.phone,
      email: updatedUser.email || "",
      birthDate: parsedUser.birthDate || "",
    });

    // if insert success end success repsonse

    response.success = true;
    response.message = "Successfully updated  user";

    return response;
  } catch (error: any) {
    // if any unexpected error occur return error resp

    console.log(error.body.errors[0].message, "error");

    return {
      success: false,
      message:
        error.body.errors[0].message ||
        "Sorry,Something went wrong. Please try again later.",
      details: error.message,
    };
  }
};

// server action to delete a user

export const deleteUser = async (id: string) => {
  try {
    init();

    // create a resp obj

    const response = { success: false, message: "" };

    // check is admin

    const isAdmin = await checkIsAdmin();

    if (!isAdmin) {
      response.message = NOT_ADMIN_ERR_MESSAGE;

      return response;
    }

    // check that the user exist

    const existingUser = await findUserById(id);

    if (existingUser.length <= 0) {
      response.message = "Unexpected error ! Failed to find the user data";
      return response;
    }

    // delete the user from kinde

    await Users.deleteUser({
      id: existingUser[0].kindeId,
      isDeleteProfile: false,
    });

    //  delete the user from db

    await deleteUserById(id);

    response.success = true;
    response.message = "Successfully Deleted The User";

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
