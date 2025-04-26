
import { useState } from "react";
import { Incident } from "../types/incident";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface IncidentItemProps {
  incident: Incident;
}

const IncidentItem = ({ incident }: IncidentItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Format the date for display
  const formattedDate = new Date(incident.reported_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // Determine the background color for the severity badge
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'low':
        return 'bg-severity-low';
      case 'medium':
        return 'bg-severity-medium';
      case 'high':
        return 'bg-severity-high';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow animate-fade-in">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold mr-3">{incident.title}</h3>
              <span className={`${getSeverityColor(incident.severity)} text-white text-xs font-medium px-2.5 py-0.5 rounded`}>
                {incident.severity}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              Reported: {formattedDate}
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            className="mt-2 md:mt-0"
            onClick={toggleExpand}
          >
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                View Details
              </>
            )}
          </Button>
        </div>

        {isExpanded && (
          <div className="mt-4 p-3 bg-gray-50 rounded-md animate-accordion-down">
            <p className="text-gray-700">{incident.description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IncidentItem;
