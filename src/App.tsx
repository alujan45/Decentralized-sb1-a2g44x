import React from 'react'
import { Settings } from 'lucide-react'
import DeviceManager from './components/DeviceManager'
import TaskDistributor from './components/TaskDistributor'
import Header from './components/Header'
import { AppProvider } from './context/AppContext'
import SystemSettings from './components/SystemSettings'

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DeviceManager />
            <TaskDistributor />
            <SystemSettings />
          </div>
        </main>
      </div>
    </AppProvider>
  )
}

export default App