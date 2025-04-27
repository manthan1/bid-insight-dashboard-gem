
import { Bid as OriginalBid } from "@/data/bids";

// Define a modified Bid type that makes bid_url optional
type ModifiedBid = Omit<OriginalBid, 'bid_url'> & { bid_url?: string };

// Extend the modified Bid type with additional properties
export interface ExtendedBid extends ModifiedBid {
  download_url: string;
}

// Type assertion function to safely convert between types
export function asBid(bid: ExtendedBid): OriginalBid {
  // Create a new object with only the properties that exist in OriginalBid
  const { bid_url, download_url, ...originalBidProps } = bid;
  return { ...originalBidProps, bid_url: bid_url || '' } as OriginalBid;
}

// Converter utility for the entire array
export function mapToExtendedBids(bids: any[]): ExtendedBid[] {
  return bids.map(bid => bid as ExtendedBid);
}
