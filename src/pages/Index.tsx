
import { useState, useEffect } from "react";
import { Incident } from "../types/incident";
import FilterControls from "../components/FilterControls";
import IncidentList from "../components/IncidentList";
import IncidentForm from "../components/IncidentForm";
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// Sample mock data
const initialIncidents: Incident[] = [
  {
    id: "1",
    title: "Biased Recommendation Algorithm",
    description: "Algorithm consistently favored certain demographics in content recommendations, leading to underrepresentation of minority groups in search results and suggested content. The issue was identified through user feedback and data analysis showing a statistical bias in recommendation patterns.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z"
  },
  {
    id: "2",
    title: "LLM Hallucination in Critical Info",
    description: "LLM provided incorrect safety procedure information when asked about handling emergency situations. The model confidently presented fabricated safety protocols that could potentially endanger users if followed. This was caught during quality assurance testing before deployment.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z"
  },
  {
    id: "3",
    title: "Minor Data Leak via Chatbot",
    description: "Chatbot inadvertently exposed non-sensitive user metadata in responses when specific patterns of questions were asked. While no personal identifiable information was leaked, system metadata was visible that should have remained private.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z"
  }
];

const Index = () => {
  const [incidents, setIncidents] = useState<Incident[]>(initialIncidents);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>(initialIncidents);
  const [severityFilter, setSeverityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showForm, setShowForm] = useState(false);

  // Apply filters and sorting whenever incidents, severityFilter or sortOrder change
  useEffect(() => {
    let result = [...incidents];

    // Apply severity filter
    if (severityFilter !== "All") {
      result = result.filter(
        (incident) => incident.severity === severityFilter
      );
    }

    // Apply sort order
    result.sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredIncidents(result);
  }, [incidents, severityFilter, sortOrder]);

  const handleAddIncident = (newIncident: Omit<Incident, "id">) => {
    const incidentWithId = {
      ...newIncident,
      id: uuidv4(),
    };
    setIncidents([...incidents, incidentWithId]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <header className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Safety Incident Dashboard</h1>
          <p className="text-gray-600">Monitor and track AI safety incidents in one place</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Incidents</h2>
                <Button 
                  onClick={() => setShowForm(!showForm)}
                  className="md:hidden"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {showForm ? "Hide Form" : "New Incident"}
                </Button>
              </div>
              
              <FilterControls
                severityFilter={severityFilter}
                setSeverityFilter={setSeverityFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
              />
              
              <IncidentList incidents={filteredIncidents} />
            </div>
          </div>

          <div className={`lg:block ${showForm ? 'block' : 'hidden'}`}>
            <IncidentForm onSubmit={handleAddIncident} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
