interface ChipProps {
  text: string;
}

const Chip = ({ text }: ChipProps) => {
  return (
    <div className="bg-primary-50 rounded-4pxr px-6pxr pt-2pxr pb-1pxr text-primary-500 text-p14-15 h-fit w-fit">
      {text}
    </div>
  );
};

export default Chip;
