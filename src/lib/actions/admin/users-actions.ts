"use server"

import { checkIsAdmin } from "../auth-actions";
import { NOT_ADMIN_ERR_MESSAGE } from "../constants";
import {
  parseUserData,
  TUser,
} from "@/lib/helpers/data-validation";
import { findUserByEmail } from "@/lib/db-services/user";
import { Users, init } from "@kinde/management-api-js";

//-----------------------------------------------------------------------------------------

// server action to create a new catgory on admin req

// todo - authenticate to protect server action

export const createUser = async (user: TUser) => {
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

    let parsedUser: TUser;

    try {
      parsedUser = await parseUserData(user);
    } catch (error: any) {
      response.message = error.message;
      return response;
    }
    // check a user with same email exist if return an error resp

    const existingUser = await findUserByEmail(parsedUser.email);

    if (existingUser?.length > 0) {
      response.message = `User with name ${parsedUser.email} already exist`;
      return response;
    }

    // insert the data to db if all checks are done

    const newKindeUser = await Users.createUser({
      requestBody: {
        profile: {
          given_name: parsedUser.first_name,
          family_name: parsedUser.last_name,
        },
        identities: [
          { type: "email", details: { email: parsedUser.email } },
          { type: "phone", details: { phone: parsedUser.phone } },
        ],
      },
    });

    if (!newKindeUser.created || !newKindeUser.id) {
      response.message = "Unexpected Error : Failed to create user Try Again";
      return response;
    }

    const newKindeUserData = await Users.getUserData({ id: newKindeUser.id });

    console.log("\n \n", newKindeUserData, "\n user data \n");

    // await insertUser({firstName:newKindeUserData.first_name,lastName:newKindeUserData.last_name,email:newKindeUserData.preferred_email,kindeId:newKindeUserData.id,})

    // if insert success end success repsonse

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
