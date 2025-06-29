import { useState } from 'react'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { CalendarIcon, UserIcon } from 'lucide-react'
import PrintOrderDialog from './PrintOrderDialog'

interface Order {
  id: string
  customerName: string
  customerEmail: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  integrationSource: string
}

export default function Orders() {
  const [orders] = useState<Order[]>([
    {
      id: 'ORD-001',
      customerName: 'João Silva',
      customerEmail: 'joao.silva@email.com',
      items: [
        { name: 'Produto A', quantity: 2, price: 29.99 },
        { name: 'Produto B', quantity: 1, price: 49.99 }
      ],
      total: 109.97,
      status: 'processing',
      createdAt: '2024-01-15T10:30:00.000Z',
      integrationSource: 'Exemplo de Integração'
    },
    {
      id: 'ORD-002',
      customerName: 'Maria Santos',
      customerEmail: 'maria.santos@email.com',
      items: [
        { name: 'Produto C', quantity: 3, price: 19.99 }
      ],
      total: 59.97,
      status: 'shipped',
      createdAt: '2024-01-14T15:45:00.000Z',
      integrationSource: 'Integração de Pagamento'
    },
    {
      id: 'ORD-003',
      customerName: 'Pedro Costa',
      customerEmail: 'pedro.costa@email.com',
      items: [
        { name: 'Produto D', quantity: 1, price: 99.99 },
        { name: 'Produto E', quantity: 2, price: 15.50 }
      ],
      total: 130.99,
      status: 'delivered',
      createdAt: '2024-01-13T09:20:00.000Z',
      integrationSource: 'Exemplo de Integração'
    }
  ])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Pendente'
      case 'processing': return 'Processando'
      case 'shipped': return 'Enviado'
      case 'delivered': return 'Entregue'
      case 'cancelled': return 'Cancelado'
      default: return status
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Pedidos</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => (
            <Card key={order.id} className="flex flex-col justify-between h-full hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                  <div className="text-right">
                    <div className="font-semibold text-lg">{order.id}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-700">
                  <UserIcon className="h-4 w-4" />
                  <span className="truncate">{order.customerName} - {order.customerEmail}</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="bg-gray-100 rounded p-2 mb-2">
                  <h4 className="font-medium text-xs text-gray-500 mb-1">Itens do Pedido:</h4>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{formatCurrency(item.quantity * item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <strong>Fonte:</strong> {order.integrationSource}
                </div>
              </CardContent>
              <div className="flex items-center justify-between px-4 pb-4 pt-2">
                <div className="text-xl font-bold text-green-600">{formatCurrency(order.total)}</div>
                <PrintOrderDialog 
                  order={order} 
                  formatCurrency={formatCurrency} 
                  getStatusText={getStatusText} 
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 