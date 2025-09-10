'use client';

// import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@common/constants/routes';

// import notFoundImage from '@common/assets/images/404.png';

const NotFound = () => {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="gap-16pxr flex shrink-0 flex-col items-center">
        {/* <Image src={notFoundImage} alt="404 이미지" fill /> */}
        <div className="bg-primary-500 h-122pxr w-94pxr flex items-center justify-center">
          이미지 부분
        </div>
        <h2 className="text-p16b text-gray-800">페이지를 찾을 수 없습니다</h2>
        <p className="text-p14 text-center text-gray-400">
          찾으시는 페이지가 존재하지 않거나 <br />
          이동되었을 수 있습니다.
        </p>
        <button
          className="py-8pxr rounded-8pxr px-12pxr text-p14 text-gray-0 flex items-center justify-center bg-gray-900 hover:bg-gray-600"
          onClick={() => router.push(ROUTES.ROOT)}
        >
          홈으로 돌아가기
        </button>
      </section>
    </main>
  );
};

export default NotFound;
