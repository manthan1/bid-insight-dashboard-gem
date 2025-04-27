
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

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
  showQuantityFilter?: boolean; // Added this prop
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
  onResetFilters,
  showQuantityFilter = true // Default to true
}) => {
  console.log('Filter Panel Props:', { 
    ministries, 
    departments, 
    selectedMinistry, 
    selectedDepartment, 
    quantityRange, 
    maxQuantity,
    showQuantityFilter
  });
  
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

        {showQuantityFilter && (
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
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
