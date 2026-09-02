export const initialTasks = [
  {
    id: '1',
    title: 'Check September budget',
    category: 'finance',
    completed: true,
    group: 'today'
  },
  {
    id: '2',
    title: 'Pay electricity bill',
    category: 'recurring',
    completed: true,
    group: 'today'
  },
  {
    id: '3',
    title: 'Buy groceries — keep under 400 ETB',
    category: 'personal',
    completed: false,
    group: 'today'
  },
  {
    id: '4',
    title: 'Transfer savings to Awash',
    category: 'finance',
    completed: false,
    group: 'today'
  },
  {
    id: '5',
    title: 'Follow up — 1,200 ETB received from Yonas',
    category: 'finance',
    completed: false,
    group: 'today'
  },
  {
    id: '6',
    title: 'Review weekly spending (every Sunday)',
    category: 'recurring',
    completed: false,
    group: 'recurring'
  }
];

export const initialCategories = [
  {
    id: 'food',
    name: 'Food',
    percentage: 88,
    status: 'warning', // red line 88%
    color: 'bg-red-500'
  },
  {
    id: 'transport',
    name: 'Transport',
    percentage: 55,
    status: 'healthy', // blue line 55%
    color: 'bg-blue-500'
  },
  {
    id: 'bills',
    name: 'Bills',
    percentage: 105,
    status: 'over', // over label with red line
    color: 'bg-red-500'
  }
];

export const initialTransactions = [
  {
    id: 't1',
    title: 'Bole Supermarket',
    subtext: 'food · via SMS',
    amount: -850,
    currency: 'ETB',
    dotColor: 'bg-red-500'
  },
  {
    id: 't2',
    title: 'Taxi — POS',
    subtext: 'transport · via SMS',
    amount: -120,
    currency: 'ETB',
    dotColor: 'bg-blue-500'
  },
  {
    id: 't3',
    title: 'Salary — CBE',
    subtext: 'income · via SMS',
    amount: 12000,
    currency: 'ETB',
    dotColor: 'bg-emerald-500'
  }
];
