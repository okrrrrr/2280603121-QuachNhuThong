// frontend/src/services/inspector.service.js

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEYS = {
  VIOLATIONS: 'metro_inspector_violations_'
};

export const inspectorService = {
  getViolations: async () => {
    await delay(600);
    const data = localStorage.getItem(STORAGE_KEYS.VIOLATIONS);
    return data ? JSON.parse(data) : [];
  },

  createViolation: async (data) => {
    await delay(1200); // Simulate api + image upload delay
    const violations = await inspectorService.getViolations();
    const newViolation = {
      id: `VP-${Date.now().toString().slice(-6)}`,
      ...data,
      date: new Date().toISOString(),
      status: 'UNPAID' // UNPAID, PAID
    };
    violations.unshift(newViolation);
    localStorage.setItem(STORAGE_KEYS.VIOLATIONS, JSON.stringify(violations));
    return { success: true, violation: newViolation };
  },

  getStatistics: async () => {
    await delay(500);
    const violations = await inspectorService.getViolations();
    
    // Simulate some logic
    const totalChecks = 1250; 
    const totalViolations = violations.length + 15; // +15 as mock initial
    const unpaid = violations.filter(v => v.status === 'UNPAID').length + 5;
    const paid = totalViolations - unpaid;
    const violationRate = ((totalViolations / totalChecks) * 100).toFixed(1);

    return {
      totalChecks,
      totalViolations,
      unpaid,
      paid,
      violationRate,
      recentTrend: [12, 15, 8, 22, 14, 19, 25] // simulated 7-day trend
    };
  },

  quickCheck: async (mockType) => {
    await delay(800);
    // Simulate random outcomes based on NFC/QR
    const isSuccess = Math.random() > 0.2; // 80% success
    
    if (isSuccess) {
      return { 
        status: 'ALLOW', 
        message: 'Vé hợp lệ', 
        ticketInfo: { type: 'Vé tháng', name: 'Nguyễn Văn A' } 
      };
    } else {
      return { 
        status: 'DENY', 
        message: 'Vé không hợp lệ hoặc hết hạn', 
        ticketInfo: null 
      };
    }
  }
};

export default inspectorService;
