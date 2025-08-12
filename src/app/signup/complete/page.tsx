import React from 'react';

import Image from 'next/image';

import DefaultNavbar from '@common/layout/DefaultNavbar';

export default function SignupCompletePage() {
  return (
    <div>
      <DefaultNavbar />
      <main className="mt-32pxr p-16pxr flex flex-col items-center">
        <Image src="/images/signup/signup-complete.png" alt="complete" width={400} height={279} />
        <h1 className="text-h3 text-center text-gray-900">
          <span className="text-primary-500">USER_NAME</span>님<br />
          가입을 환영합니다!
        </h1>
      </main>
    </div>
  );
}
