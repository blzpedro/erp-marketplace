import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import type { CreateIntegrationRequest } from '../../types/integration'
import { MarketplaceType } from '../../types/integration'
import { getMarketplaceOptions } from '../../utils/marketplace'

interface IntegrationFormProps {
  onSubmit: (integration: CreateIntegrationRequest) => void
  loading?: boolean
}

export default function IntegrationForm({ onSubmit, loading = false }: IntegrationFormProps) {
  const [formData, setFormData] = useState<CreateIntegrationRequest>({
    userId: '', // This should be populated with current user ID
    marketplaceType: MarketplaceType.MERCADO_LIVRE,
    accessToken: '',
    refreshToken: '',
    sellerId: '',
    storeName: '',
  })

  const [errors, setErrors] = useState<Partial<CreateIntegrationRequest>>({})

  const marketplaceOptions = getMarketplaceOptions()

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateIntegrationRequest> = {}

    if (!formData.userId.trim()) {
      newErrors.userId = 'User ID is required'
    }
    if (!formData.accessToken.trim()) {
      newErrors.accessToken = 'Access token is required'
    }
    if (!formData.refreshToken.trim()) {
      newErrors.refreshToken = 'Refresh token is required'
    }
    if (!formData.sellerId.trim()) {
      newErrors.sellerId = 'Seller ID is required'
    }
    if (!formData.storeName.trim()) {
      newErrors.storeName = 'Store name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    onSubmit(formData)
  }

  const handleInputChange = (field: keyof CreateIntegrationRequest, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleMarketplaceChange = (value: string) => {
    setFormData(prev => ({ ...prev, marketplaceType: value as MarketplaceType }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nova Integração de Marketplace</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID</Label>
              <Input
                id="userId"
                type="text"
                value={formData.userId}
                onChange={(e) => handleInputChange('userId', e.target.value)}
                placeholder="Digite o ID do usuário"
                className={errors.userId ? 'border-red-500' : ''}
              />
              {errors.userId && (
                <p className="text-red-500 text-sm">{errors.userId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="marketplaceType">Marketplace</Label>
              <Select
                value={formData.marketplaceType}
                onValueChange={handleMarketplaceChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o marketplace" />
                </SelectTrigger>
                <SelectContent>
                  {marketplaceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="accessToken">Token de Acesso</Label>
              <Input
                id="accessToken"
                type="password"
                value={formData.accessToken}
                onChange={(e) => handleInputChange('accessToken', e.target.value)}
                placeholder="Digite o access token"
                className={errors.accessToken ? 'border-red-500' : ''}
              />
              {errors.accessToken && (
                <p className="text-red-500 text-sm">{errors.accessToken}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="refreshToken">Token de Atualização</Label>
              <Input
                id="refreshToken"
                type="password"
                value={formData.refreshToken}
                onChange={(e) => handleInputChange('refreshToken', e.target.value)}
                placeholder="Digite o refresh token"
                className={errors.refreshToken ? 'border-red-500' : ''}
              />
              {errors.refreshToken && (
                <p className="text-red-500 text-sm">{errors.refreshToken}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sellerId">ID do Vendedor</Label>
              <Input
                id="sellerId"
                type="text"
                value={formData.sellerId}
                onChange={(e) => handleInputChange('sellerId', e.target.value)}
                placeholder="Digite o seller ID"
                className={errors.sellerId ? 'border-red-500' : ''}
              />
              {errors.sellerId && (
                <p className="text-red-500 text-sm">{errors.sellerId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="storeName">Nome da Loja</Label>
              <Input
                id="storeName"
                type="text"
                value={formData.storeName}
                onChange={(e) => handleInputChange('storeName', e.target.value)}
                placeholder="Digite o nome da loja"
                className={errors.storeName ? 'border-red-500' : ''}
              />
              {errors.storeName && (
                <p className="text-red-500 text-sm">{errors.storeName}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Criando...' : 'Criar Integração'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 