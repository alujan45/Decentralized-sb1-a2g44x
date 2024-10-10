import React, { useState } from 'react'
import { Network, Plus, X, RefreshCw } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const DeviceManager: React.FC = () => {
  const { devices, addDevice, removeDevice, updateDeviceStatus } = useAppContext();
  const [selectedDevice, setSelectedDevice] = useState<number | null>(null);

  const handleAddDevice = () => {
    const newDevice = {
      id: devices.length + 1,
      name: `Device ${devices.length + 1}`,
      status: 'Online' as const,
    };
    addDevice(newDevice);
  };

  const handleRemoveDevice = (id: number) => {
    removeDevice(id);
    setSelectedDevice(null);
  };

  const handleToggleStatus = (id: number) => {
    const device = devices.find(d => d.id === id);
    if (device) {
      updateDeviceStatus(id, device.status === 'Online' ? 'Offline' : 'Online');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Network className="mr-2" />
          Device Manager
        </h2>
        <button
          onClick={handleAddDevice}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center"
        >
          <Plus size={16} className="mr-1" /> Add Device
        </button>
      </div>
      <ul className="space-y-2">
        {devices.map(device => (
          <li key={device.id} className="flex justify-between items-center">
            <span 
              className="cursor-pointer hover:text-blue-600"
              onClick={() => setSelectedDevice(device.id)}
            >
              {device.name}
            </span>
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-full text-xs mr-2 ${
                device.status === 'Online' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
              }`}>
                {device.status}
              </span>
              <button
                onClick={() => handleToggleStatus(device.id)}
                className="text-blue-500 hover:text-blue-600 mr-2"
              >
                <RefreshCw size={16} />
              </button>
              <button
                onClick={() => handleRemoveDevice(device.id)}
                className="text-red-500 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedDevice && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-semibold mb-2">Device Details</h3>
          <p>ID: {selectedDevice}</p>
          <p>Name: {devices.find(d => d.id === selectedDevice)?.name}</p>
          <p>Status: {devices.find(d => d.id === selectedDevice)?.status}</p>
        </div>
      )}
    </div>
  )
}

export default DeviceManager