'use client';

import React from 'react';
import { PlanProvider } from '../contexts/PlanContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <PlanProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </PlanProvider>
  );
}