
import { Incident } from "../types/incident";
import IncidentItem from "./IncidentItem";

interface IncidentListProps {
  incidents: Incident[];
}

const IncidentList = ({ incidents }: IncidentListProps) => {
  if (incidents.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <p className="text-gray-500">No incidents found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <IncidentItem key={incident.id} incident={incident} />
      ))}
    </div>
  );
};

export default IncidentList;
