import { Warning } from "@/common/components/svg/Warning";
import React from "react";

interface PopupProps {
  title: string;
  leftText: string;
  rightText: string;
  onLeft: () => void;
  onRight: () => void;
}

export default function Popup({
  title,
  leftText,
  rightText,
  onLeft,
  onRight,
}: PopupProps) {
  return (
    <div className="rounded-20pxr text-17b not-first:px-12pxr pt-32pxr pb-12pxr gap-24pxr flex flex-col items-center bg-gray-0">
      <div className="flex flex-col items-center gap-18pxr">
        <Warning className="size-24pxr text-gray-200" />
        <p>{title}</p>
      </div>
      <div className="flex flex-row items-center gap-10pxr">
        <button
          className="text-gray-400 px-45pxr py-12pxr w-fit h-fit"
          onClick={onLeft}
        >
          {leftText}
        </button>
        <button
          className="text-primary-500 px-45pxr py-12pxr w-fit h-fit"
          onClick={onRight}
        >
          {rightText}
        </button>
      </div>
    </div>
  );
}
