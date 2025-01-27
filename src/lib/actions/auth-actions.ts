import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { findUserByKindeId } from "../db-services/users";

//--------------------------------------------

export const checkIsAdmin = async () => {
  const { getPermission } = getKindeServerSession();
  const adminPermission = await getPermission("admin:permission");
  return adminPermission?.isGranted;
};

//--------------------------------------------

export const getUserDetailsUsingSession = async () => {
  const { getUser, isAuthenticated } = getKindeServerSession();

  const authenticated = await isAuthenticated();
  if (!authenticated) throw new Error("User not authenticated");

  const kindeUserDetails = await getUser();
  if (!kindeUserDetails) throw new Error("Failed to get Kinde user details");

  const userDetails = await findUserByKindeId(kindeUserDetails.id);
  if (!userDetails) throw new Error("Failed to find user by Kinde ID");

  return userDetails[0];
};
