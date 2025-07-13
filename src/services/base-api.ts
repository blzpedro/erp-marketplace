import type { ApiResponse } from '../types/integration'
import { toastManager } from './toast-manager'

const API_BASE_URL = 'http://localhost:3000/api/v1'

export class BaseApiService {
  protected baseURL: string

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL
  }

  protected async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      toastManager.error(error instanceof Error ? error.message : 'Erro desconhecido', 'Erro da API')
      throw error
    }
  }

  protected async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' })
  }

  protected async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const response = await this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
    return response
  }

  protected async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    const response = await this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    })
    
    return response
  }

  protected async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await this.request<T>(endpoint, { method: 'DELETE' })
    
    return response
  }
} 