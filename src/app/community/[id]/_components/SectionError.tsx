interface SectionErrorProps {
  message: string;
  onRetry?: () => void;
}

export default function SectionError({ message, onRetry }: SectionErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
      <p className="text-p15 text-gray-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={() => onRetry()}
          className="text-p15b rounded-lg bg-gray-900 px-5 py-2 text-white hover:bg-gray-800"
        >
          다시 시도
        </button>
      )}
    </div>
  );
}

