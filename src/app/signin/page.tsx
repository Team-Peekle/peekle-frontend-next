import Image from 'next/image';

import DefaultNavbar from '@common/layout/DefaultNavbar';

export default function SigninPage() {
  return (
    <div>
      <DefaultNavbar />
      <main className="mt-114pxr flex flex-col items-center gap-4">
        <Image src="/images/signin/signin.png" alt="signin" width={138} height={144} />
        <h1 className="text-h2 text-gray-900">액티브 시니어 정보 플랫폼, 피클</h1>
        <p className="text-16m text-center text-gray-500">
          5초 안에 로그인/회원가입하고
          <br />
          다양한 이벤트와 커뮤니티에 참여해보세요
        </p>
      </main>
      <footer className="p-16pxr mt-32pxr gap-16pxr flex flex-col"></footer>
    </div>
  );
}
