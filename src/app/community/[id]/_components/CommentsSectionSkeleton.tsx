export default function CommentsSectionSkeleton() {
  return (
    <section className="max-mb:px-0 flex w-full flex-col gap-[24px] px-[16px] pb-[32px]">
      <div className="h-6 w-24 rounded bg-gray-100" />
      <div className="flex flex-col gap-4">
        <div className="h-20 w-full rounded-lg bg-gray-100" />
        <div className="h-20 w-full rounded-lg bg-gray-100" />
      </div>
    </section>
  );
}

