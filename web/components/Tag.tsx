import React from "react";

export default function Tag({
  text,
  color,
  className,
}: {
  text: string;
  color: "green" | "pink" | "yellow";
  className: string;
}) {
  // duplicate code to avoid PurgeCSS purging concatenated className
  switch (color) {
    case "green":
      return (
        <span
          className={
            "inline-block border rounded-sm text-center text-xs text-green-500 border-green-200 bg-green-50 " +
            className
          }
        >
          {text}
        </span>
      );
    case "pink":
      return (
        <span
          className={
            "inline-block border rounded-sm text-center text-xs text-pink-500 border-pink-200 bg-pink-50 " +
            className
          }
        >
          {text}
        </span>
      );
    case "yellow":
      return (
        <span
          className={
            "inline-block border rounded-sm text-center text-xs text-yellow-500 border-yellow-200 bg-yellow-50 " +
            className
          }
        >
          {text}
        </span>
      );
  }
}
