
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // If there's only one page, don't render the pagination
  if (totalPages <= 1) return null;

  // Create an array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxButtonsToShow = 5; // Show at most 5 page numbers
    
    if (totalPages <= maxButtonsToShow) {
      // If we have 5 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate the range of pages to show around the current page
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pages.push(-1); // -1 represents an ellipsis
      } else if (startPage === 2) {
        pages.push(2);
      }
      
      // Add middle pages
      for (let i = Math.max(3, startPage); i <= Math.min(totalPages - 2, endPage); i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (endPage < totalPages - 2) {
        pages.push(-2); // -2 represents an ellipsis
      } else if (endPage === totalPages - 2) {
        pages.push(totalPages - 1);
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex items-center justify-center space-x-1">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {getPageNumbers().map((pageNum, index) => {
        if (pageNum < 0) {
          // Render ellipsis
          return <span key={`ellipsis-${index}`} className="px-3">...</span>;
        }
        
        return (
          <Button
            key={pageNum}
            variant={currentPage === pageNum ? "default" : "outline"}
            onClick={() => onPageChange(pageNum)}
            className="h-8 w-8 p-0"
          >
            {pageNum}
          </Button>
        );
      })}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
