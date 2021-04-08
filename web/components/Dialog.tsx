import React, { useEffect } from "react";

export default function Dialog({
  children,
  onCancel,
}: {
  children: JSX.Element | JSX.Element[];
  onCancel: any;
}) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  });
  return (
    <div>
      <div className="fixed z-50 top-0 left-0 w-screen h-screen bg-indigo-200 opacity-80"></div>
      <div
        className="flex fixed z-50 top-0 left-0 w-screen h-screen"
        onClick={onCancel}
      >
        <div
          className="self-center mx-auto rounded"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
