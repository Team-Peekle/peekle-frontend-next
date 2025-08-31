'use client';

interface ToastProps {
  text: string;
}

export default function Toast({ text }: ToastProps) {
  return (
    <div className="px-24pxr py-14pxr rounded-8pxr fixed top-1/2 left-1/2 z-50 h-fit w-fit -translate-x-1/2 -translate-y-1/2 transform bg-gray-700">
      <p className="text-gray-0 text-p16m">{text}</p>
    </div>
  );
}
