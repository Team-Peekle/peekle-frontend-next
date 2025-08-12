interface ChipProps {
  text: string;
}

export default function Chip({ text }: ChipProps) {
  return (
    <div className="bg-primary-50 rounded-4pxr w-fit h-fit px-6pxr pt-2pxr pb-1pxr text-primary-500 text-p13-14">
      {text}
    </div>
  );
}
