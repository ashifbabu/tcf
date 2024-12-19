import React from 'react'
import { cn } from '@/lib/utils'

interface SearchButtonProps {
  onClick: () => void;
  isCollapsed: boolean;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick, isCollapsed }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full max-w-xs mx-auto rounded-md",
        "transition-all duration-200 flex items-center justify-center font-medium py-4 px-8",
        "bg-black text-white hover:bg-gray-900",
        "dark:bg-white dark:text-black dark:hover:bg-gray-100"
      )}
    >
      {isCollapsed ? "Modify" : "Search"}
    </button>
  )
}

export default SearchButton