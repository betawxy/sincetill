import React from "react";

export default function Tag({
  text,
  color,
  className,
}: {
  text: string;
  color: "green" | "red" | "yellow" | "magenta" | "cyan";
  className: string;
}) {
  const cx =
    `inline-block border rounded-sm text-center text-xs text-${color}-500 border-${color}-200 bg-${color}-50 ` +
    className;
  return <span className={cx}>{text}</span>;
}
