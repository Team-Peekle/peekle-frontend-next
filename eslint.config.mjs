import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js의 core-web-vitals와 typescript 설정을 확장
  ...compat.extends('next/core-web-vitals'),
  ...compat.extends('next/typescript'),
  // Storybook의 권장 설정을 확장
  ...storybook.configs['flat/recommended'],
  // ESLint의 기본 권장 설정
  eslint.configs.recommended,
  // TypeScript ESLint의 권장 설정
  ...tseslint.configs.recommended,
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
      // React와 React Hooks 플러그인 설정
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
    },
    settings: {
      // React 버전 자동 감지
      react: {
        version: 'detect',
      },
    },
    rules: {
      // JSX를 사용할 수 있는 파일 확장자 제한
      'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
      // React import 구문 필수 해제
      'react/react-in-jsx-scope': 'off',
      // prop-types 검사 비활성화 (ts 사용 시 TypeScript가 prop-types 역할을 함)
      'react/prop-types': 'off',
      // 함수형 컴포넌트 정의 방식 설정 (화살표 함수 사용)
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
    },
  },
  prettierConfig,
];

export default eslintConfig;
