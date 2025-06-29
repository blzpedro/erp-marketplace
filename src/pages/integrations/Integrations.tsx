import { useState } from 'react'
import type { Integration } from '../../types/integration'
import IntegrationForm from './IntegrationForm'
import IntegrationList from './IntegrationList'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible'

export default function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: '1',
      title: 'Exemplo de Integração',
      body: { apiKey: 'abc123', endpoint: 'https://api.example.com' },
      createdAt: '2024-01-15T10:30:00.000Z'
    },
    {
      id: '2', 
      title: 'Integração de Pagamento',
      body: { provider: 'stripe', webhookUrl: 'https://webhook.example.com' },
      createdAt: '2024-01-14T15:45:00.000Z'
    }
  ])
  const [isFormOpen, setIsFormOpen] = useState(true)
  const [isListOpen, setIsListOpen] = useState(true)

  const handleCreateIntegration = (integrationData: { title: string; body: Record<string, unknown> }) => {
    const newIntegration: Integration = {
      id: Date.now().toString(),
      title: integrationData.title,
      body: integrationData.body,
      createdAt: new Date().toISOString()
    }

    setIntegrations(prev => [newIntegration, ...prev])
    console.log('New integration:', newIntegration)
    alert('Integration created successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <Collapsible open={isFormOpen} onOpenChange={setIsFormOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <h1 className="text-2xl font-bold text-gray-800">Criar nova integração</h1>
            <span className="text-gray-500 text-sm">
              {isFormOpen ? 'Ocultar' : 'Mostrar'}
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <IntegrationForm onSubmit={handleCreateIntegration} />
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={isListOpen} onOpenChange={setIsListOpen}>
          <CollapsibleTrigger className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
            <h1 className="text-2xl font-bold text-gray-800">Integrações Ativas</h1>
            <span className="text-gray-500 text-sm">
              {isListOpen ? 'Ocultar' : 'Mostrar'}
            </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <IntegrationList integrations={integrations} />
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
} 