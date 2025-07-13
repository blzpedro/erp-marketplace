import { BaseApiService } from './base-api'
import type { ApiResponse, PaginatedResponse } from '../types/integration'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'user'
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateUserRequest {
  email: string
  name: string
  role: 'admin' | 'manager' | 'user'
  password: string
}

export interface UpdateUserRequest {
  name?: string
  role?: 'admin' | 'manager' | 'user'
  isActive?: boolean
}

export interface AuthResponse {
  user: User
  token: string
}

export class UsersService extends BaseApiService {
  private readonly endpoint = '/users'

  /**
   * Get all users with pagination
   */
  async getUsers(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    return this.get<PaginatedResponse<User>>(
      `${this.endpoint}?page=${page}&limit=${limit}`
    )
  }

  /**
   * Get a specific user by ID
   */
  async getUser(id: string): Promise<ApiResponse<User>> {
    return this.get<User>(`${this.endpoint}/${id}`)
  }

  /**
   * Create a new user
   */
  async createUser(user: CreateUserRequest): Promise<ApiResponse<User>> {
    return this.post<User>(this.endpoint, user)
  }

  /**
   * Update an existing user
   */
  async updateUser(
    id: string,
    user: UpdateUserRequest
  ): Promise<ApiResponse<User>> {
    return this.put<User>(`${this.endpoint}/${id}`, user)
  }

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<ApiResponse<null>> {
    return this.delete<null>(`${this.endpoint}/${id}`)
  }

  /**
   * Authenticate user
   */
  async login(email: string, password: string): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/auth/login', { email, password })
  }

  /**
   * Register new user
   */
  async register(user: CreateUserRequest): Promise<ApiResponse<AuthResponse>> {
    return this.post<AuthResponse>('/auth/register', user)
  }

  /**
   * Get current user profile
   */
  async getProfile(): Promise<ApiResponse<User>> {
    return this.get<User>('/auth/profile')
  }
}

// Export singleton instance
export const usersService = new UsersService() 