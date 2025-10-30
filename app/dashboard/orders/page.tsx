import { ClockIcon, CheckCircleIcon, DocumentTextIcon, CreditCardIcon } from '@heroicons/react/24/outline';

export default function OrdersPage() {
  // Mock orders data
  const orders = [
    {
      id: 'WF-2025-001234',
      plan: 'Wedding - Roczny',
      status: 'completed',
      amount: 600,
      date: '2025-10-30',
      validUntil: '2026-10-30',
      paymentMethod: 'Karta płatnicza',
      invoiceUrl: '/invoices/WF-2025-001234.pdf'
    },
    {
      id: 'WF-2025-001123',
      plan: 'Wedding - Miesięczny',
      status: 'completed',
      amount: 250,
      date: '2025-09-15',
      validUntil: '2025-10-15',
      paymentMethod: 'PayPal',
      invoiceUrl: '/invoices/WF-2025-001123.pdf'
    },
    {
      id: 'WF-2025-000987',
      plan: 'Pro',
      status: 'pending',
      amount: 450,
      date: '2025-10-29',
      validUntil: null,
      paymentMethod: 'Przelew bankowy',
      invoiceUrl: null
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Opłacone';
      case 'pending':
        return 'Oczekuje na płatność';
      default:
        return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50';
      default:
        return 'text-gray-700 bg-gray-50';
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Historia zamówień</h1>
        <p className="text-gray-600">
          Przegląd wszystkich twoich zamówień i faktur
        </p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-green-900 mb-1">
              Aktualny plan: Wedding - Roczny
            </h3>
            <p className="text-green-700">
              Ważny do 30 października 2026 • Pozostało 365 dni
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-green-600 font-medium">Plan aktywny</div>
              <div className="text-xs text-green-500">Wszystkie funkcje dostępne</div>
            </div>
            <CheckCircleIcon className="w-12 h-12 text-green-500" />
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Wszystkie zamówienia</h2>
        </div>

        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span>{getStatusText(order.status)}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    #{order.id}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">{order.amount} zł</div>
                  <div className="text-sm text-gray-500">{order.date}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Plan</div>
                  <div className="text-sm text-gray-600">{order.plan}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium text-gray-900 mb-1">Metoda płatności</div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CreditCardIcon className="w-4 h-4" />
                    <span>{order.paymentMethod}</span>
                  </div>
                </div>

                {order.validUntil && (
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-1">Ważny do</div>
                    <div className="text-sm text-gray-600">{order.validUntil}</div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {order.invoiceUrl && (
                  <a
                    href={order.invoiceUrl}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    <DocumentTextIcon className="w-4 h-4 mr-2" />
                    Pobierz fakturę
                  </a>
                )}

                {order.status === 'pending' && (
                  <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors">
                    <CreditCardIcon className="w-4 h-4 mr-2" />
                    Dokończ płatność
                  </button>
                )}

                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  Szczegóły zamówienia
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        
        {/* Upgrade Plan */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Zmień plan</h3>
          <p className="text-gray-600 mb-6">
            Potrzebujesz więcej funkcji? Sprawdź nasze inne plany cenowe.
          </p>
          <a 
            href="/#pricing"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Zobacz plany cenowe
          </a>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Metody płatności</h3>
          <p className="text-gray-600 mb-6">
            Zarządzaj swoimi metodami płatności i danymi rozliczeniowymi.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            <CreditCardIcon className="w-5 h-5 mr-2" />
            Zarządzaj płatnościami
          </button>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gray-50 rounded-xl p-6 mt-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Potrzebujesz pomocy z fakturowaniem?</h3>
          <p className="text-gray-600 mb-4">
            Nasz zespół wsparcia pomoże Ci z wszelkimi pytaniami dotyczącymi płatności i faktur.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a 
              href="/contact"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
            >
              Skontaktuj się z nami
            </a>
            <button className="inline-flex items-center px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              FAQ - Płatności
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}