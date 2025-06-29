import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Integrations from './pages/integrations/Integrations'
import Orders from './pages/orders/Orders'
import Products from './pages/products/Products'
import UI from './pages/ui/Ui'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<Integrations />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ui" element={<UI />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
