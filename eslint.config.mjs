import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettierConfig from 'eslint-config-prettier';
import eslint from '@eslint/js';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  globalIgnores([
    'node_modules/**',
    '.next/**',
    'out/**',
    'build/**',
    'coverage/**',
    'next-env.d.ts',
    'prisma/generated/**',
    'prisma/migrations/**',
  ]),

  // Next.js 공식 플랫 설정 적용
  ...nextVitals,
  ...nextTs,

  eslint.configs.recommended,
  // Storybook의 권장 설정을 확장
  ...storybook.configs['flat/recommended'],
  // TypeScript ESLint의 권장 설정
  ...tseslint.configs.recommended,

  // 커스텀 규칙
  {
    // CommonJS 파일에 대한 특별 설정
    files: ['**/*.cjs'],
    rules: {
      // require 구문 사용 허용
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  // TypeScript 파일에 대한 설정
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      // 사용하지 않는 변수 경고 (_, _로 시작하는 변수는 제외)
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // JS ESLint의 no-unused-vars 규칙 비활성화
      // TypeScript ESLint가 이 규칙을 처리하므로 중복 방지
      'no-unused-vars': 'off',
    },
  },
  // React와 JSX 파일에 대한 설정
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      react: eslintPluginReact,
    },
    settings: {
      // React 버전 자동 감지
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginReactHooks.configs.recommended.rules,
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      // React import 구문 필수 해제
      'react/react-in-jsx-scope': 'off',
      // prop-types 검사 비활성화 (ts 사용 시 TypeScript가 prop-types 역할을 함)
      'react/prop-types': 'off',
    },
  },
  prettierConfig,
]);

export default eslintConfig;
