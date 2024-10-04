import { Button } from "@/components/ui/button";
import ProfileForm from "../profile-form";

const UserProfileView = () => {
  return (
    <div className="h-[calc(100vh-75px)] bg-ceramic px-10 py-8">
      <div className="h-[calc(100vh-130px)] rounded-md bg-white">
        <p className="px-8 pt-8 text-lg font-bold">Profile Details</p>
        <div className="w-1/2 rounded-xl bg-white p-8">
          <ProfileForm />
          <div className="mt-8">
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;
