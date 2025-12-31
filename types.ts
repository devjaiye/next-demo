
export enum NavSection {
  MAIN = 'MAIN',
  WORKBENCH = 'WORKBENCH',
  PAYMENTS = 'PAYMENTS',
  SUPPORT = 'SUPPORT'
}

export enum NavItem {
  DASHBOARD = 'Dashboard',
  CONVERSATIONS = 'Conversations',
  TIMESHEET = 'Timesheet',
  TIMEOFF = 'TimeOff',
  DISPUTES = 'Disputes',
  PROJECTS = 'Projects',
  MILESTONES = 'Milestones',
  CONTRACTS = 'Contracts',
  PERKS = 'Perks',
  PERFORMANCE = 'Performance',
  EARNINGS = 'Earnings',
  INVOICES = 'Invoices',
  REFERRAL = 'Referral',
  SUPPORT_CENTER = 'Support Center',
  SETTINGS = 'Settings',
  // Global Context Items
  CLIENTS = 'Clients',
  DOCUMENTS = 'Documents',
  ELITE_JOBS = 'Elite Jobs',
  APPLICATIONS = 'Applications',
  ASSESSMENTS = 'Assessments',
  INTERVIEWS = 'Interviews',
  // Account Group
  PROFILE = 'Profile',
  INSIGHTS_HUB = 'Insights Hub',
  // Learn Group
  UPSKILL = 'Upskill',
  // Pending Context Items
  ONBOARDING = 'Onboarding'
}

export interface Perk {
  id: string;
  title: string;
  description: string;
  category: 'Health' | 'Lifestyle' | 'Finance';
  icon: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
