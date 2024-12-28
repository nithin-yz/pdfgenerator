import { HexagonIcon } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2 mb-8">
      <HexagonIcon className="h-8 w-8 text-lime-400" />
      <span className="text-2xl font-bold text-white">levitation</span>
      <span className="text-sm text-gray-400">infotech</span>
    </div>
  );
}