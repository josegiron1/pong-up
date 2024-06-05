import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";
import SkeletonLoading from "./skeleton-loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <div>{children}</div>
    </Suspense>
  );
}
