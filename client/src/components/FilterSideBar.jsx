import { FilterIcon, X, XIcon } from "lucide-react";

const FilterSideBar = ({
  filtersOpen,
  setFiltersOpen,
  filters,
  setFilters,
}) => {
  return (
    <div
      className={`${filtersOpen ? "max-sm:fixed" : "max-sm:hidden"}max-sm:inset-0 z-100 md:min-w-75 max-sm:h-screen max-sm:overflow-scroll bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24`}
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-700">
            <FilterIcon className="size-4" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          <div className="flex items-center gap-2">
            <X className="size-6 text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer" />
            <button
              onClick={() => setFiltersOpen(false)}
              className="sm:hidden text-sm border text-gray-700 px-3 py-1 rounded"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
