import type { Integration } from '../../types/integration'
import IntegrationCard from './IntegrationCard'

interface IntegrationListProps {
  integrations: Integration[]
}

export default function IntegrationList({ integrations }: IntegrationListProps) {
  if (integrations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 text-center text-gray-500">
        Nenhuma integração encontrada
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {integrations.map((integration) => (
        <IntegrationCard key={integration.id} integration={integration} />
      ))}
    </div>
  )
} 