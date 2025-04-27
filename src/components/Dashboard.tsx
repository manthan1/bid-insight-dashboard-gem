import React, { useState, useEffect, useMemo } from 'react';
import BidCard from './BidCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import Pagination from './Pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ExtendedBid } from '@/types/extendedBid';
import { StateBid } from '@/types/stateBid';

interface DashboardProps {
  bids: ExtendedBid[] | StateBid[];
  type: 'gem' | 'state';
}

const Dashboard: React.FC<DashboardProps> = ({ bids, type }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMinistry, setSelectedMinistry] = useState('all_ministries');
  const [selectedDepartment, setSelectedDepartment] = useState('all_departments');
  const [quantityRange, setQuantityRange] = useState<[number, number]>([0, 100000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const ITEMS_PER_PAGE = 10;

  // Log the incoming bids to debug
  useEffect(() => {
    console.log('Bids received in Dashboard:', bids);
  }, [bids]);

  // Extract unique ministries and departments for filters
  const ministries = useMemo(() => {
    const uniqueMinistries = new Set<string>();
    if (type === 'gem') {
      (bids as ExtendedBid[]).forEach(bid => {
        if (bid.ministry) uniqueMinistries.add(bid.ministry);
      });
    }
    return Array.from(uniqueMinistries).sort();
  }, [bids, type]);

  const departments = useMemo(() => {
    const uniqueDepartments = new Set<string>();
    if (type === 'gem') {
      (bids as ExtendedBid[]).forEach(bid => {
        if (bid.department) uniqueDepartments.add(bid.department);
      });
    } else {
      (bids as StateBid[]).forEach(bid => {
        if (bid.location) uniqueDepartments.add(bid.location);
      });
    }
    return Array.from(uniqueDepartments).sort();
  }, [bids, type]);

  const maxQuantity = useMemo(() => {
    if (type === 'gem') {
      const max = Math.max(...(bids as ExtendedBid[]).map(bid => bid.quantity || 0));
      console.log('Max quantity calculated:', max);
      return max > 0 ? max : 100000;
    }
    return 100000;
  }, [bids, type]);

  useEffect(() => {
    if (type === 'gem') {
      setQuantityRange([0, maxQuantity]);
    }
  }, [maxQuantity, type]);

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedMinistry('all_ministries');
    setSelectedDepartment('all_departments');
    setQuantityRange([0, maxQuantity]);
    setCurrentPage(1);
    
    toast({
      title: "Filters Reset",
      description: "All filters have been cleared.",
    });
  };

  // Apply filters and search based on bid type
  const filteredBids = useMemo(() => {
    return bids.filter((bid) => {
      // Apply search term based on bid type
      const searchMatch = searchTerm === '' || (
        type === 'gem' 
          ? ((bid as ExtendedBid).bid_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             (bid as ExtendedBid).category?.toLowerCase().includes(searchTerm.toLowerCase()))
          : ((bid as StateBid).serial_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
             (bid as StateBid).title?.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      // Apply filters based on bid type
      const ministryMatch = type === 'gem' 
        ? selectedMinistry === 'all_ministries' || (bid as ExtendedBid).ministry === selectedMinistry
        : selectedMinistry === 'all_ministries' || (bid as StateBid).department === selectedMinistry;

      const departmentMatch = type === 'gem'
        ? selectedDepartment === 'all_departments' || (bid as ExtendedBid).department === selectedDepartment
        : selectedDepartment === 'all_departments' || (bid as StateBid).location === selectedDepartment;

      const quantityMatch = type === 'gem'
        ? ((bid as ExtendedBid).quantity || 0) >= quantityRange[0] && ((bid as ExtendedBid).quantity || 0) <= quantityRange[1]
        : true; // State bids don't have quantity

      return searchMatch && ministryMatch && departmentMatch && quantityMatch;
    });
  }, [bids, searchTerm, selectedMinistry, selectedDepartment, quantityRange, type]);

  
  // Paginate the results
  const paginatedBids = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filteredBids.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    console.log('Paginated bids for page', currentPage, ':', paginated);
    return paginated;
  }, [filteredBids, currentPage]);

  const totalPages = Math.ceil(filteredBids.length / ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (newPage: number) => {
    console.log('Page changed from', currentPage, 'to', newPage);
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search term change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  // If no bids, show a message
  useEffect(() => {
    if (bids.length === 0) {
      toast({
        title: "No bids available",
        description: "There are no bids to display. Please check your data source.",
        variant: "destructive"
      });
    }
  }, [bids, toast]);

  // Reset the page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedMinistry, selectedDepartment, quantityRange]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters panel - show quantity filter only for GEM bids */}
        <div className="w-full md:w-1/4">
          <FilterPanel
            ministries={type === 'gem' ? ministries : []}
            departments={departments}
            selectedMinistry={selectedMinistry}
            selectedDepartment={selectedDepartment}
            quantityRange={type === 'gem' ? quantityRange : [0, 0]}
            maxQuantity={maxQuantity}
            onMinistryChange={setSelectedMinistry}
            onDepartmentChange={setSelectedDepartment}
            onQuantityChange={setQuantityRange}
            onResetFilters={handleResetFilters}
            showQuantityFilter={type === 'gem'}
          />
        </div>

        {/* Main content */}
        <div className="w-full md:w-3/4 space-y-4">
          {/* Search and view toggle */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-full sm:w-2/3">
              <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={handleSearchChange} 
              />
            </div>
            <div className="w-full sm:w-1/3 flex justify-end">
              <Tabs defaultValue="grid" onValueChange={(value) => setViewMode(value as 'grid' | 'list')}>
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="grid" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
                    Grid
                  </TabsTrigger>
                  <TabsTrigger value="list" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-gray-500">
            Showing {paginatedBids.length} of {filteredBids.length} bids
          </div>

          {/* No results message */}
          {filteredBids.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-lg text-gray-500">No bids found with the current filters.</p>
              <button 
                onClick={handleResetFilters}
                className="mt-2 text-sm text-gray-700 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Grid/List views with BidCard components */}
          {viewMode === 'grid' && filteredBids.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedBids.map((bid) => (
                <BidCard 
                  key={type === 'gem' ? (bid as ExtendedBid).bid_id : (bid as StateBid).serial_no} 
                  bid={bid} 
                  type={type} 
                />
              ))}
            </div>
          )}

          {/* List view */}
          {viewMode === 'list' && filteredBids.length > 0 && (
            <div className="space-y-3">
              {paginatedBids.map((bid) => (
                <div key={type === 'gem' ? (bid as ExtendedBid).bid_id : (bid as StateBid).serial_no} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow bg-white">
                  <div className="flex justify-between items-start">
                    <div>
                      {type === 'gem' ? (
                        <>
                          <h3 className="font-medium text-gray-800">{(bid as ExtendedBid).bid_number}</h3>
                          <p className="text-sm text-gray-500 truncate">{(bid as ExtendedBid).category}</p>
                        </>
                      ) : (
                        <>
                          <h3 className="font-medium text-gray-800">{(bid as StateBid).serial_no}</h3>
                          <p className="text-sm text-gray-500 truncate">{(bid as StateBid).title}</p>
                        </>
                      )}
                    </div>
                    <div className="text-right">
                      {type === 'gem' ? (
                        <>
                          <p className="text-sm text-gray-600">Quantity: <span className="font-medium">{(bid as ExtendedBid).quantity}</span></p>
                          <p className="text-xs text-gray-500">{(bid as ExtendedBid).ministry || 'No Ministry'}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-xs text-gray-500">{(bid as StateBid).department || 'No Department'}</p>
                          <p className="text-xs text-gray-500">Location: {(bid as StateBid).location}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {filteredBids.length > 0 && (
            <div className="py-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={filteredBids.length}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
