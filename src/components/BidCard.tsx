import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Download } from 'lucide-react';
import { ExtendedBid } from '@/types/extendedBid';
import { StateBid } from '@/types/stateBid';

interface BidCardProps {
  bid: ExtendedBid | StateBid;
  type: 'gem' | 'state';
}

const BidCard: React.FC<BidCardProps> = ({ bid, type }) => {
  const formatDate = (dateString: string) => {
    // Handle both ISO and custom date formats
    const date = dateString.includes('T') 
      ? new Date(dateString)
      : new Date(dateString.replace(/(\d{2})-(\w{3})-(\d{4})/, '$2 $1 $3'));
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  const renderGemBid = (bid: ExtendedBid) => (
    <>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{bid.bid_number}</CardTitle>
          {bid.quantity > 0 && (
            <Badge variant={bid.quantity > 100 ? "destructive" : "outline"}>
              {bid.quantity} {bid.quantity > 1 ? "units" : "unit"}
            </Badge>
          )}
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
        {bid.download_url && (
          <a href={bid.download_url} target="_blank" rel="noopener noreferrer" className="mt-2 w-full">
            <div className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-xs font-semibold hover:bg-primary/90 transition-colors">
              <Download className="h-4 w-4" />
              Download Bid Document
            </div>
          </a>
        )}
      </CardFooter>
    </>
  );

  const renderStateBid = (bid: StateBid) => (
    <>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{bid.serial_no}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground mb-3">{truncateText(bid.title, 100)}</p>
        
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
          <p className="text-xs font-medium">{bid.department || 'No Department'}</p>
          <p className="text-xs text-muted-foreground truncate">{bid.location}</p>
        </div>
        {bid.link && (
          <a href={bid.link} target="_blank" rel="noopener noreferrer" className="mt-2 w-full">
            <div className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-2 rounded-md text-xs font-semibold hover:bg-primary/90 transition-colors">
              <Download className="h-4 w-4" />
              Download Bid Document
            </div>
          </a>
        )}
      </CardFooter>
    </>
  );

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      {type === 'gem' ? renderGemBid(bid as ExtendedBid) : renderStateBid(bid as StateBid)}
    </Card>
  );
};

export default BidCard;
