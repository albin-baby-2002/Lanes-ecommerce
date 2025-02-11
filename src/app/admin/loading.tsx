import CircularLoader from "@/assets/loaders/circular-loader";
import SquareLoader from "@/assets/loaders/square-loader";
import Image from "next/image";
import Link from "next/link";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="min-w-[100%] flex min-h-screen items-center justify-center">
      <div>
        <div className="min-w-20 mr-10 flex">
          <CircularLoader />
        </div>
      </div>
    </div>
  );
}
