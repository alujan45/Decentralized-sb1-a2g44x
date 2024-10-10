import React, { useState } from 'react'
import { Cpu, Plus, X, RefreshCw } from 'lucide-react'
import { useAppContext } from '../context/AppContext'

const TaskDistributor: React.FC = () => {
  const { tasks, addTask, updateTaskStatus } = useAppContext();
  const [selectedTask, setSelectedTask] = useState<number | null>(null);

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      name: `Task ${tasks.length + 1}`,
      status: 'Pending' as const,
    };
    addTask(newTask);
  };

  const handleUpdateStatus = (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      const newStatus = task.status === 'Pending' ? 'In Progress' :
                        task.status === 'In Progress' ? 'Completed' : 'Pending';
      updateTaskStatus(id, newStatus);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <Cpu className="mr-2" />
          Task Distributor
        </h2>
        <button
          onClick={handleAddTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center"
        >
          <Plus size={16} className="mr-1" /> Add Task
        </button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex justify-between items-center">
            <span 
              className="cursor-pointer hover:text-blue-600"
              onClick={() => setSelectedTask(task.id)}
            >
              {task.name}
            </span>
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-full text-xs mr-2 ${
                task.status === 'Completed' ? 'bg-green-200 text-green-800' :
                task.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                'bg-gray-200 text-gray-800'
              }`}>
                {task.status}
              </span>
              <button
                onClick={() => handleUpdateStatus(task.id)}
                className="text-blue-500 hover:text-blue-600 mr-2"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedTask && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="font-semibold mb-2">Task Details</h3>
          <p>ID: {selectedTask}</p>
          <p>Name: {tasks.find(t => t.id === selectedTask)?.name}</p>
          <p>Status: {tasks.find(t => t.id === selectedTask)?.status}</p>
        </div>
      )}
    </div>
  )
}

export default TaskDistributor