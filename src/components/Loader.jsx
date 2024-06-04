import { Skeleton } from "keep-react";

const Loader = () => {
  return (
    <div className="max-w-4xl mx-auto mt-28 mb-10">
      <div className="grid sm:grid-cols-2  grid-cols-1 justify-center items-center gap-10 ">
        <Skeleton className="w-full space-y-2.5 xl:max-w-md">
          <Skeleton.Line className="h-36 w-full" />
          <Skeleton.Line className="h-4 w-full" />
          <Skeleton.Line className="h-4 w-3/5" />
          <Skeleton.Line className="h-4 w-4/5" />
          <Skeleton.Line className="h-10 w-2/5" />
        </Skeleton>
        <Skeleton className="w-full space-y-2.5 xl:max-w-md">
          <Skeleton.Line className="h-36 w-full" />
          <Skeleton.Line className="h-4 w-full" />
          <Skeleton.Line className="h-4 w-3/5" />
          <Skeleton.Line className="h-4 w-4/5" />
          <Skeleton.Line className="h-10 w-2/5" />
        </Skeleton>
        <Skeleton className="w-full space-y-2.5 xl:max-w-md">
          <Skeleton.Line className="h-36 w-full" />
          <Skeleton.Line className="h-4 w-full" />
          <Skeleton.Line className="h-4 w-3/5" />
          <Skeleton.Line className="h-4 w-4/5" />
          <Skeleton.Line className="h-10 w-2/5" />
        </Skeleton>
        <Skeleton className="w-full space-y-2.5 xl:max-w-md">
          <Skeleton.Line className="h-36 w-full" />
          <Skeleton.Line className="h-4 w-full" />
          <Skeleton.Line className="h-4 w-3/5" />
          <Skeleton.Line className="h-4 w-4/5" />
          <Skeleton.Line className="h-10 w-2/5" />
        </Skeleton>
      </div>
    </div>
  );
};

export default Loader;
