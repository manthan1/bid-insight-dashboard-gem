import React, { useEffect, useState } from 'react';
import Dashboard from '@/components/Dashboard';
import { bids } from '@/data/bids';
import { useToast } from '@/hooks/use-toast';
import { ExtendedBid, mapToExtendedBids } from '@/types/extendedBid';
import { StateBid } from '@/types/stateBid';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const { toast } = useToast();
  const [bidData, setBidData] = useState<ExtendedBid[]>(mapToExtendedBids(bids));
  const [activeTab, setActiveTab] = useState<'gem' | 'state'>('gem');

  // State bids data
  const stateBids: StateBid[] = [
    {
      "serial_no": "1.",
      "start_date": "26-Apr-2025 06:55 PM",
      "end_date": "03-May-2025 02:00 PM",
      "open_date": "03-May-2025 02:00 PM",
      "title": "Internal Clearance of Indri Drain from RD 70000 to 112000 before flood Season 2025.",
      "link": "https://eprocure.gov.in/cppp/tendersfullviewmmp/MjAzMzMwMTg5A13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1MTc0NTY3NzgxOQ==A13h1MjAyNUMwMDYzNjk3IEMwMUIgNEY2OSA5Q0U1IEMyMjQ5OTJBRkNGMTExOUlSUg==A13h1MjAyNV9IUllfNDQzMDIyXzE=",
      "location": "Haryana",
      "department": "--"
    },
    {
      "serial_no": "2.",
      "start_date": "26-Apr-2025 06:55 PM",
      "end_date": "02-May-2025 02:00 PM",
      "open_date": "02-May-2025 04:00 PM",
      "title": "LINE 01 WORD NO. 07 MAI BED BEST PROCESSING PLANT KE NIKAT TALAB KA SONIYEKARAY OR TALAB KE CHARO TARAF STRIT LIGHT DWARA SONIYEKARAY KA KARYE",
      "link": "https://eprocure.gov.in/cppp/tendersfullviewmmp/MjAzMzMwNDgyA13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1MTc0NTY3NzgxOQ==A13h1MjIwL05QUFQvRVRFTkRFUi1TVUNITkEvMjUtMjYgRFQgMTYuMDQuMjAyNQ==A13h1MjAyNV9ET0xCVV8xMDMzMTg5XzE=",
      "location": "Uttar Pradesh",
      "department": "--"
    },
    {
      "serial_no": "3.",
      "start_date": "26-Apr-2025 06:55 PM",
      "end_date": "02-May-2025 12:00 PM",
      "open_date": "02-May-2025 12:30 PM",
      "title": "Maintenance and Operation of Street Light and High Mast on Delhi PWD Road under PWD DHC , ND/Central, New Delhi",
      "link": "https://eprocure.gov.in/cppp/tendersfullviewmmp/MjAzMzMwNDY2A13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1MTc0NTY3NzgxOQ==A13h1MjIvRUVFL1BXRERIQyxOREMyMDI1LTI2A13h1MjAyNV9QV0RfMjcxMzQwXzE=",
      "location": "NCT of Delhi",
      "department": "--"
    },
    {
      "serial_no": "4.",
      "start_date": "26-Apr-2025 06:55 PM",
      "end_date": "02-May-2025 03:00 PM",
      "open_date": "02-May-2025 03:30 PM",
      "title": "RATE CONTRACT OF DIFFERENT VEHICLE OR MACHINERY FOR SOLID WASTE MANAGEMENT AND NALA SAFAI WORK.",
      "link": "https://eprocure.gov.in/cppp/tendersfullviewmmp/MjAzMzMwNDczA13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1MTc0NTY3NzgxOQ==A13h1VkVISUNMRVJFTlQvMjUtMjY=A13h1MjAyNV9OTktBTl8xMDMzMTk2XzE=",
      "location": "Uttar Pradesh",
      "department": "--"
    },
    {
      "serial_no": "5.",
      "start_date": "26-Apr-2025 06:55 PM",
      "end_date": "01-May-2025 10:00 AM",
      "open_date": "01-May-2025 03:00 PM",
      "title": "Sarvajanik interlocking kharanja may nali nirman karya mukhya sadak se prayag singh ke ghar tak dhauwa",
      "link": "https://eprocure.gov.in/cppp/tendersfullviewmmp/MjAzMzMwNDQ5A13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1MTc0NTY3NzgxOQ==A13h1MDMvMjAyNS0yNi8xNC8yNC0wNC0yMDI1A13h1MjAyNV9QUkRfNDYyODAxXzE=",
      "location": "Rajasthan",
      "department": "--"
    },
    {
      "serial_no": "6.",
      "start_date": "26-Apr-2025 06:55 PM",
      "end_date": "02-May-2025 02:00 PM",
      "open_date": "02-May-2025 04:00 PM",
      "title": "LINE 02 WORD NO. 03 MAI DR. JUNAID KE MAKAN SE ZULFIKAR KE  MAKAN TAK C0C0 SADAK OR NALI NIRMAN KARYE.910000",
      "link": "https://eprocure.gov.in/cppp/tendersfullviewmmp/MjAzMzMwNDgzA13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1MTc0NTY3NzgxOQ==A13h1MjIwL05QUFQvRVRFTkRFUi1TVUNITkEvMjUtMjYgRFQgMTYuMDQuMjAyNQ==A13h1MjAyNV9ET0xCVV8xMDMzMTg5XzI=",
      "location": "Uttar Pradesh",
      "department": "--"
    },
    {
      "serial_no": "7.",
      "start_date": "26-Apr-2025 06:55 PM",
      "end_date": "01-May-2025 10:00 AM",
      "open_date": "01-May-2025 03:00 PM",
      "title": "Sarvajanik interlocking kharanja may nali nirman karya mukhya sadak se ganv ki galiyo me",
      "link": "https://eprocure.gov.in/cppp/tendersfullviewmmp/MjAzMzMwNDM3A13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1VmpGYWExTXlTWGxTYkdoUFZqSm9jbHBJYjNkUFVUMDk=A13h1MTc0NTY3NzgxOQ==A13h1MDIvMjAyNS0yNi8xMS8yNC0wNC0yMDI1A13h1MjAyNV9QUkRfNDYyNzkwXzE=",
      "location": "Rajasthan",
      "department": "--"
    }
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
          <Dashboard bids={bidData} type="gem" />
        ) : (
          <Dashboard bids={stateBids} type="state" />
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
