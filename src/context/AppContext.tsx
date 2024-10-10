import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Device {
  id: number;
  name: string;
  status: 'Online' | 'Offline';
}

interface Task {
  id: number;
  name: string;
  status: 'In Progress' | 'Pending' | 'Completed';
}

interface AppContextType {
  devices: Device[];
  tasks: Task[];
  addDevice: (device: Device) => void;
  removeDevice: (id: number) => void;
  updateDeviceStatus: (id: number, status: 'Online' | 'Offline') => void;
  addTask: (task: Task) => void;
  updateTaskStatus: (id: number, status: 'In Progress' | 'Pending' | 'Completed') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: 'Device 1', status: 'Online' },
    { id: 2, name: 'Device 2', status: 'Offline' },
    { id: 3, name: 'Device 3', status: 'Online' },
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: 'Task 1', status: 'In Progress' },
    { id: 2, name: 'Task 2', status: 'Pending' },
    { id: 3, name: 'Task 3', status: 'Completed' },
  ]);

  const addDevice = (device: Device) => {
    setDevices([...devices, device]);
  };

  const removeDevice = (id: number) => {
    setDevices(devices.filter(device => device.id !== id));
  };

  const updateDeviceStatus = (id: number, status: 'Online' | 'Offline') => {
    setDevices(devices.map(device => 
      device.id === id ? { ...device, status } : device
    ));
  };

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTaskStatus = (id: number, status: 'In Progress' | 'Pending' | 'Completed') => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  return (
    <AppContext.Provider value={{ 
      devices, 
      tasks, 
      addDevice, 
      removeDevice, 
      updateDeviceStatus, 
      addTask, 
      updateTaskStatus 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};