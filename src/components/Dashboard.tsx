import React, { useState, useEffect, useMemo } from 'react';
import { Bid } from '@/data/bids';
import BidCard from './BidCard';
import SearchBar from './SearchBar';
import FilterPanel from './FilterPanel';
import Pagination from './Pagination';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface DashboardProps {
  bids: Bid[];
}

const Dashboard: React.FC<DashboardProps> = ({ bids }) => {
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
    bids.forEach(bid => {
      if (bid.ministry) uniqueMinistries.add(bid.ministry);
    });
    return Array.from(uniqueMinistries).sort();
  }, [bids]);

  const departments = useMemo(() => {
    const uniqueDepartments = new Set<string>();
    bids.forEach(bid => {
      if (bid.department) uniqueDepartments.add(bid.department);
    });
    return Array.from(uniqueDepartments).sort();
  }, [bids]);

  const maxQuantity = useMemo(() => {
    const max = Math.max(...bids.map(bid => bid.quantity || 0));
    console.log('Max quantity calculated:', max);
    return max > 0 ? max : 100000;
  }, [bids]);

  useEffect(() => {
    setQuantityRange([0, maxQuantity]);
  }, [maxQuantity]);

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

  // Apply filters and search
  const filteredBids = useMemo(() => {
    const filtered = bids.filter((bid) => {
      // Apply search term
      const searchMatch = searchTerm === '' || (
        (bid.bid_number && bid.bid_number.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (bid.category && bid.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (bid.ministry && bid.ministry.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (bid.department && bid.department.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      // Apply ministry filter
      const ministryMatch = selectedMinistry === 'all_ministries' || bid.ministry === selectedMinistry;

      // Apply department filter
      const departmentMatch = selectedDepartment === 'all_departments' || bid.department === selectedDepartment;

      // Apply quantity range
      const quantity = bid.quantity || 0;
      const quantityMatch = quantity >= quantityRange[0] && quantity <= quantityRange[1];

      return searchMatch && ministryMatch && departmentMatch && quantityMatch;
    });
    
    console.log('Filtered bids count:', filtered.length);
    return filtered;
  }, [bids, searchTerm, selectedMinistry, selectedDepartment, quantityRange]);

  
  // Paginate the results
  const paginatedBids = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filteredBids.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    console.log('Paginated bids:', paginated);
    return paginated;
  }, [filteredBids, currentPage]);

  const totalPages = Math.ceil(filteredBids.length / ITEMS_PER_PAGE);

  // Handle page change
  const handlePageChange = (newPage: number) => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar with filters */}
        <div className="w-full md:w-1/4">
          <FilterPanel
            ministries={ministries}
            departments={departments}
            selectedMinistry={selectedMinistry}
            selectedDepartment={selectedDepartment}
            quantityRange={quantityRange}
            maxQuantity={maxQuantity}
            onMinistryChange={(value) => {
              setSelectedMinistry(value);
              setCurrentPage(1);
            }}
            onDepartmentChange={(value) => {
              setSelectedDepartment(value);
              setCurrentPage(1);
            }}
            onQuantityChange={(value) => {
              setQuantityRange(value);
              setCurrentPage(1);
            }}
            onResetFilters={handleResetFilters}
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
                <TabsList>
                  <TabsTrigger value="grid">Grid</TabsTrigger>
                  <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            Showing {paginatedBids.length} of {filteredBids.length} bids
          </div>

          {/* No results message */}
          {filteredBids.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-lg text-muted-foreground">No bids found with the current filters.</p>
              <button 
                onClick={handleResetFilters}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Grid view */}
          {viewMode === 'grid' && filteredBids.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedBids.map((bid) => (
                <BidCard key={bid.bid_id} bid={bid} />
              ))}
            </div>
          )}

          {/* List view */}
          {viewMode === 'list' && filteredBids.length > 0 && (
            <div className="space-y-3">
              {paginatedBids.map((bid) => (
                <div key={bid.bid_id} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{bid.bid_number}</h3>
                      <p className="text-sm text-muted-foreground truncate">{bid.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Quantity: <span className="font-medium">{bid.quantity}</span></p>
                      <p className="text-xs text-muted-foreground">{bid.ministry || 'No Ministry'}</p>
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
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
