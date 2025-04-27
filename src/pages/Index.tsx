
import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import { bids } from '@/data/bids';
import { useToast } from '@/hooks/use-toast';
import { ExtendedBid, mapToExtendedBids } from '@/types/extendedBid';
import { StateBid, mapToStateBids } from '@/types/stateBid';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const { toast } = useToast();
  const [bidData, setBidData] = useState<ExtendedBid[]>(mapToExtendedBids(bids));
  const [activeTab, setActiveTab] = useState<'gem' | 'state'>('gem');

  // This would be your new state data
  const stateBids: StateBid[] = [
    // ... your new state bids data would go here
  ];

  useEffect(() => {
    if (!bidData || bidData.length === 0) {
      toast({
        title: "Data loading issue",
        description: "No bid data was found. Please check the data source.",
        variant: "destructive"
      });
    }
  }, [toast, bidData]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as 'gem' | 'state');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold text-gray-800">Bid Insight Dashboard</h1>
          <p className="text-gray-500 mb-4">Explore and analyze procurement bids</p>
          
          <Tabs defaultValue="gem" onValueChange={handleTabChange}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="gem">GEM Bids</TabsTrigger>
              <TabsTrigger value="state">State Bids</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>
      
      <main>
        {activeTab === 'gem' ? (
          <Dashboard bids={bidData} />
        ) : (
          <Dashboard bids={stateBids.map(bid => ({
            bid_id: bid.serial_no,
            bid_number: bid.serial_no,
            category: bid.title,
            start_date: bid.start_date,
            end_date: bid.end_date,
            ministry: bid.department,
            department: bid.location,
            quantity: 0,
            download_url: bid.link
          }))} />
        )}
      </main>
      
      <footer className="mt-12 py-6 border-t bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2025 Bid Insight Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
