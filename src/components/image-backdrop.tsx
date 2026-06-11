import Image from "next/image";
import { cn } from "@/lib/utils";

export function ImageBackdrop({
  src,
  className,
  imageClassName,
  loading,
  fetchPriority,
  sizes = "100vw",
}: {
  src: string;
  className?: string;
  imageClassName?: string;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
}) {
  return (
    <div aria-hidden className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        loading={loading}
        fetchPriority={fetchPriority}
        className={cn("object-cover", imageClassName)}
      />
    </div>
  );
}
