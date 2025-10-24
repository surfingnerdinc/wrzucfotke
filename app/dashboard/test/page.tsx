import Dashboard from '@/app/components/dashboard/Dashboard';

export default function DashboardTestPage() {
  return (
    <Dashboard 
      eventName="Wesele Ania & Tomek 💕"
      eventDate="2025-12-14"
      gallerySettings={{
        requireName: false, // Wyłączone wymaganie podania imienia
        allowDownload: true,
        moderatePhotos: false,
        allowComments: true
      }}
    />
  );
}