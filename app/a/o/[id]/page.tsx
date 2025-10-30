'use client';

import { useState } from 'react';
import { 
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  UserIcon,
  CalendarIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface OrderDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = await params;
  const [orderStatus, setOrderStatus] = useState('pending');
  
  // Mock order data - normally would fetch by ID
  const order = {
    id: id || 'WF-2025-001267',
    customer: 'Anna Kowalska',
    email: 'anna.kowalska@example.com',
    phone: '+48 123 456 789',
    plan: 'Wedding - Roczny',
    amount: 600,
    amountNet: 487.80,
    vatAmount: 112.20,
    status: orderStatus,
    paymentMethod: 'Karta płatnicza',
    date: '2025-10-30 14:23:15',
    customerType: 'personal',
    billingAddress: {
      firstName: 'Anna',
      lastName: 'Kowalska',
      address: 'ul. Kwiatowa 15/3',
      postalCode: '00-001',
      city: 'Warszawa'
    },
    orderDetails: {
      planDuration: '12 miesięcy',
      features: [
        'Nieograniczona ilość zdjęć',
        'Kreator plakatów PDF (7 formatów)',
        '11 profesjonalnych filtrów',
        'Usuwanie tła ze zdjęć',
        'Kod QR do galerii',
        'Własny link galerii',
        'Wsparcie priorytetowe'
      ],
      validFrom: '2025-10-30',
      validTo: '2026-10-30'
    }
  };

  const handleStatusChange = (newStatus: 'completed' | 'cancelled') => {
    setOrderStatus(newStatus);
    // Here you would make API call to update order status
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case 'pending':
        return <ClockIcon className="w-6 h-6 text-yellow-500" />;
      case 'cancelled':
        return <XCircleIcon className="w-6 h-6 text-red-500" />;
      default:
        return <ClockIcon className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Opłacone';
      case 'pending':
        return 'Oczekuje na płatność';
      case 'cancelled':
        return 'Anulowane';
      default:
        return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/a/o"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-500" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Zamówienie #{order.id}</h1>
                <p className="text-sm text-gray-500">Szczegóły zamówienia i zarządzanie</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-3">
              {order.status === 'pending' && (
                <>
                  <button
                    onClick={() => handleStatusChange('completed')}
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <CheckCircleIcon className="w-4 h-4 mr-2" />
                    Oznacz jako opłacone
                  </button>
                  <button
                    onClick={() => handleStatusChange('cancelled')}
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <XCircleIcon className="w-4 h-4 mr-2" />
                    Anuluj zamówienie
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Status Banner */}
        <div className={`rounded-lg border-2 p-4 mb-8 ${getStatusColor(order.status)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(order.status)}
              <div>
                <h3 className="font-semibold">Status zamówienia: {getStatusText(order.status)}</h3>
                <p className="text-sm opacity-75">
                  {order.status === 'pending' && 'Oczekuje na potwierdzenie płatności'}
                  {order.status === 'completed' && 'Zamówienie zostało opłacone i zrealizowane'}
                  {order.status === 'cancelled' && 'Zamówienie zostało anulowane'}
                </p>
              </div>
            </div>
            <div className="text-sm opacity-75">
              {order.date}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Customer Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  {order.customerType === 'company' ? (
                    <BuildingOfficeIcon className="w-5 h-5 mr-2" />
                  ) : (
                    <UserIcon className="w-5 h-5 mr-2" />
                  )}
                  Dane klienta
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Nazwa / Imię i nazwisko</label>
                  <div className="text-lg font-medium text-gray-900">{order.customer}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{order.email}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Telefon</label>
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{order.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Adres rozliczeniowy</label>
                  <div className="text-gray-900">
                    {order.billingAddress.firstName} {order.billingAddress.lastName}<br />
                    {order.billingAddress.address}<br />
                    {order.billingAddress.postalCode} {order.billingAddress.city}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Szczegóły zamówienia</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Plan</label>
                    <div className="text-lg font-medium text-gray-900">{order.plan}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Okres</label>
                    <div className="text-gray-900">{order.orderDetails.planDuration}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ważny od</label>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{order.orderDetails.validFrom}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Ważny do</label>
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{order.orderDetails.validTo}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">Funkcje w planie</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {order.orderDetails.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <CreditCardIcon className="w-5 h-5 mr-2" />
                  Informacje o płatności
                </h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Metoda płatności</label>
                    <div className="text-gray-900">{order.paymentMethod}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Data zamówienia</label>
                    <div className="text-gray-900">{order.date}</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cena netto:</span>
                      <span className="font-medium">{order.amountNet.toFixed(2)} zł</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">VAT 23%:</span>
                      <span className="font-medium">{order.vatAmount.toFixed(2)} zł</span>
                    </div>
                    <div className="border-t border-gray-300 pt-2">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900">Razem:</span>
                        <span className="text-lg font-semibold text-gray-900">{order.amount} zł</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Szybkie akcje</h3>
              <div className="space-y-3">
                
                {order.status === 'completed' && (
                  <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
                    <DocumentTextIcon className="w-4 h-4 mr-2" />
                    Pobierz fakturę
                  </button>
                )}

                <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center">
                  <EnvelopeIcon className="w-4 h-4 mr-2" />
                  Wyślij email do klienta
                </button>

                <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Eksportuj dane
                </button>

                <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Historia zmian
                </button>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Historia zamówienia</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ClockIcon className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Zamówienie złożone</div>
                    <div className="text-xs text-gray-500">{order.date}</div>
                  </div>
                </div>
                
                {order.status === 'completed' && (
                  <div className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Płatność potwierdzona</div>
                      <div className="text-xs text-gray-500">2025-10-30 14:25:30</div>
                    </div>
                  </div>
                )}

                {order.status === 'completed' && (
                  <div className="flex items-start space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Konto aktywowane</div>
                      <div className="text-xs text-gray-500">2025-10-30 14:26:15</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Customer Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Statystyki klienta</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Zamówienia:</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Łączna wartość:</span>
                  <span className="font-medium">850 zł</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Klient od:</span>
                  <span className="font-medium">2024-06-15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Aktywny</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}