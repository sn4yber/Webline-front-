/**
 * Skeleton de carga reutilizable.
 */

import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  lines?: number;
  className?: string;
}

export function LoadingSkeleton({
  lines = 3,
  className,
}: LoadingSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="bg-muted h-4 animate-pulse rounded-md"
          style={{ width: `${100 - i * 15}%` }}
        />
      ))}
    </div>
  );
}
