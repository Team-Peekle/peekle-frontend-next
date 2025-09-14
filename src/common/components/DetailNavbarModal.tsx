interface DetailNavbarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DetailNavbarModal({ isOpen, onClose }: DetailNavbarModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="text-p16b relative flex flex-col rounded-[12px] bg-white p-[6px]">
        <button className="rounded-[6px] px-9 py-[9px] hover:bg-gray-100">수정하기</button>
        <button className="text-semantic-red rounded-[6px] px-9 py-[9px] hover:bg-gray-100">
          삭제하기
        </button>
      </div>
    </div>
  );
}
