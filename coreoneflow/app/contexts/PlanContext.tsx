'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type PlanType = 'starter' | 'professional' | 'business' | 'enterprise';

export interface PlanLimits {
  users: number;
  customers: number;
  leads: number;
  projects: number;
  storageGB: number;
  aiQueries: number;
}

export interface PlanFeatures {
  leads: boolean;
  customers: boolean;
  projects: 'none' | 'basic' | 'advanced';
  analytics: 'none' | 'basic' | 'advanced';
  aiAssistant: 'none' | 'basic' | 'advanced';
  automation: boolean;
  collaboration: boolean;
  customization: 'none' | 'basic' | 'advanced';
  fileManagement: boolean;
  ganttCharts: boolean;
  apiAccess: boolean;
  sso: boolean;
}

export interface PlanPrice {
  monthly: string;
  yearly?: string;
}

export interface Plan {
  type: PlanType;
  displayName: string;
  price: PlanPrice;
  currency: string;
  limits: PlanLimits;
  features: PlanFeatures;
}

export interface UserPlan extends Plan {
  expiresAt: string;
  isActive: boolean;
}

export interface PlanUsage {
  users: number;
  customers: number;
  leads: number;
  projects: number;
  storageUsedGB: number;
  aiQueriesUsed: number;
}

export const availablePlans: Record<PlanType, Plan> = {
  starter: {
    type: 'starter',
    displayName: 'Starter',
    price: { monthly: '49 PLN', yearly: '490 PLN' },
    currency: 'PLN',
    limits: { users: 2, customers: 100, leads: 0, projects: 5, storageGB: 2, aiQueries: 0 },
    features: {
      leads: false,
      customers: true,
      projects: 'basic',
      analytics: 'basic',
      aiAssistant: 'none',
      automation: false,
      collaboration: false,
      customization: 'basic',
      fileManagement: false,
      ganttCharts: false,
      apiAccess: false,
      sso: false,
    },
  },
  professional: {
    type: 'professional',
    displayName: 'Professional',
    price: { monthly: '149 PLN', yearly: '1490 PLN' },
    currency: 'PLN',
    limits: { users: 10, customers: 1000, leads: 500, projects: 50, storageGB: 10, aiQueries: 50 },
    features: {
      leads: true,
      customers: true,
      projects: 'basic',
      analytics: 'basic',
      aiAssistant: 'basic',
      automation: true,
      collaboration: false,
      customization: 'basic',
      fileManagement: false,
      ganttCharts: false,
      apiAccess: false,
      sso: false,
    },
  },
  business: {
    type: 'business',
    displayName: 'Business',
    price: { monthly: '299 PLN', yearly: '2990 PLN' },
    currency: 'PLN',
    limits: { users: 50, customers: 5000, leads: 2000, projects: 200, storageGB: 100, aiQueries: 200 },
    features: {
      leads: true,
      customers: true,
      projects: 'advanced',
      analytics: 'advanced',
      aiAssistant: 'basic',
      automation: true,
      collaboration: true,
      customization: 'advanced',
      fileManagement: true,
      ganttCharts: true,
      apiAccess: false,
      sso: false,
    },
  },
  enterprise: {
    type: 'enterprise',
    displayName: 'Enterprise',
    price: { monthly: '599 PLN', yearly: '5990 PLN' },
    currency: 'PLN',
    limits: { users: -1, customers: -1, leads: -1, projects: -1, storageGB: -1, aiQueries: -1 },
    features: {
      leads: true,
      customers: true,
      projects: 'advanced',
      analytics: 'advanced',
      aiAssistant: 'advanced',
      automation: true,
      collaboration: true,
      customization: 'advanced',
      fileManagement: true,
      ganttCharts: true,
      apiAccess: true,
      sso: true,
    },
  },
};

interface PlanContextType {
  userPlan: UserPlan;
  usage: PlanUsage;
  canEnableFeature: (feature: keyof PlanFeatures) => boolean;
  canCreateMore: (resource: keyof PlanLimits) => boolean;
  getUsagePercentage: (resource: keyof PlanLimits) => number;
  isUsageNearLimit: (resource: keyof PlanLimits, threshold?: number) => boolean;
  switchPlan: (newPlanType: PlanType) => void;
  incrementUsage: (resource: keyof PlanUsage, amount?: number) => void;
  decrementUsage: (resource: keyof PlanUsage, amount?: number) => void;
  showUpgradeModal: boolean;
  setShowUpgradeModal: (show: boolean) => void;
  showPlanModal: boolean;
  setShowPlanModal: (show: boolean) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [userPlan, setUserPlan] = useState<UserPlan>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userPlan');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    // Default to Professional plan for demo
    return {
      ...availablePlans.professional,
      expiresAt: '2026-01-25',
      isActive: true,
    };
  });

  const [usage, setUsage] = useState<PlanUsage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('planUsage');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    // Default usage for demo
    return {
      users: 3,
      customers: 45,
      leads: 23,
      projects: 8,
      storageUsedGB: 2.3,
      aiQueriesUsed: 12,
    };
  });

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('userPlan', JSON.stringify(userPlan));
  }, [userPlan]);

  useEffect(() => {
    localStorage.setItem('planUsage', JSON.stringify(usage));
  }, [usage]);

  const canEnableFeature = (feature: keyof PlanFeatures): boolean => {
    const featureValue = userPlan.features[feature];
    return featureValue !== false && featureValue !== 'none';
  };

  const canCreateMore = (resource: keyof PlanLimits): boolean => {
    const limit = userPlan.limits[resource];
    const used = usage[resource as keyof PlanUsage] || 0;
    
    // -1 means unlimited
    if (limit === -1) return true;
    
    return used < limit;
  };

  const getUsagePercentage = (resource: keyof PlanLimits): number => {
    const limit = userPlan.limits[resource];
    const used = usage[resource as keyof PlanUsage] || 0;
    
    // -1 means unlimited, return 0% for display
    if (limit === -1) return 0;
    
    return Math.min((used / limit) * 100, 100);
  };

  const isUsageNearLimit = (resource: keyof PlanLimits, threshold: number = 80): boolean => {
    const percentage = getUsagePercentage(resource);
    return percentage >= threshold && userPlan.limits[resource] !== -1;
  };

  const switchPlan = (newPlanType: PlanType) => {
    const newPlan = availablePlans[newPlanType];
    setUserPlan({
      ...newPlan,
      expiresAt: '2026-01-25',
      isActive: true,
    });
  };

  const incrementUsage = (resource: keyof PlanUsage, amount: number = 1) => {
    setUsage(prev => ({
      ...prev,
      [resource]: prev[resource] + amount,
    }));
  };

  const decrementUsage = (resource: keyof PlanUsage, amount: number = 1) => {
    setUsage(prev => ({
      ...prev,
      [resource]: Math.max(0, prev[resource] - amount),
    }));
  };

  return (
    <PlanContext.Provider
      value={{
        userPlan,
        usage,
        canEnableFeature,
        canCreateMore,
        getUsagePercentage,
        isUsageNearLimit,
        switchPlan,
        incrementUsage,
        decrementUsage,
        showUpgradeModal,
        setShowUpgradeModal,
        showPlanModal,
        setShowPlanModal,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
}

// Helper function to format limits for display
export const formatLimit = (limit: number): string => {
  if (limit === -1) return 'Unlimited';
  if (limit >= 1000) return `${(limit / 1000).toFixed(limit % 1000 === 0 ? 0 : 1)}k`;
  return limit.toString();
};