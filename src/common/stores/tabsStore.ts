import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface TabsStoreState {
  selectedValue: string /** 내부 식별자 */;
  option: string /** tab 종류 - 접근성용 e.g.이벤트 필터 탭 | 기간 선택 탭 */;
  actions: {
    setSelectedValue: (value: string) => void;
    setOption: (value: string) => void;
  };
}

const tabsStore = create<TabsStoreState>()(
  devtools(
    immer((set) => ({
      selectedValue: '',
      option: '',
      actions: {
        setSelectedValue: (value) => {
          set((s) => {
            s.selectedValue = value;
          });
        },
        setOption: (value) => {
          set((s) => {
            s.option = value;
          });
        },
      },
    })),
    { name: 'TabsStore' },
  ),
);

export default tabsStore;
