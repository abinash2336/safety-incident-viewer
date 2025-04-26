
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Incident, SeverityLevel } from "../types/incident";
import { useToast } from "@/hooks/use-toast";

interface IncidentFormProps {
  onSubmit: (incident: Omit<Incident, "id">) => void;
}

const IncidentForm = ({ onSubmit }: IncidentFormProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<SeverityLevel | "">("");
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    severity: "",
  });

  const validate = () => {
    const newErrors = {
      title: title ? "" : "Title is required",
      description: description ? "" : "Description is required",
      severity: severity ? "" : "Severity is required",
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      const now = new Date().toISOString();
      onSubmit({
        title,
        description,
        severity: severity as SeverityLevel,
        reported_at: now,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setSeverity("");

      // Show success notification
      toast({
        title: "Incident Reported",
        description: "Your incident has been successfully added to the dashboard.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Report New Incident</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter incident title"
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about the incident"
              className={`min-h-[100px] ${
                errors.description ? "border-red-500" : ""
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Severity
            </label>
            <Select 
              value={severity} 
              onValueChange={(value) => setSeverity(value as SeverityLevel)}
            >
              <SelectTrigger className={errors.severity ? "border-red-500" : ""}>
                <SelectValue placeholder="Select severity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
            {errors.severity && (
              <p className="text-red-500 text-xs mt-1">{errors.severity}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Submit Incident
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default IncidentForm;
