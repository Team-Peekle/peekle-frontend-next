import { Warning } from '@/common/components/svg/Warning';
import { PopupType } from '@/common/types/popup';

interface PopupProps {
  type: PopupType;
  title: string;
  leftText: string;
  rightText: string;
  onLeft: () => void;
  onRight: () => void;
}

export default function Popup({ type, title, leftText, rightText, onLeft, onRight }: PopupProps) {
  return (
    <div className="rounded-20pxr w-300pxr text-p16b px-12pxr pt-32pxr pb-12pxr gap-24pxr bg-gray-0 flex h-fit flex-col items-center">
      <div className="gap-18pxr flex flex-col items-center">
        {type !== PopupType.VAR3 && <Warning className="size-24pxr text-gray-200" />}
        <p>{title}</p>
      </div>
      <div className="gap-10pxr flex flex-row items-center">
        {type === PopupType.VAR1 && (
          <button className="px-45pxr py-12pxr text-gray-400" onClick={onLeft}>
            {leftText}
          </button>
        )}
        <button className="text-primary-500 px-45pxr py-12pxr" onClick={onRight}>
          {rightText}
        </button>
      </div>
    </div>
  );
}
