interface DescriptionCardProps {
  description: string;
}
const DescriptionCard = ({ description }: DescriptionCardProps) => {
  return (
    <div className="rounded-12pxr p-14pxr bg-gray-50">
      <p className="text-p16m text-left whitespace-pre-wrap text-gray-700">{description}</p>
    </div>
  );
};

export default DescriptionCard;
