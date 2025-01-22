import { Button } from "@/components/ui/button";
import ProfileForm from "../profile-form";
import { getUserProfileInfo } from "@/lib/actions/client";

const UserProfileView = async() => {

  const userDetails = (await getUserProfileInfo()).data

  return (
    <div className="h-[calc(100vh-75px)]  ">
      <div className="h-[calc(100vh-130px)] rounded-md bg-white">
        <p className="px-8 pt-8 text-lg font-bold">Profile Details</p>
        <div className="w-[60%] rounded-xl bg-white p-8">
          <ProfileForm userDetails={userDetails} />
          <div className="mt-8">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
