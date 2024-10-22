import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const checkIsAdmin = async () => {
  const {getPermission} = getKindeServerSession()
  const adminPermission = await getPermission("admin:permission");

  return adminPermission?.isGranted;

};
