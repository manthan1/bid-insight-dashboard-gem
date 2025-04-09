
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter, X, FileIcon, Upload } from 'lucide-react';
import { Bid } from '@/data/bids';
import { useToast } from '@/components/ui/use-toast';
import { compareBids } from '@/utils/bidComparison';

interface FilterPanelProps {
  ministries: string[];
  departments: string[];
  selectedMinistry: string;
  selectedDepartment: string;
  quantityRange: [number, number];
  maxQuantity: number;
  onMinistryChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onQuantityChange: (value: [number, number]) => void;
  onResetFilters: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  ministries,
  departments,
  selectedMinistry,
  selectedDepartment,
  quantityRange,
  maxQuantity,
  onMinistryChange,
  onDepartmentChange,
  onQuantityChange,
  onResetFilters
}) => {
  const { toast } = useToast();
  const [comparisonResult, setComparisonResult] = useState<{
    addedBids: Bid[];
    removedBids: Bid[];
    modifiedBids: { original: Bid; modified: Bid }[];
    hasChanges: boolean;
  } | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const newBids = JSON.parse(content) as Bid[];
        
        // Get current bids from the parent component
        // For now, we'll import directly from the bids file since we don't have a state management system
        import('@/data/bids').then(({ bids }) => {
          const result = compareBids(bids, newBids);
          setComparisonResult(result);
          
          if (!result.hasChanges) {
            toast({
              title: "No differences found",
              description: "The uploaded bids are identical to the current bids.",
            });
          } else {
            toast({
              title: "Differences found",
              description: `Added: ${result.addedBids.length}, Removed: ${result.removedBids.length}, Modified: ${result.modifiedBids.length}`,
            });
          }
        });
      } catch (error) {
        toast({
          title: "Error parsing JSON",
          description: "Please ensure the file contains valid JSON data.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filters
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onResetFilters}
          className="h-8 text-xs"
        >
          <X className="h-3 w-3 mr-1" /> Reset
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="ministry-filter" className="text-sm">Ministry</Label>
          <Select value={selectedMinistry} onValueChange={onMinistryChange}>
            <SelectTrigger id="ministry-filter" className="mt-1">
              <SelectValue placeholder="All Ministries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_ministries">All Ministries</SelectItem>
              {ministries.map((ministry) => (
                <SelectItem key={ministry} value={ministry}>{ministry}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="department-filter" className="text-sm">Department</Label>
          <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
            <SelectTrigger id="department-filter" className="mt-1">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all_departments">All Departments</SelectItem>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>{department}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="quantity-filter" className="text-sm">Quantity Range</Label>
            <span className="text-xs text-muted-foreground">
              {quantityRange[0]} - {quantityRange[1]}
            </span>
          </div>
          <Slider 
            id="quantity-filter"
            defaultValue={[0, maxQuantity]}
            min={0}
            max={maxQuantity}
            step={1}
            value={[quantityRange[0], quantityRange[1]]}
            onValueChange={(value) => onQuantityChange(value as [number, number])}
            className="my-5"
          />
        </div>

        <div className="border-t pt-4 mt-4">
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
            <FileIcon className="h-3.5 w-3.5" /> Compare Bids
          </h4>
          <p className="text-xs text-muted-foreground mb-2">
            Upload a JSON file with bids to compare with current data
          </p>
          <div className="flex items-center gap-2">
            <Label 
              htmlFor="bid-file" 
              className="cursor-pointer px-3 py-1.5 rounded-md border border-dashed flex items-center gap-1 hover:bg-gray-50 transition-colors text-sm"
            >
              <Upload className="h-3.5 w-3.5" />
              Choose File
            </Label>
            <input 
              type="file" 
              id="bid-file" 
              accept=".json" 
              className="hidden" 
              onChange={handleFileUpload}
            />
          </div>

          {comparisonResult && comparisonResult.hasChanges && (
            <div className="mt-3 text-xs">
              <h5 className="font-medium mb-1">Comparison Results:</h5>
              <ul className="space-y-1">
                <li className="flex justify-between">
                  <span>Added:</span> 
                  <span className="text-green-600 font-medium">{comparisonResult.addedBids.length}</span>
                </li>
                <li className="flex justify-between">
                  <span>Removed:</span> 
                  <span className="text-red-600 font-medium">{comparisonResult.removedBids.length}</span>
                </li>
                <li className="flex justify-between">
                  <span>Modified:</span> 
                  <span className="text-orange-600 font-medium">{comparisonResult.modifiedBids.length}</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
