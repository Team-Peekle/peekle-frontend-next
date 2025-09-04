import Profile from '@common/components/Profile.server';

interface PublishInfoCardProps {
  name: string;
  date: string;
}

export default function PublishInfoCard({ name, date }: PublishInfoCardProps) {
  return (
    <div className="items-justify-center flex flex-row gap-[10px]">
      <Profile variant="size-40" />
      <div className="flex flex-col">
        <h3 className="text-p17b">{name}</h3>
        <p className="text-p14 text-gray-400">{date}</p>
      </div>
    </div>
  );
}
