"use client";

import { Back } from "@/common/components/svg/Back";
import { Scrap } from "@/common/components/svg/Scrap";
import { Share } from "@/common/components/svg/Share";
import { useIsScrolled } from "@/common/hooks/useIsScrolled";
import { useRouter } from "next/navigation";

interface DetailNavbarProps {
  onShare?: () => void;
  onScrap?: () => void;
  isScrap?: boolean;
}

export default function DetailNavbar({
  onShare,
  onScrap,
  isScrap = false,
}: DetailNavbarProps) {
  const router = useRouter();
  const isScrolled = useIsScrolled();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length <= 1) {
      alert("뒤로가기 (스토리북 환경)");
      return;
    }
    router.back();
  };

  return (
    <nav
      className={`w-full py-10pxr px-16pxr bg-gray-0 h-64pxr flex flex-row items-center justify-between ${
        isScrolled ? "border-b border-gray-100" : ""
      }`}
    >
      <button
        onClick={handleBack}
        className="size-44pxr flex items-center justify-center cursor-pointer"
      >
        <Back className="size-20pxr text-gray-600" />
      </button>

      <div className="flex flex-row gap-8pxr">
        {onShare && (
          <button
            onClick={onShare}
            className="size-44pxr flex items-center justify-center cursor-pointer"
          >
            <Share className="size-20pxr text-gray-600" />
          </button>
        )}
        {onScrap && (
          <button
            onClick={onScrap}
            className="size-44pxr flex items-center justify-center cursor-pointer"
          >
            <Scrap
              className="size-20pxr text-gray-600"
              fill={isScrap ? "weight" : "outlined"}
            />
          </button>
        )}
      </div>
    </nav>
  );
}
