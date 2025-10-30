import DashboardNavigation from '../components/dashboard/DashboardNavigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavigation />
      <main className="pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}