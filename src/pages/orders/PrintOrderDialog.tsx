import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { PrinterIcon, CalendarIcon, PackageIcon, UserIcon } from 'lucide-react'
import { MarketplaceType } from '../../types/integration'
import { getMarketplaceName, getMarketplaceLogo } from '../../utils/marketplace'

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
  integrationSource: MarketplaceType
}

interface PrintOrderDialogProps {
  order: Order
  formatCurrency: (value: number) => string
  getStatusText: (status: Order['status']) => string
}

export default function PrintOrderDialog({ order, formatCurrency, getStatusText }: PrintOrderDialogProps) {
  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Pedido ${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .order-info { margin-bottom: 20px; }
            .customer-info { margin-bottom: 20px; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th, .items-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .items-table th { background-color: #f2f2f2; }
            .total { text-align: right; font-weight: bold; font-size: 18px; margin-top: 20px; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Pedido ${order.id}</h1>
            <p>Data: ${new Date(order.createdAt).toLocaleDateString('pt-BR')}</p>
            <p>Status: ${getStatusText(order.status)}</p>
          </div>
          
          <div class="customer-info">
            <h3>Dados do Cliente</h3>
            <p><strong>Nome:</strong> ${order.customerName}</p>
            <p><strong>Email:</strong> ${order.customerEmail}</p>
          </div>
          
          <div class="order-info">
            <h3>Itens do Pedido</h3>
            <table class="items-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Preço Unitário</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${order.items.map(item => `
                  <tr>
                    <td>${item.name}</td>
                    <td>${item.quantity}</td>
                    <td>${formatCurrency(item.price)}</td>
                    <td>${formatCurrency(item.quantity * item.price)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          
          <div class="total">
            <p>Total: ${formatCurrency(order.total)}</p>
          </div>
          
          <div class="footer">
            <p>Fonte: ${getMarketplaceName(order.integrationSource)}</p>
            <p>Impresso em: ${new Date().toLocaleString('pt-BR')}</p>
          </div>
        </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <PrinterIcon className="h-4 w-4" />
          Imprimir
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PrinterIcon className="h-5 w-5" />
            Imprimir Pedido
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Order Header */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PackageIcon className="h-5 w-5 text-blue-600" />
                <span className="font-bold text-lg">{order.id}</span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <CalendarIcon className="h-4 w-4" />
                  {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                </div>
                <div className="text-sm font-medium">{getStatusText(order.status)}</div>
              </div>
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <UserIcon className="h-4 w-4" />
              Dados do Cliente
            </h3>
            <div className="bg-gray-50 p-3 rounded">
              <p><strong>Nome:</strong> {order.customerName}</p>
              <p><strong>Email:</strong> {order.customerEmail}</p>
            </div>
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-2">Itens do Pedido</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium">Produto</th>
                    <th className="px-4 py-2 text-center text-sm font-medium">Qtd</th>
                    <th className="px-4 py-2 text-right text-sm font-medium">Preço Unit.</th>
                    <th className="px-4 py-2 text-right text-sm font-medium">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2 text-sm">{item.name}</td>
                      <td className="px-4 py-2 text-center text-sm">{item.quantity}</td>
                      <td className="px-4 py-2 text-right text-sm">{formatCurrency(item.price)}</td>
                      <td className="px-4 py-2 text-right text-sm font-medium">
                        {formatCurrency(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total */}
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">
              Total: {formatCurrency(order.total)}
            </div>
          </div>

          <Separator />

          {/* Footer */}
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <strong>Fonte:</strong> 
            <img 
              src={getMarketplaceLogo(order.integrationSource)} 
              alt={getMarketplaceName(order.integrationSource)}
              className="w-4 h-4 object-contain"
            />
            {getMarketplaceName(order.integrationSource)}
          </div>

          {/* Print Button */}
          <div className="flex justify-end gap-2">
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <PrinterIcon className="h-4 w-4" />
              Imprimir Pedido
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 