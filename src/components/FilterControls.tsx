
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SeverityLevel } from "../types/incident";

interface FilterControlsProps {
  severityFilter: string;
  setSeverityFilter: (severity: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

const FilterControls = ({
  severityFilter,
  setSeverityFilter,
  sortOrder,
  setSortOrder,
}: FilterControlsProps) => {
  const handleSeverityChange = (value: string) => {
    setSeverityFilter(value);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filter by Severity
        </label>
        <Select value={severityFilter} onValueChange={handleSeverityChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Severities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sort by Date
        </label>
        <Select value={sortOrder} onValueChange={handleSortChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterControls;
