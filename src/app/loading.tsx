import SquareLoader from "@/assets/loaders/square-loader";

export default function Loading() {
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
