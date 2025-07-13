export enum MarketplaceType {
  MERCADO_LIVRE = 'mercadolivre',
  SHOPEE = 'shopee',
  AMAZON = 'amazon',
  MAGAZINE_LUIZA = 'magazine_luiza',
  B2W = 'b2w'
}

export interface Integration {
  id: string
  userId: string
  marketplaceType: MarketplaceType
  accessToken: string
  refreshToken: string
  sellerId: string
  storeName: string
  status: 'active' | 'inactive' | 'pending' | 'error'
  lastSyncAt?: string
  errorMessage?: string
  createdAt: string
  updatedAt: string
}

export interface CreateIntegrationRequest {
  userId: string
  marketplaceType: MarketplaceType
  accessToken: string
  refreshToken: string
  sellerId: string
  storeName: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
} 