import React, { useState } from "react";
import { ArrowLeftIcon, FilterIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ListingCard from "../components/ListingCard";
import FilterSideBar from "../components/FilterSideBar";

const MarketPlace = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    platform: null,
    maxPrice: 100000,
    minFollowers: 0,
    niche: null,
    verified: false,
    monetized: false,
  });

  const listings = useSelector((state) => state.listing.listings);

  const filteredListings = listings.filter((listing) => {
    if (filters.platform && filters.platform.length > 0) {
      if (!filters.platform.includes(listing.platform)) return false;
    }
    if (filters.maxPrice) {
      if (listing.price > filters.maxPrice) return false;
    }
    if (filters.minFollowers) {
      if (listing.followers_count < filters.minFollowers) return false;
    }
    if (filters.niche && filters.niche.length > 0) {
      if (filters.niche !== listing.niche) return false;
    }
    if (filters.verified) {
      if (!listing.verified) return false;
    }
    if (filters.monetized) {
      if (!listing.monetized) return false;
    }

    if (search) {
      const trimed = search.trim();
      if (
        !listing.title.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.username.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.description.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.platform.toLowerCase().includes(trimed.toLowerCase()) &&
        !listing.niche.toLowerCase().includes(trimed.toLowerCase())
      )
        return false;
    }

    return true;
  });

  // console.log("listings", filteredListings);

  return (
    <div className="px-6 xl:px-32 md:px-16 lg:px-24">
      <div className="flex items-center justify-between text-slate-500">
        <button
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 py-5"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Home
        </button>
        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center gap-2 py-5 sm:hidden"
        >
          <FilterIcon className="size-4" />
          Filters
        </button>
      </div>
      <div className="relative flex items-start justify-between gap-8 pb-8">
        <FilterSideBar
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          filters={filters}
          setFilters={setFilters}
        />
        <div className="flex-1 grid xl:grid-cols-2 gap-4">
          {filteredListings
            .sort((a, b) => (a.featured ? -1 : b.featured ? 1 : 0))
            .map((listing, index) => (
              <ListingCard key={index} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
