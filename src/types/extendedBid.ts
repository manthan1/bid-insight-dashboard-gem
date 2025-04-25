
import { Bid as OriginalBid } from "@/data/bids";

// Extend the original Bid type with additional properties
export interface ExtendedBid extends OriginalBid {
  bid_url?: string;
  download_url?: string;
}

// Type assertion function to safely convert between types
export function asBid(bid: ExtendedBid): OriginalBid {
  // Create a new object with only the properties that exist in OriginalBid
  const { bid_url, download_url, ...originalBidProps } = bid;
  return originalBidProps as OriginalBid;
}
