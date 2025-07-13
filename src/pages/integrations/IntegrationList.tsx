import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Trash2, RefreshCw } from 'lucide-react'
import type { Integration } from '../../types/integration'
import { getMarketplaceName, getMarketplaceLogo } from '../../utils/marketplace'

interface IntegrationListProps {
  integrations: Integration[]
  onDelete?: (id: string) => void
  onRefresh?: (id: string) => void
  loading?: boolean
}

export default function IntegrationList({ 
  integrations, 
  onDelete, 
  onRefresh, 
  loading = false 
}: IntegrationListProps) {
  


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo'
      case 'inactive': return 'Inativo'
      case 'pending': return 'Pendente'
      case 'error': return 'Erro'
      default: return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (integrations.length === 0) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma integração encontrada
            </h3>
            <p className="text-gray-500">
              Crie sua primeira integração de marketplace para começar.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {integrations.map((integration) => (
        <Card key={integration.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <CardTitle className="text-lg">
                    {integration.storeName}
                  </CardTitle>
                  <Badge className={getStatusColor(integration.status)}>
                    {getStatusText(integration.status)}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                  <span className="flex items-center gap-2">
                    <strong>Marketplace:</strong> 
                    <img 
                      src={getMarketplaceLogo(integration.marketplaceType)} 
                      alt={getMarketplaceName(integration.marketplaceType)}
                      className="w-5 h-5 object-contain"
                    />
                    {getMarketplaceName(integration.marketplaceType)}
                  </span>
                  <span>•</span>
                  <span>
                    <strong>Seller ID:</strong> {integration.sellerId}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {onRefresh && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRefresh(integration.id)}
                    disabled={loading}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(integration.id)}
                    disabled={loading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Criado em:</span>
                  <p className="text-gray-600">{formatDate(integration.createdAt)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Atualizado em:</span>
                  <p className="text-gray-600">{formatDate(integration.updatedAt)}</p>
                </div>
              </div>
              
              {integration.lastSyncAt && (
                <div className="text-sm">
                  <span className="font-medium text-gray-700">Última sincronização:</span>
                  <p className="text-gray-600">{formatDate(integration.lastSyncAt)}</p>
                </div>
              )}
              
              {integration.errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <span className="font-medium text-red-800">Erro:</span>
                  <p className="text-red-700 text-sm mt-1">{integration.errorMessage}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 