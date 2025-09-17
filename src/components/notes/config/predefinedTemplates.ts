import { PredefinedTemplate } from "../../../types/notes/templates";

export const predefinedTemplates: Record<string, PredefinedTemplate> = {
  flight_inspection: {
    name: "Flight Inspection Checklist",
    description: "Pre-flight safety inspection template",
    noteType: "checklist",
    category: "flight_operations",
    fields: [
      { id: '1', type: 'text', label: 'Aircraft Registration', required: true, placeholder: 'e.g., N12345' },
      { id: '2', type: 'select', label: 'Aircraft Type', required: true, options: ['B737-800', 'A320', 'B777-300ER', 'A350-900'] },
      { id: '3', type: 'text', label: 'Flight Number', required: true, placeholder: 'e.g., AA1234' },
      { id: '4', type: 'date', label: 'Inspection Date', required: true },
      { id: '5', type: 'user', label: 'Inspector', required: true },
      { id: '6', type: 'textarea', label: 'Weather Conditions', required: false, placeholder: 'Current weather conditions...' },
      { id: '7', type: 'checkbox', label: 'Fuel Quantity Check', required: true },
      { id: '8', type: 'checkbox', label: 'Landing Gear Inspection', required: true },
      { id: '9', type: 'checkbox', label: 'Engine Parameters Normal', required: true },
      { id: '10', type: 'textarea', label: 'Additional Notes', required: false, placeholder: 'Any additional observations...' }
    ]
  },
  incident_report: {
    name: "Aviation Incident Report",
    description: "Comprehensive incident documentation",
    noteType: "incident",
    category: "safety_security",
    fields: [
      { id: '1', type: 'text', label: 'Incident ID', required: true, placeholder: 'Auto-generated' },
      { id: '2', type: 'date', label: 'Incident Date/Time', required: true },
      { id: '3', type: 'text', label: 'Location', required: true, placeholder: 'Airport/Gate/etc.' },
      { id: '4', type: 'select', label: 'Severity Level', required: true, options: ['Minor', 'Moderate', 'Major', 'Critical'] },
      { id: '5', type: 'textarea', label: 'Incident Description', required: true, placeholder: 'Detailed description of the incident...' },
      { id: '6', type: 'tags', label: 'Involved Parties', required: false, placeholder: 'Personnel, passengers, equipment...' },
      { id: '7', type: 'textarea', label: 'Immediate Actions Taken', required: true },
      { id: '8', type: 'user', label: 'Reported By', required: true },
      { id: '9', type: 'textarea', label: 'Root Cause Analysis', required: false, placeholder: 'Analysis of underlying causes...' },
      { id: '10', type: 'textarea', label: 'Preventive Measures', required: false, placeholder: 'Recommendations to prevent recurrence...' }
    ]
  },
  sop_template: {
    name: "Standard Operating Procedure",
    description: "Structured SOP documentation template",
    noteType: "sop",
    category: "flight_operations",
    fields: [
      { id: '1', type: 'text', label: 'SOP Number', required: true, placeholder: 'SOP-XXX-001' },
      { id: '2', type: 'text', label: 'Version', required: true, placeholder: '1.0' },
      { id: '3', type: 'date', label: 'Effective Date', required: true },
      { id: '4', type: 'user', label: 'Approved By', required: true },
      { id: '5', type: 'textarea', label: 'Purpose & Scope', required: true, placeholder: 'Define the purpose and scope of this procedure...' },
      { id: '6', type: 'rich_text', label: 'Procedure Steps', required: true },
      { id: '7', type: 'textarea', label: 'Responsibilities', required: false, placeholder: 'Define roles and responsibilities...' },
      { id: '8', type: 'textarea', label: 'Safety Considerations', required: false, placeholder: 'Safety requirements and precautions...' },
      { id: '9', type: 'tags', label: 'Related Documents', required: false, placeholder: 'References, regulations, etc.' },
      { id: '10', type: 'date', label: 'Review Date', required: true }
    ]
  }
};