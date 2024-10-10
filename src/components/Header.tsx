import React from 'react'
import { Cpu } from 'lucide-react'

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Cpu className="mr-2" size={24} />
          <h1 className="text-2xl font-bold">Distributed Computing System</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#" className="hover:text-blue-200">Dashboard</a></li>
            <li><a href="#" className="hover:text-blue-200">Devices</a></li>
            <li><a href="#" className="hover:text-blue-200">Tasks</a></li>
            <li><a href="#" className="hover:text-blue-200">Settings</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header