import SquareLoader from "@/assets/loaders/square-loader";
import Image from "next/image";
import Link from "next/link";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="minwscreen flex min-h-screen items-center justify-center">
      <div>
        <div className="min-w-36 flex">
          <SquareLoader />
        </div>
      </div>
    </div>
  );
}
