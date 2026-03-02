import React from "react";
import { platformIcons } from "../assets/assets";
import { BadgeCheck, LineChart, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "GHC";

  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition ">
      {/* Featured Banner */}
      {listing.featured && (
        <>
          <p className="py-1" />
          <div className="absolute top-0 left-0 w-full bg-linear-to-r from-pink-500 to-purple-500 text-white text-center py-1 text-xs font-semibold tracking-wide uppercase">
            Featured
          </div>
        </>
      )}
      <div className="p-5 pt-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          {platformIcons[listing.platform]}
          <div className="flex flex-col">
            <h2>{listing.title}</h2>
            <p>
              @{listing.username} -{" "}
              <span className="capitalize">{listing.platform}</span>
            </p>
          </div>
          {listing.verified && (
            <BadgeCheck className="text-green-500 ml-auto w-5 h-5" />
          )}
        </div>
        {/* STATS */}
        <div className="flex flex-wrap justify-between max-w-lg items-center gap-3 my-5">
          <div className="flex items-center text-sm text-gray-600">
            <User className="size-6 mr-1 text-gray-400" />
            <span className="font-medium text-lg text-slate-800 mr-1.5">
              {listing.followers_count.toLocaleString()}
            </span>{" "}
            followers
          </div>
          {listing.engagement_rate && (
            <div className="flex items-center text-sm text-gray-600">
              <LineChart className="size-6 mr-1 text-gray-400" />
              <span className="font-medium text-lg text-[#1D293D] mr-1.5">
                {listing.engagement_rate}
              </span>{" "}
              % engagement
            </div>
          )}
        </div>
        {/* Tags and Location */}
        <div className="flex items-center gap-3 mb-3">
          <span className="bg-[#FCE7F3] rounded-full py-1 px-3 text-[#E60076] text-xs capitalize font-medium">
            {listing.niche}
          </span>
          {listing.country && (
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="size-6 mr-1 text-gray-400" />
              {listing.country}
            </div>
          )}
        </div>
        {/* Description */}
        <p className="font-normal text-sm text-[#4A5565] mb-4 line-clamp-2">
          {listing.description}
        </p>
        <hr className="my-5 border-gray-200" />
        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="font-medium text-2xl text-[#1D293D]">
              {currency}
              {listing.price.toLocaleString()}
            </span>
          </div>
          <button
            onClick={() => {
              navigate(`/listing/${listing.id}`);
              scrollTo(0, 0);
            }}
            className="bg-[#4F39F6] rounded-lg py-3 px-7 text-[#FFFFFF] font-normal text-sm hover:bg-indigo-700 transition"
          >
            More Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;


