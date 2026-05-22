import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Section({
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLElement>) {
  return (
    <section
      {...rest}
      className={cn("relative px-6 py-24 lg:px-10 lg:py-32", className)}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="display mt-4 text-balance text-4xl text-ink md:text-5xl lg:text-[3.4rem]">
        {title}
      </h2>
      {lead ? (
        <p className="mt-5 max-w-2xl text-[1rem] leading-[1.9] text-ink-soft md:text-[1.05rem]">
          {lead}
        </p>
      ) : null}
    </header>
  );
}
