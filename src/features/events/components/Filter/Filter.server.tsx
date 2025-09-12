import { useAddToast } from '@common/hooks/stores/useToastStore';

import { Close } from '@common/components/svg/Close';
import { Reload } from '@common/components/svg/Reload';

const Filter = () => {
  const addToast = useAddToast();
  const handleClick = () => {
    addToast({ text: '복사되었어요' });
  };
  return (
    <div className="bg-gray-0 rounded-20pxr h-650pxr w-560pxr">
      <header>
        <h2>필터</h2>
        <Close />
      </header>
      <main className="flex flex-row">
        <div></div>
      </main>
      <footer className="justify-betweent flex flex-row">
        {/* 선택된 항목들 */}
        <button>
          <Reload />
          초기화
        </button>
        <button>필터 적용하기</button>
        <button onClick={handleClick}>sss</button>
      </footer>
    </div>
  );
};

export default Filter;
