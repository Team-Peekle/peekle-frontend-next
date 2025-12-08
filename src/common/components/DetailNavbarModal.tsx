interface DetailNavbarModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onReport?: () => void;
  onRemove?: () => void;
}

export function DetailNavbarModal({
  isOpen,
  onClose,
  isOwner = false,
  onEdit,
  onDelete,
  onReport,
}: DetailNavbarModalProps) {
  if (!isOpen) return null;

  const handleAction = (callback?: () => void) => {
    callback?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="text-p16b relative flex min-w-[200px] flex-col rounded-[12px] bg-white p-[6px]">
        {isOwner ? (
          <>
            <button
              type="button"
              onClick={() => handleAction(onEdit)}
              className="flex items-center justify-center rounded-[6px] px-9 py-[9px] text-left hover:bg-gray-100"
            >
              수정하기
            </button>
            <button
              type="button"
              onClick={() => handleAction(onDelete)}
              className="text-semantic-red flex items-center justify-center rounded-[6px] px-9 py-[9px] text-left hover:bg-gray-100"
            >
              삭제하기
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => handleAction(onReport)}
            className="rounded-[6px] px-9 py-[9px] text-left hover:bg-gray-100"
          >
            신고하기
          </button>
        )}
      </div>
    </div>
  );
}
