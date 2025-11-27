'use client';

interface TabsProps {
  activeTab: 'tvl' | 'apy';
  onTabChange: (tab: 'tvl' | 'apy') => void;
}

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
      <button
        onClick={() => onTabChange('tvl')}
        className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
          activeTab === 'tvl'
            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        TVL
      </button>
      <button
        onClick={() => onTabChange('apy')}
        className={`px-6 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
          activeTab === 'apy'
            ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        APY
      </button>
    </div>
  );
}


