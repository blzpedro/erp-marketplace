import { useState, useEffect } from 'react'
import type { Integration, CreateIntegrationRequest } from '../../types/integration'
import IntegrationForm from './IntegrationForm'
import IntegrationList from './IntegrationList'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible'
import { Button } from '../../components/ui/button'
import { RefreshCw } from 'lucide-react'
import { marketplaceIntegrationsService } from '../../services/marketplace-integrations.service'

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [loading, setLoading] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(true)
  const [isListOpen, setIsListOpen] = useState(true)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  })


  // Fetch integrations on component mount
  useEffect(() => {
    fetchIntegrations()
  }, [])

  const fetchIntegrations = async () => {
    setLoading(true)
    
    try {
      const response = await marketplaceIntegrationsService.getIntegrations(pagination.page, pagination.limit)
      
      if (response.success && response.data) {
        setIntegrations(response.data.items)
        setPagination({
          page: response.data.page,
          limit: response.data.limit,
          total: response.data.total,
          totalPages: response.data.totalPages
        })
      }
    } catch (err) {
      console.error('Error fetching integrations:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateIntegration = async (integrationData: CreateIntegrationRequest) => {
    setCreateLoading(true)

         try {
       const response = await marketplaceIntegrationsService.createIntegration(integrationData)
      
      if (response.success && response.data) {
        setIntegrations(prev => [response.data!, ...prev])
        
        // Update pagination total
        setPagination(prev => ({
          ...prev,
          total: prev.total + 1
        }))
        
        // Close form after successful creation
        setIsFormOpen(false)
      }
    } catch (err) {
      console.error('Error creating integration:', err)
    } finally {
      setCreateLoading(false)
    }
  }

  const handleDeleteIntegration = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta integração?')) {
      return
    }

    setLoading(true)

         try {
       const response = await marketplaceIntegrationsService.deleteIntegration(id)
      
      if (response.success) {
        setIntegrations(prev => prev.filter(integration => integration.id !== id))
        
        // Update pagination total
        setPagination(prev => ({
          ...prev,
          total: prev.total - 1
        }))
      }
    } catch (err) {
      console.error('Error deleting integration:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleRefreshIntegration = async (id: string) => {
    setLoading(true)
    
         try {
       const response = await marketplaceIntegrationsService.getIntegration(id)
      
      if (response.success && response.data) {
        setIntegrations(prev => 
          prev.map(integration => 
            integration.id === id ? response.data! : integration
          )
        )
      }
    } catch (err) {
      console.error('Error refreshing integration:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Integrações de Marketplace
          </h1>
          <Button
            variant="outline"
            onClick={fetchIntegrations}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Total</h3>
            <p className="text-3xl font-bold text-blue-600">{pagination.total}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Ativas</h3>
            <p className="text-3xl font-bold text-green-600">
              {integrations.filter(i => i.status === 'active').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Com Erro</h3>
            <p className="text-3xl font-bold text-red-600">
              {integrations.filter(i => i.status === 'error').length}
            </p>
          </div>
        </div>

        {/* Create Integration Form */}
        <Collapsible open={isFormOpen} onOpenChange={setIsFormOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <h2 className="text-xl font-bold text-gray-800">Nova Integração</h2>
            <span className="text-gray-500 text-sm">
              {isFormOpen ? 'Ocultar' : 'Mostrar'}
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <IntegrationForm 
              onSubmit={handleCreateIntegration}
              loading={createLoading}
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Integration List */}
        <Collapsible open={isListOpen} onOpenChange={setIsListOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <h2 className="text-xl font-bold text-gray-800">
              Integrações Ativas ({pagination.total})
            </h2>
            <span className="text-gray-500 text-sm">
              {isListOpen ? 'Ocultar' : 'Mostrar'}
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <IntegrationList
              integrations={integrations}
              onDelete={handleDeleteIntegration}
              onRefresh={handleRefreshIntegration}
              loading={loading}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
} 