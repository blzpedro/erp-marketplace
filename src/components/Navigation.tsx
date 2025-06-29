import { Link } from 'react-router-dom'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8">
            <Link to="/" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Integrações
            </Link>
            <Link to="/orders" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Pedidos
            </Link>
            <Link to="/products" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Produtos
            </Link>
            <Link to="/ui" className="text-gray-800 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              UI
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 