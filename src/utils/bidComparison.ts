
import { ExtendedBid } from "@/types/extendedBid";

/**
 * Compare two arrays of bids and return the differences
 * @param originalBids The original array of bids
 * @param newBids The new array of bids to compare
 * @returns Object containing added, removed and modified bids
 */
export function compareBids(originalBids: ExtendedBid[], newBids: ExtendedBid[]) {
  const addedBids: ExtendedBid[] = [];
  const removedBids: ExtendedBid[] = [];
  const modifiedBids: { original: ExtendedBid; modified: ExtendedBid }[] = [];

  // Find added and modified bids
  newBids.forEach(newBid => {
    const originalBid = originalBids.find(bid => bid.bid_id === newBid.bid_id);
    if (!originalBid) {
      // This is a new bid
      addedBids.push(newBid);
    } else if (!areBidsEqual(originalBid, newBid)) {
      // This bid was modified
      modifiedBids.push({ original: originalBid, modified: newBid });
    }
  });

  // Find removed bids
  originalBids.forEach(originalBid => {
    const exists = newBids.some(newBid => newBid.bid_id === originalBid.bid_id);
    if (!exists) {
      removedBids.push(originalBid);
    }
  });

  return {
    addedBids,
    removedBids,
    modifiedBids,
    hasChanges: addedBids.length > 0 || removedBids.length > 0 || modifiedBids.length > 0
  };
}

/**
 * Check if two bids are equal by comparing their properties
 */
function areBidsEqual(bid1: ExtendedBid, bid2: ExtendedBid): boolean {
  return (
    bid1.bid_id === bid2.bid_id &&
    bid1.bid_number === bid2.bid_number &&
    bid1.category === bid2.category &&
    bid1.quantity === bid2.quantity &&
    bid1.start_date === bid2.start_date &&
    bid1.end_date === bid2.end_date &&
    bid1.ministry === bid2.ministry &&
    bid1.department === bid2.department &&
    bid1.bid_url === bid2.bid_url &&
    bid1.download_url === bid2.download_url
  );
}
