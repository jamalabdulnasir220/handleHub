import { ChevronDown, FilterIcon, X, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSideBar = ({
  filtersOpen,
  setFiltersOpen,
  filters,
  setFilters,
}) => {
  const currency = import.meta.env.VITE_CURRENCY || "GHC";
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const onSearchChange = (e) => {
    if (e.target.value) {
      setSearchParams({
        search: e.target.value,
      });
      setSearch(e.target.value);
    } else {
      navigate(`/marketplace`);
      setSearch("");
    }
  };

  const [expandedSections, setExpandedSections] = useState({
    platform: true,
    price: true,
    followers: true,
    niche: true,
    status: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => {
      return {
        ...prev,
        [section]: !prev[section],
      };
    });
  };

  const platforms = [
    { value: "youtube", label: "YouTube" },
    { value: "tiktok", label: "TikTok" },
    { value: "instagram", label: "Instagram" },
    { value: "twitch", label: "Twitch" },
    { value: "twitter", label: "Twitter" },
    { value: "facebook", label: "Facebook" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "discord", label: "Discord" },
  ];

  const niche = [
    { value: "fitness", label: "Fitness" },
    { value: "tech", label: "Technology" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food & Cooking" },
    { value: "fashion", label: "Fashion" },
    { value: "beauty", label: "Beauty" },
  ];

  const onFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div
      className={`${filtersOpen ? "max-sm:fixed" : "max-sm:hidden"} max-sm:inset-0 z-100 md:min-w-75 max-sm:h-screen max-sm:overflow-scroll bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24`}
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
      <div className="p-4 space-y-6 sm:max-h-[calc(100vh - 200px)] overflow-y-scroll no-scrollbar">
        {/* Search Bar */}
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Search by username, platform, niche, etc."
            className="w-full py-2 px-3 text-sm  border border-[#D1D5DC] rounded-md outline-indigo-500"
            onChange={onSearchChange}
            value={search}
          />
        </div>
        {/*Platform Filters */}
        <div className="">
          <button
            onClick={() => toggleSection("platform")}
            className="flex items-center justify-between mb-3 w-full"
          >
            <label className="text-sm font-medium text-gray-800">
              Platform
            </label>
            {expandedSections.platform ? (
              <ChevronDown className="size-4 rotate-180 transition-transform" />
            ) : (
              <ChevronDown className="size-4 transition-transform" />
            )}
          </button>

          {expandedSections.platform && (
            <div className="flex flex-col gap-2">
              {platforms.map((platform) => (
                <label
                  key={platform.value}
                  className="flex items-center gap-2 font-normal text-sm text-[#364153]"
                >
                  <input
                    type="checkbox"
                    // id={platform.value}
                    className="accent-indigo-500"
                    checked={
                      filters.platform?.includes(platform.value) || false
                    }
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const current = filters.platform ?? [];
                      const updated = checked
                        ? [...current, platform.value]
                        : current.filter((p) => p !== platform.value);
                      onFilterChange({
                        ...filters,
                        platform: updated.length > 0 ? updated : null,
                      });
                    }}
                  />
                  <span>{platform.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between mb-3 w-full"
          >
            <label className="text-sm font-medium text-gray-800">
              Price Range
            </label>
            {expandedSections.price ? (
              <ChevronDown className="size-4 rotate-180 transition-transform" />
            ) : (
              <ChevronDown className="size-4 transition-transform" />
            )}
          </button>
          {expandedSections.price && (
            <div className="space-y-3">
              <input
                className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer appearance-none accent-indigo-600"
                type="range"
                min={0}
                max={100000}
                step={100}
                value={filters.maxPrice || 100000}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    maxPrice: parseInt(e.target.value),
                  })
                }
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-600 mt-1">
                  {currency}
                  {0}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {currency}
                  {(filters.maxPrice || 100000).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
        {/* Followers count */}
        <div>
          <button
            onClick={() => toggleSection("followers")}
            className="flex items-center justify-between mb-3 w-full"
          >
            <label className="text-sm font-medium text-gray-800">
              Minimum Followers
            </label>
            {expandedSections.followers ? (
              <ChevronDown className="size-4 rotate-180 transition-transform" />
            ) : (
              <ChevronDown className="size-4 transition-transform" />
            )}
          </button>
          {expandedSections.followers && (
            <select
              className="w-full appearance-none py-2 px-3 text-sm text-[#364153] border border-[#D1D5DC] rounded-md outline-indigo-500"
              value={filters.minFollowers?.toString() || "0"}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                onFilterChange({
                  ...filters,
                  minFollowers: value,
                });
              }}
            >
              <option value="0">Any Amount</option>
              <option value="100">100+</option>
              <option value="1000">1,000+</option>
              <option value="10000">10,000+</option>
              <option value="100000">100,000+</option>
              <option value="500000">500,000+</option>
              <option value="1000000">1M+</option>
            </select>
          )}
        </div>
        {/* Niche */}
        <div>
          <button
            onClick={() => toggleSection("niche")}
            className="flex items-center justify-between mb-3 w-full"
          >
            <label className="text-sm font-medium text-gray-800">Niche</label>
            {expandedSections.niche ? (
              <ChevronDown className="size-4 rotate-180 transition-transform" />
            ) : (
              <ChevronDown className="size-4 transition-transform" />
            )}
          </button>
          {expandedSections.niche && (
            <select
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  niche: e.target.value || null,
                })
              }
              value={filters.niche || ""}
              className="w-full appearance-none py-2 px-3 text-sm text-[#364153] border border-[#D1D5DC] rounded-md outline-indigo-500"
            >
              <option value="">Any Niche</option>
              {niche.map((n) => (
                <option key={n.value} value={n.value}>
                  {n.label}
                </option>
              ))}
            </select>
          )}
        </div>
        {/* Status */}
        <div className="">
          <button
            onClick={() => toggleSection("status")}
            className="flex items-center justify-between mb-3 w-full"
          >
            <label className="text-sm font-medium text-gray-800">
              Account Status
            </label>
            {expandedSections.status ? (
              <ChevronDown className="size-4 rotate-180 transition-transform" />
            ) : (
              <ChevronDown className="size-4 transition-transform" />
            )}
          </button>

          {expandedSections.status && (
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-indigo-500"
                  checked={filters.verified || false}
                  onChange={(e) => {
                    onFilterChange({
                      ...filters,
                      verified: e.target.checked,
                    });
                  }}
                />
                <span className="text-sm text-gray-700">
                  Verified accounts only
                </span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-indigo-500"
                  checked={filters.monetized || false}
                  onChange={(e) => {
                    onFilterChange({
                      ...filters,
                      monetized: e.target.checked,
                    });
                  }}
                />
                <span className="text-sm text-gray-700">
                  Monetized accounts only
                </span>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;

/* Any amount */

// position: absolute;
// width: 90.66px;
// height: 20.8px;
// left: 0px;
// top: 0.8px;

// font-family: 'Rethink Sans';
// font-style: normal;
// font-weight: 400;
// font-size: 16px;
// line-height: 21px;
// /* identical to box height, or 130% */
// display: flex;
// align-items: center;

// color: #364153;
