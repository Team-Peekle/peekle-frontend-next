"use client";

interface ToastProps {
  text: string;
}

export default function Toast({ text }: ToastProps) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 px-24pxr py-14pxr rounded-8pxr w-fit h-fit z-50">
      <p className="text-gray-0 text-p13-14">{text}</p>
    </div>
  );
}
