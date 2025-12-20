import DetailNavbar from '@common/layout/DetailNavbar.client';

export default function ArticleSectionSkeleton() {
  return (
    <section className="max-mb:px-0 flex w-full flex-col gap-[32px] px-[16px] pb-[16px]">
      <DetailNavbar />
      <div className="flex animate-pulse flex-col gap-[20px]">
        <div className="h-10 w-1/3 rounded-lg bg-gray-100" />
        <div className="h-[320px] w-full rounded-[16px] bg-gray-100" />
        <div className="flex flex-col gap-3">
          <div className="h-6 w-2/5 rounded bg-gray-100" />
          <div className="h-20 w-full rounded bg-gray-100" />
        </div>
      </div>
    </section>
  );
}

