import { WifiOff } from "lucide-react";

const ErrorState = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 px-6 text-center">
    <div className="w-16 h-16 rounded-full bg-[#f5f0e8] flex items-center justify-center">
      <WifiOff size={28} className="text-[#453224]" />
    </div>
    <div>
      <p className="text-[16px] font-bold text-[#1a1a1a] mb-1">No connection</p>
      <p className="text-[13px] text-[#888] max-w-xs">
        Check your internet connection and try again
      </p>
    </div>
    <button
      onClick={() => window.location.reload()}
      className="mt-2 px-6 py-2.5 bg-[#453224] text-white text-[13px] font-bold rounded-lg hover:opacity-80 transition-opacity"
    >
      Try again
    </button>
  </div>
);

export default ErrorState;
