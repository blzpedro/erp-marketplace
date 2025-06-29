import type { Integration } from '../../types/integration'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Switch } from '../../components/ui/switch'
import { useState } from 'react'
import DeleteDialog from './DeleteDialog'

interface IntegrationCardProps {
  integration: Integration
  onDelete?: (id: string) => void
}

export default function IntegrationCard({ integration, onDelete }: IntegrationCardProps) {
  const [isActive, setIsActive] = useState(true)

  const handleDelete = () => {
    onDelete?.(integration.id)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{integration.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Criado em: {new Date(integration.createdAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
              isActive 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {isActive ? 'Ativo' : 'Inativo'}
            </span>
            <Switch
              checked={isActive}
              onCheckedChange={setIsActive}
            />
            <DeleteDialog
              title={integration.title}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="bg-muted rounded-md p-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Configuração JSON:</h4>
          <pre className="text-sm text-muted-foreground overflow-x-auto">
            {JSON.stringify(integration.body, null, 2)}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
} 