import { PredefinedTemplate } from "../../../types/notes/templates";

export const predefinedTemplates: Record<string, PredefinedTemplate> = {
  flight_inspection: {
    name: "Pre-Flight Inspection",
    description: "Comprehensive pre-flight safety checklist",
    noteType: "checklist",
    category: "flight_operations",
    fields: [
      { id: '1', type: 'text', label: 'Aircraft Registration', required: true, placeholder: 'e.g., N12345' },
      { id: '2', type: 'select', label: 'Aircraft Type', required: true, options: ['B737-800', 'A320', 'B777-300ER', 'A350-900'] },
      { id: '3', type: 'text', label: 'Flight Number', required: true, placeholder: 'e.g., AA1234' },
      { id: '4', type: 'date', label: 'Inspection Date', required: true },
      { id: '5', type: 'user', label: 'Inspector', required: true },
      { id: '6', type: 'checkbox', label: 'Fuel Quantity Check', required: true },
      { id: '7', type: 'checkbox', label: 'Landing Gear Inspection', required: true },
      { id: '8', type: 'checkbox', label: 'Engine Parameters Normal', required: true },
      { id: '9', type: 'textarea', label: 'Additional Notes', required: false, placeholder: 'Any observations...' }
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
      { id: '5', type: 'textarea', label: 'Incident Description', required: true, placeholder: 'Detailed description...' },
      { id: '6', type: 'user', label: 'Reported By', required: true },
      { id: '7', type: 'textarea', label: 'Immediate Actions', required: true },
      { id: '8', type: 'textarea', label: 'Preventive Measures', required: false, placeholder: 'Recommendations...' }
    ]
  },
  ground_handling: {
    name: "Ground Handling Checklist",
    description: "Aircraft ground operations and servicing",
    noteType: "checklist",
    category: "ground_operations",
    fields: [
      { id: '1', type: 'text', label: 'Aircraft Registration', required: true, placeholder: 'e.g., N12345' },
      { id: '2', type: 'text', label: 'Gate Number', required: true, placeholder: 'e.g., A12' },
      { id: '3', type: 'date', label: 'Service Date', required: true },
      { id: '4', type: 'user', label: 'Ground Crew Lead', required: true },
      { id: '5', type: 'checkbox', label: 'Baggage Loading Complete', required: true },
      { id: '6', type: 'checkbox', label: 'Catering Service Complete', required: true },
      { id: '7', type: 'checkbox', label: 'Fuel Service Complete', required: true },
      { id: '8', type: 'checkbox', label: 'Water Service Complete', required: true },
      { id: '9', type: 'checkbox', label: 'Lavatory Service Complete', required: true },
      { id: '10', type: 'textarea', label: 'Service Notes', required: false, placeholder: 'Any issues or delays...' }
    ]
  },
  security_check: {
    name: "Security Screening Report",
    description: "Airport security checkpoint operations",
    noteType: "checklist",
    category: "safety_security",
    fields: [
      { id: '1', type: 'text', label: 'Checkpoint ID', required: true, placeholder: 'e.g., CP-A1' },
      { id: '2', type: 'date', label: 'Check Date', required: true },
      { id: '3', type: 'user', label: 'Security Officer', required: true },
      { id: '4', type: 'number', label: 'Passengers Screened', required: true, placeholder: '0' },
      { id: '5', type: 'number', label: 'Alerts Triggered', required: true, placeholder: '0' },
      { id: '6', type: 'checkbox', label: 'Equipment Functioning', required: true },
      { id: '7', type: 'checkbox', label: 'Staff Present', required: true },
      { id: '8', type: 'select', label: 'Queue Status', required: true, options: ['Normal', 'Busy', 'Overcrowded'] },
      { id: '9', type: 'textarea', label: 'Incidents/Issues', required: false, placeholder: 'Any security incidents...' }
    ]
  },
  maintenance_log: {
    name: "Aircraft Maintenance Log",
    description: "Routine maintenance and repairs tracking",
    noteType: "maintenance",
    category: "maintenance",
    fields: [
      { id: '1', type: 'text', label: 'Aircraft Registration', required: true, placeholder: 'e.g., N12345' },
      { id: '2', type: 'date', label: 'Maintenance Date', required: true },
      { id: '3', type: 'user', label: 'Maintenance Engineer', required: true },
      { id: '4', type: 'select', label: 'Maintenance Type', required: true, options: ['Routine', 'Scheduled', 'Unscheduled', 'Emergency'] },
      { id: '5', type: 'textarea', label: 'Work Performed', required: true, placeholder: 'Detailed description of work...' },
      { id: '6', type: 'text', label: 'Parts Used', required: false, placeholder: 'Part numbers and quantities' },
      { id: '7', type: 'number', label: 'Hours Worked', required: true, placeholder: '0' },
      { id: '8', type: 'checkbox', label: 'Aircraft Airworthy', required: true },
      { id: '9', type: 'date', label: 'Next Inspection Due', required: true }
    ]
  },
  weather_report: {
    name: "Weather Conditions Report",
    description: "Current weather and runway conditions",
    noteType: "weather",
    category: "flight_operations",
    fields: [
      { id: '1', type: 'date', label: 'Report Date/Time', required: true },
      { id: '2', type: 'user', label: 'Meteorologist', required: true },
      { id: '3', type: 'select', label: 'Visibility', required: true, options: ['Excellent (>10km)', 'Good (5-10km)', 'Moderate (1-5km)', 'Poor (<1km)'] },
      { id: '4', type: 'select', label: 'Wind Direction', required: true, options: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] },
      { id: '5', type: 'number', label: 'Wind Speed (kts)', required: true, placeholder: '0' },
      { id: '6', type: 'select', label: 'Precipitation', required: true, options: ['None', 'Light Rain', 'Heavy Rain', 'Snow', 'Fog'] },
      { id: '7', type: 'number', label: 'Temperature (°C)', required: true, placeholder: '0' },
      { id: '8', type: 'select', label: 'Runway Condition', required: true, options: ['Dry', 'Wet', 'Icy', 'Snow Covered'] },
      { id: '9', type: 'textarea', label: 'Weather Notes', required: false, placeholder: 'Additional observations...' }
    ]
  },
  passenger_manifest: {
    name: "Passenger Manifest",
    description: "Flight passenger and crew documentation",
    noteType: "manifest",
    category: "flight_operations",
    fields: [
      { id: '1', type: 'text', label: 'Flight Number', required: true, placeholder: 'e.g., AA1234' },
      { id: '2', type: 'date', label: 'Flight Date', required: true },
      { id: '3', type: 'text', label: 'Aircraft Registration', required: true, placeholder: 'e.g., N12345' },
      { id: '4', type: 'user', label: 'Captain', required: true },
      { id: '5', type: 'user', label: 'First Officer', required: true },
      { id: '6', type: 'number', label: 'Total Passengers', required: true, placeholder: '0' },
      { id: '7', type: 'number', label: 'Cabin Crew', required: true, placeholder: '0' },
      { id: '8', type: 'number', label: 'Infants', required: true, placeholder: '0' },
      { id: '9', type: 'number', label: 'Special Assistance', required: true, placeholder: '0' },
      { id: '10', type: 'textarea', label: 'Special Notes', required: false, placeholder: 'VIP passengers, medical needs...' }
    ]
  },
  runway_inspection: {
    name: "Runway Inspection Report",
    description: "Runway condition and safety assessment",
    noteType: "inspection",
    category: "ground_operations",
    fields: [
      { id: '1', type: 'text', label: 'Runway ID', required: true, placeholder: 'e.g., 09L/27R' },
      { id: '2', type: 'date', label: 'Inspection Date', required: true },
      { id: '3', type: 'user', label: 'Inspector', required: true },
      { id: '4', type: 'select', label: 'Surface Condition', required: true, options: ['Excellent', 'Good', 'Fair', 'Poor'] },
      { id: '5', type: 'checkbox', label: 'No FOD Present', required: true },
      { id: '6', type: 'checkbox', label: 'Lighting Operational', required: true },
      { id: '7', type: 'checkbox', label: 'Markings Visible', required: true },
      { id: '8', type: 'select', label: 'Weather Impact', required: true, options: ['None', 'Light', 'Moderate', 'Severe'] },
      { id: '9', type: 'textarea', label: 'Issues Found', required: false, placeholder: 'Any problems or concerns...' }
    ]
  },
  fuel_management: {
    name: "Fuel Management Report",
    description: "Aircraft fuel loading and consumption tracking",
    noteType: "fuel",
    category: "ground_operations",
    fields: [
      { id: '1', type: 'text', label: 'Aircraft Registration', required: true, placeholder: 'e.g., N12345' },
      { id: '2', type: 'date', label: 'Fuel Date', required: true },
      { id: '3', type: 'user', label: 'Fuel Supervisor', required: true },
      { id: '4', type: 'number', label: 'Fuel Loaded (LBS)', required: true, placeholder: '0' },
      { id: '5', type: 'number', label: 'Fuel Type', required: true, placeholder: '0' },
      { id: '6', type: 'select', label: 'Fuel Quality', required: true, options: ['Jet A', 'Jet A-1', 'JP-8'] },
      { id: '7', type: 'checkbox', label: 'Quality Check Passed', required: true },
      { id: '8', type: 'number', label: 'Estimated Consumption', required: true, placeholder: '0' },
      { id: '9', type: 'textarea', label: 'Fuel Notes', required: false, placeholder: 'Any issues or observations...' }
    ]
  },
  emergency_procedures: {
    name: "Emergency Response Checklist",
    description: "Emergency situation response procedures",
    noteType: "emergency",
    category: "safety_security",
    fields: [
      { id: '1', type: 'text', label: 'Emergency ID', required: true, placeholder: 'Auto-generated' },
      { id: '2', type: 'date', label: 'Incident Date/Time', required: true },
      { id: '3', type: 'select', label: 'Emergency Type', required: true, options: ['Medical', 'Security', 'Fire', 'Weather', 'Technical'] },
      { id: '4', type: 'text', label: 'Location', required: true, placeholder: 'Terminal/Gate/Runway' },
      { id: '5', type: 'user', label: 'Incident Commander', required: true },
      { id: '6', type: 'select', label: 'Severity Level', required: true, options: ['Level 1', 'Level 2', 'Level 3', 'Level 4'] },
      { id: '7', type: 'textarea', label: 'Immediate Actions', required: true, placeholder: 'Actions taken...' },
      { id: '8', type: 'textarea', label: 'Resources Deployed', required: true, placeholder: 'Personnel and equipment...' },
      { id: '9', type: 'textarea', label: 'Follow-up Required', required: false, placeholder: 'Next steps...' }
    ]
  }
  ,
  flight_plan: {
    name: "Flight Plan (ICAO)",
    description: "Standard flight plan fields according to ICAO format",
    noteType: "flight_plan",
    category: "flight_operations",
    fields: [
      { id: '1', type: 'text', label: 'Flight Rules', required: true, placeholder: 'I/V/Y/Z' },
      { id: '2', type: 'text', label: 'Type of Flight', required: true, placeholder: 'S/N/G/M/X' },
      { id: '3', type: 'text', label: 'Aircraft Identification', required: true, placeholder: 'e.g., ABC123' },
      { id: '4', type: 'text', label: 'Aircraft Type & Wake', required: true, placeholder: 'A320/M' },
      { id: '5', type: 'text', label: 'Equipment', required: true, placeholder: 'e.g., SDFGIRWY/H' },
      { id: '6', type: 'text', label: 'Departure Aerodrome', required: true, placeholder: 'e.g., KJFK' },
      { id: '7', type: 'text', label: 'Departure Time (UTC)', required: true, placeholder: 'HHMM' },
      { id: '8', type: 'text', label: 'Cruising Speed & Level', required: true, placeholder: 'N0450 F350' },
      { id: '9', type: 'textarea', label: 'Route', required: true, placeholder: 'Planned route including waypoints' },
      { id: '10', type: 'text', label: 'Destination Aerodrome', required: true, placeholder: 'e.g., EGLL' },
      { id: '11', type: 'text', label: 'Total EET', required: true, placeholder: 'HHMM' },
      { id: '12', type: 'text', label: 'Alternate Aerodromes', required: false, placeholder: 'e.g., EHAM, EBBR' },
      { id: '13', type: 'text', label: 'Fuel Endurance', required: true, placeholder: 'HHMM' },
      { id: '14', type: 'number', label: 'Persons on Board', required: true, placeholder: '0' },
      { id: '15', type: 'textarea', label: 'Other Information', required: false, placeholder: 'e.g., RMK/...' }
    ]
  }
};