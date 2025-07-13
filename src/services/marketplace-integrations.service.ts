import { BaseApiService } from './base-api'
import type { 
  Integration, 
  CreateIntegrationRequest, 
  ApiResponse, 
  PaginatedResponse 
} from '../types/integration'

export class MarketplaceIntegrationsService extends BaseApiService {
  private readonly endpoint = '/marketplace-integrations'

  /**
   * Get all marketplace integrations with pagination
   */
  async getIntegrations(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Integration>>> {
    return this.get<PaginatedResponse<Integration>>(
      `${this.endpoint}?page=${page}&limit=${limit}`
    )
  }

  /**
   * Get a specific marketplace integration by ID
   */
  async getIntegration(id: string): Promise<ApiResponse<Integration>> {
    return this.get<Integration>(`${this.endpoint}/${id}`)
  }

  /**
   * Create a new marketplace integration
   */
  async createIntegration(
    integration: CreateIntegrationRequest
  ): Promise<ApiResponse<Integration>> {
    return this.post<Integration>(this.endpoint, integration)
  }

  /**
   * Update an existing marketplace integration
   */
  async updateIntegration(
    id: string,
    integration: Partial<CreateIntegrationRequest>
  ): Promise<ApiResponse<Integration>> {
    return this.put<Integration>(`${this.endpoint}/${id}`, integration)
  }

  /**
   * Delete a marketplace integration
   */
  async deleteIntegration(id: string): Promise<ApiResponse<null>> {
    return this.delete<null>(`${this.endpoint}/${id}`)
  }

  /**
   * Sync a marketplace integration
   */
  async syncIntegration(id: string): Promise<ApiResponse<Integration>> {
    return this.post<Integration>(`${this.endpoint}/${id}/sync`)
  }

  /**
   * Test marketplace integration connection
   */
  async testConnection(id: string): Promise<ApiResponse<{ success: boolean; message: string }>> {
    return this.post<{ success: boolean; message: string }>(`${this.endpoint}/${id}/test`)
  }

  /**
   * Get integration statistics
   */
  async getIntegrationStats(): Promise<ApiResponse<{
    total: number
    active: number
    inactive: number
    error: number
    pending: number
  }>> {
    return this.get<{
      total: number
      active: number
      inactive: number
      error: number
      pending: number
    }>(`${this.endpoint}/stats`)
  }
}

// Export singleton instance
export const marketplaceIntegrationsService = new MarketplaceIntegrationsService() 