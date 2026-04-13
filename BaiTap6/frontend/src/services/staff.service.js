// frontend/src/services/staff.service.js

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEYS = {
  HISTORY: 'metro_staff_history_',
  INCIDENTS: 'metro_staff_incidents_',
  GATES: 'metro_staff_gates_'
};

// Initial mock data
const DEFAULT_GATES = [
  { id: 'G01', name: 'Cổng Bến Thành - Hướng Vào', status: 'OPEN' },
  { id: 'G02', name: 'Cổng Bến Thành - Hướng Ra', status: 'OPEN' },
  { id: 'G03', name: 'Cổng Suối Tiên - Hướng Vào', status: 'CLOSED' },
  { id: 'G04', name: 'Cổng Suối Tiên - Hướng Ra', status: 'ERROR' },
  { id: 'G05', name: 'Cổng Thảo Điền - Đa Năng', status: 'OPEN' },
];

const DEFAULT_HISTORY = [
  { id: 'VS-001', ticketCode: 'TCK-892113', station: 'Bến Thành', time: new Date(Date.now() - 1000 * 60 * 5).toISOString(), result: 'ALLOW' },
  { id: 'VS-002', ticketCode: 'TCK-112344', station: 'Bến Thành', time: new Date(Date.now() - 1000 * 60 * 15).toISOString(), result: 'DENY (Hết tiền)' },
  { id: 'VS-003', ticketCode: 'TCK-772991', station: 'Ba Son', time: new Date(Date.now() - 1000 * 60 * 60).toISOString(), result: 'ALLOW' },
  { id: 'VS-004', ticketCode: 'TCK-009211', station: 'Suối Tiên', time: new Date(Date.now() - 1000 * 60 * 120).toISOString(), result: 'EXPIRED' },
];

export const staffService = {
  // --- VALIDATION HISTORY ---
  getValidationHistory: async () => {
    await delay(600);
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(DEFAULT_HISTORY));
      return DEFAULT_HISTORY;
    }
    return JSON.parse(data);
  },

  // --- REPORT INCIDENT ---
  getIncidents: async () => {
    await delay(500);
    const data = localStorage.getItem(STORAGE_KEYS.INCIDENTS);
    return data ? JSON.parse(data) : [];
  },

  reportIncident: async (incidentData) => {
    await delay(1000);
    const incidents = await staffService.getIncidents();
    const newIncident = {
      id: `INC-${Date.now().toString().slice(-5)}`,
      ...incidentData,
      reportedAt: new Date().toISOString(),
      status: 'PENDING'
    };
    incidents.unshift(newIncident);
    localStorage.setItem(STORAGE_KEYS.INCIDENTS, JSON.stringify(incidents));
    return { success: true, incident: newIncident };
  },

  // --- GATE MANAGEMENT ---
  getGates: async () => {
    await delay(400);
    const data = localStorage.getItem(STORAGE_KEYS.GATES);
    if (!data) {
      localStorage.setItem(STORAGE_KEYS.GATES, JSON.stringify(DEFAULT_GATES));
      return DEFAULT_GATES;
    }
    return JSON.parse(data);
  },

  updateGateStatus: async (gateId, newStatus) => {
    await delay(800);
    const gates = await staffService.getGates();
    const gateIndex = gates.findIndex(g => g.id === gateId);
    if (gateIndex > -1) {
      gates[gateIndex].status = newStatus;
      localStorage.setItem(STORAGE_KEYS.GATES, JSON.stringify(gates));
      return { success: true, gate: gates[gateIndex] };
    }
    throw new Error('Gate not found');
  }
};

export default staffService;
