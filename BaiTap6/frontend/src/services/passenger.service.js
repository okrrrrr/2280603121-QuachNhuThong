// frontend/src/services/passenger.service.js

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEYS = {
  BALANCE: 'metro_wallet_balance_',
  TICKETS: 'metro_tickets_',
  TRANSACTIONS: 'metro_transactions_'
};

const getUserIdStr = (userId) => String(userId);

export const passengerService = {
  // --- WALLET ---
  getWalletBalance: async (userId) => {
    await delay(300);
    const id = getUserIdStr(userId);
    const balance = localStorage.getItem(STORAGE_KEYS.BALANCE + id);
    return balance ? Number(balance) : 0; // Default 0 if new user
  },

  topUp: async (userId, amount) => {
    await delay(1500); // Simulate payment gateway
    const id = getUserIdStr(userId);
    
    // Update balance
    const currentBalance = await passengerService.getWalletBalance(id);
    const newBalance = currentBalance + amount;
    localStorage.setItem(STORAGE_KEYS.BALANCE + id, newBalance.toString());

    // Record transaction
    const newTx = {
      id: Date.now().toString(),
      type: 'TOPUP',
      amount: amount,
      date: new Date().toISOString(),
      status: 'SUCCESS',
      description: 'Nạp tiền vào ví'
    };
    await passengerService._addTransaction(id, newTx);
    
    return { success: true, newBalance };
  },

  // --- TICKETS ---
  getTickets: async (userId) => {
    await delay(500);
    const id = getUserIdStr(userId);
    const ticketsJson = localStorage.getItem(STORAGE_KEYS.TICKETS + id);
    return ticketsJson ? JSON.parse(ticketsJson) : [];
  },

  purchaseTicket: async (userId, ticketData) => {
    await delay(1200);
    const id = getUserIdStr(userId);
    const currentBalance = await passengerService.getWalletBalance(id);
    
    if (currentBalance < ticketData.price) {
      throw new Error('Số dư không đủ. Vui lòng nạp thêm tiền.');
    }

    // Deduct balance
    const newBalance = currentBalance - ticketData.price;
    localStorage.setItem(STORAGE_KEYS.BALANCE + id, newBalance.toString());

    // Create ticket
    const newTicket = {
      id: `TCK-${Date.now().toString().slice(-6)}`,
      ...ticketData,
      purchaseDate: new Date().toISOString(),
      status: 'ACTIVE' // ACTIVE, USED, EXPIRED
    };
    
    const tickets = await passengerService.getTickets(id);
    tickets.unshift(newTicket);
    localStorage.setItem(STORAGE_KEYS.TICKETS + id, JSON.stringify(tickets));

    // Record transaction
    const newTx = {
      id: Date.now().toString(),
      type: 'PURCHASE',
      amount: -ticketData.price,
      date: new Date().toISOString(),
      status: 'SUCCESS',
      description: `Mua vé: ${ticketData.name}`
    };
    await passengerService._addTransaction(id, newTx);

    return { success: true, ticket: newTicket, newBalance };
  },

  // --- TRANSACTIONS ---
  getTransactions: async (userId) => {
    await delay(600);
    const id = getUserIdStr(userId);
    const txJson = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS + id);
    return txJson ? JSON.parse(txJson) : [];
  },

  _addTransaction: async (userId, transaction) => {
    const id = getUserIdStr(userId);
    const txJson = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS + id);
    const transactions = txJson ? JSON.parse(txJson) : [];
    transactions.unshift(transaction);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS + id, JSON.stringify(transactions));
  }
};

export default passengerService;
