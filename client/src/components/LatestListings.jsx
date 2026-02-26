import ListingCard from "./ListingCard";
import Title from "./Title";
import { useSelector } from "react-redux";

const LatestListings = () => {
  const listings = useSelector((state) => state.listing.listings);

  return (
    <div className="mt-20 mb-8">
      <Title
        title={"Latest Listings"}
        description={
          "Discover the hottest social profiles available right now."
        }
      />
      <div className="flex flex-col gap-6 px-6">
        {listings.slice(0, 4).map((listing, index) => (
          <div key={index} className="max-w-3xl mx-auto w-full rounded-2xl">
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestListings;

/* Background+Border+Shadow */

// box-sizing: border-box;

// position: absolute;
// height: 314.4px;
// left: 384px;
// right: 384px;
// top: 751.59px;

// background: #FFFFFF;
// border: 1px solid #F3F4F6;
// box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px -1px rgba(0, 0, 0, 0.1);
// border-radius: 16px;
