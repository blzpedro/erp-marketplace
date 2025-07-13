import { MarketplaceType } from '../types/integration'

export const getMarketplaceName = (type: MarketplaceType): string => {
  const marketplaceNames: Record<MarketplaceType, string> = {
    [MarketplaceType.MERCADO_LIVRE]: 'Mercado Livre',
    [MarketplaceType.SHOPEE]: 'Shopee',
    [MarketplaceType.AMAZON]: 'Amazon',
    [MarketplaceType.MAGAZINE_LUIZA]: 'Magazine Luiza',
    [MarketplaceType.B2W]: 'B2W'
  }
  return marketplaceNames[type] || type
}

export const getMarketplaceLogo = (type: MarketplaceType): string => {
  const marketplaceLogos: Record<MarketplaceType, string> = {
    [MarketplaceType.MERCADO_LIVRE]: '/src/assets/marketplaces/mercado-livre.png',
    [MarketplaceType.SHOPEE]: '/src/assets/marketplaces/shopee.png',
    [MarketplaceType.AMAZON]: '/src/assets/marketplaces/amazon.png',
    [MarketplaceType.MAGAZINE_LUIZA]: '/src/assets/marketplaces/magalu.png',
    [MarketplaceType.B2W]: '/src/assets/marketplaces/b2w.png'
  }
  return marketplaceLogos[type] || ''
}

export const getMarketplaceOptions = () => [
  { value: MarketplaceType.MERCADO_LIVRE, label: 'Mercado Livre' },
  { value: MarketplaceType.SHOPEE, label: 'Shopee' },
  { value: MarketplaceType.AMAZON, label: 'Amazon' },
  { value: MarketplaceType.MAGAZINE_LUIZA, label: 'Magazine Luiza' },
  { value: MarketplaceType.B2W, label: 'B2W' }
]

export const getMarketplaceIcon = (type: MarketplaceType): string => {
  const marketplaceIcons: Record<MarketplaceType, string> = {
    [MarketplaceType.MERCADO_LIVRE]: '🛒',
    [MarketplaceType.SHOPEE]: '🛍️',
    [MarketplaceType.AMAZON]: '📦',
    [MarketplaceType.MAGAZINE_LUIZA]: '🏪',
    [MarketplaceType.B2W]: '🏬'
  }
  return marketplaceIcons[type] || '🛒'
} 