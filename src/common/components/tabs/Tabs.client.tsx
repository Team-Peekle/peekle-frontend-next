'use client';

import { useEffect } from 'react';
import React from 'react';

import { useSetOption, useSetSelectedValue } from '@common/hooks/stores/useTabsStore';

import List from './components/List.client';
import Panel from './components/Panel.client';
import Trigger from './components/Trigger.client';

interface FilterTabsProps {
  option: string;
  defaultValue: string;
  children: React.ReactNode;
  listClassName?: string;
  panelClassName?: string;
}

/**
 * @description Tabs 컴포넌트입니다.
 *
 * 하위에 `Tabs.List`, `Tabs.Trigger`, `Tabs.Panel` 컴포넌트를 포함하여
 * 탭 메뉴를 구성하는 역할을 합니다.
 *
 * @param {object} props
 * @param {string} props.option - 접근성을 위한 탭 종류 문자열 e.g.이벤트 필터 탭 | 기간 선택 탭
 * @param {string} props.defaultValue - 초기 렌더링 시 선택될 `Tabs.Trigger`의 `value`.
 * @param {React.ReactNode} props.children - 탭 구성 요소들 (`Tabs.List`, `Tabs.Trigger`, `Tabs.Panel` 등)을 포함하는 React 노드
 * @param {string} [props.listClassName] - `Tabs.List` 컴포넌트에 추가할 클래스 이름 - 스타일용
 * @param {string} [props.panelClassName] - `Tabs.Panel` 컴포넌트에 추가할 클래스 이름 - 스타일용
 */
const Tabs = ({
  option,
  defaultValue,
  children,
  listClassName,
  panelClassName,
}: FilterTabsProps) => {
  const setSelectedValue = useSetSelectedValue();
  const setOption = useSetOption();

  useEffect(() => {
    setSelectedValue(defaultValue);
    setOption(option);
  }, [defaultValue, setSelectedValue, option, setOption]);

  return (
    <section>
      {React.Children.map(children, (child) => {
        // children이 유효한 React 엘리먼트인지 확인
        if (!React.isValidElement(child)) {
          return child;
        }

        // List 컴포넌트에 listClassName을 전달
        if (child.type === List) {
          return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: listClassName,
          });
        }

        // Panel 컴포넌트에 panelClassName을 전달
        if (child.type === Panel) {
          return React.cloneElement(child as React.ReactElement<{ className?: string }>, {
            className: panelClassName,
          });
        }

        return child;
      })}
    </section>
  );
};

Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Panel = Panel;

export default Tabs;
