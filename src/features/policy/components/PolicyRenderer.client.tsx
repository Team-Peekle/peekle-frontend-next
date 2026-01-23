'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { TermsType } from '@common/types/terms';

import { TERMS_LABELS } from '@common/constants/terms';

import { getPolicyOptions } from '../apis/get/policyOptions';
import { PolicyItem } from '../schemas/api/policy';

interface PolicyRendererProps {
  termsType: Exclude<TermsType, TermsType.CONTACT>;
}
const PolicyRenderer = ({ termsType }: PolicyRendererProps) => {
  const { data: policy } = useSuspenseQuery(getPolicyOptions());

  const policyIdMap = {
    [TermsType.PRIVACY]: '10',
    [TermsType.TERMS]: '11',
  };

  const targetId = policyIdMap[termsType];
  const targetContent = policy.items.find((item: PolicyItem) => item.id === targetId)?.content;

  const ErrorContent = `약관 내용을 불러오는 데 실패했습니다.\n
  다시 시도해주세요.`;

  return (
    <main className="py-100pxr px-16pxr">
      <article>
        <h1 className="text-p24 mb-32pxr text-gray-800">{TERMS_LABELS[termsType]}</h1>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ node, ...props }) => (
              <h3 className="text-p16b mt-32pxr mb-8pxr text-gray-800" {...props} />
            ),
            p: ({ node, ...props }) => (
              <p className="text-p16m leading-relaxed last:mb-0" {...props} />
            ),
            // 1., 2. 형태를 유지하기 위한 설정
            ol: ({ node, ...props }) => (
              <ol className="text-p16m pl-20pxr space-y-4pxr list-decimal" {...props} />
            ),
            // 가., 나. 혹은 일반 리스트 아이템
            ul: ({ node, ...props }) => (
              <ul className="text-p16m pl-24pxr space-y-8pxr list-none" {...props} />
            ),
          }}
        >
          {targetContent ?? ErrorContent}
        </ReactMarkdown>
      </article>
    </main>
  );
};

export default PolicyRenderer;
