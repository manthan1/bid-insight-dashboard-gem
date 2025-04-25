
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Package } from 'lucide-react';
import { Bid } from '@/data/bids';

interface BidCardProps {
  bid: Bid;
}

const BidCard: React.FC<BidCardProps> = ({ bid }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Truncate long category names
  const truncateText = (text: string, maxLength: number) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{bid.bid_number}</CardTitle>
          <Badge variant={bid.quantity > 100 ? "destructive" : "outline"}>
            {bid.quantity} {bid.quantity > 1 ? "units" : "unit"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-3">{truncateText(bid.category, 100)}</p>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span>Start: {formatDate(bid.start_date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span>End: {formatDate(bid.end_date)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex flex-col items-start">
        <div className="w-full">
          <p className="text-xs font-medium">{bid.ministry || 'No Ministry'}</p>
          <p className="text-xs text-muted-foreground truncate">{bid.department || 'No Department'}</p>
        </div>
        {/* Commented out bid_url and download_url */}
        {/* {bid.download_url && (
          <a 
            href={bid.download_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-blue-500 hover:underline mt-2"
          >
            Download Bid Document
          </a>
        )} */}
      </CardFooter>
    </Card>
  );
};

export default BidCard;

