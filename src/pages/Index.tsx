
import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import { bids } from '@/data/bids';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [bidData, setBidData] = useState(bids);

  useEffect(() => {
    console.log('Bids data loaded:', bids);
    
    if (!bids || bids.length === 0) {
      toast({
        title: "Data loading issue",
        description: "No bid data was found. Please check the data source.",
        variant: "destructive"
      });
    }
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold text-gray-900">Bid Insight Dashboard</h1>
          <p className="text-gray-500">Explore and analyze government procurement bids</p>
        </div>
      </header>
      
      <main>
        <Dashboard bids={bidData} />
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
