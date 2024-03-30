import React from 'react';
import TaskCard from '../components/TaskCard';
import { Task } from '../interfaces/task';

interface TasksPageProps {
    tasks: Task[];
    section: string;
    className?: string;
    setSelectedTask: (task: Task) => void;
    setShowForm: (value: boolean) => void;
    onDelete?: (task: Task) => void;
}

const TasksPage: React.FC<TasksPageProps> = ({ section, tasks, className = '', setSelectedTask, setShowForm, onDelete }) => {
    return (
        <div className={`flex flex-col ${className}`}>
            <div className="flex mx-auto w-80 overflow-hidden rounded-md font-bold text-gray-600 text-lg m-4 sticky top-0 bg-stone-300 z-10 p-2">
                <h1>{section}</h1>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-wrap">{task.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button onClick={() => setSelectedTask(task)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                <button onClick={() => onDelete && onDelete(task)} className="ml-4 text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TasksPage;
