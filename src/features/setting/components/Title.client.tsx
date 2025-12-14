'use client';

interface TitleProps {
  title: string;
}
const Title = ({ title }: TitleProps) => {
  return <h2 className="text-p17b pb-8pxr border-b border-gray-100 text-gray-800">{title}</h2>;
};

export default Title;
