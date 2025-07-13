// Base API service
export { BaseApiService } from './base-api'

// Marketplace integrations service
export { 
  MarketplaceIntegrationsService, 
  marketplaceIntegrationsService 
} from './marketplace-integrations.service'

// Users service
export { 
  UsersService, 
  usersService,
  type User,
  type CreateUserRequest,
  type UpdateUserRequest,
  type AuthResponse
} from './users.service'

// Import services for the aggregated export
import { marketplaceIntegrationsService } from './marketplace-integrations.service'
import { usersService } from './users.service'

// Export all services as a single object for easy access
export const apiServices = {
  marketplaceIntegrations: marketplaceIntegrationsService,
  users: usersService,
}