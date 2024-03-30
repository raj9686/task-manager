'use client';
import { Button, Empty, Popconfirm, Select, Skeleton, Space, Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";
import { FaTape } from 'react-icons/fa';
import { deleteTask, fetchTasks } from "./api/tasks";
import TaskForm from "./components/TaskForm";
import { Task } from "./interfaces/task";

const { Option } = Select;

export default function Home() {
  const [task, setSelectedTask] = useState<Task>({} as Task);
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const fetchAndGroupTasks = async () => {
    const filteredTasks = await fetchTasks(statusFilter);
    setTasks(filteredTasks);
    setLoading(false);
  };

  useEffect(() => {
    fetchAndGroupTasks();
  }, [statusFilter]); // Fetch tasks whenever statusFilter changes

  const onCancel = async () => {
    setShowForm(false);
    setSelectedTask({} as Task);
    await fetchAndGroupTasks();
  };

  const onDelete = async (task: Task) => {
    await deleteTask(task);
    await fetchAndGroupTasks();
  };

  const onChange: TableProps<Task>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (_, { description }: Task) => description,
      ellipsis: true,
      width: '50%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, { status }: Task) => (
        <Tag color={status === 'Done' ? 'green' : status === 'In Progress' ? 'blue' : 'gray'} key={status}>
          {status.toUpperCase()}
        </Tag>
      ),
      width: '10%',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (record: Task) => (
        <Space size="middle">
          <Button onClick={() => {
            const t = record._id;
            const mtask = tasks.find((task) => task._id === t) as Task;
            setSelectedTask(mtask); setShowForm(true);
          }}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this task?"
            onConfirm={() => onDelete(record)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <main className="p-6 min-h-screen bg-slate-100">
      {showForm && <TaskForm task={task} onCancel={onCancel} />}
      <div className="flex items-center justify-between ml-10 mr-4">
        <div className="flex items-center">
          <FaTape size={40} color="#404040" />
          <h1 className="text-3xl font-bold p-2 text-gray-700">Task Board</h1>
        </div>
        <Space>
          <Select defaultValue="All" style={{ width: 120 }} onChange={(value) => setStatusFilter(value)}>
            <Option value="All">All</Option>
            <Option value="In Progress">In Progress</Option>
            <Option value="Done">Done</Option>
            <Option value="To Do">To Do</Option>
          </Select>
          <Button type="primary" onClick={() => setShowForm(true)}>Add Task</Button>
        </Space>
      </div>
      {loading ? (
        <div className="flex justify-center min-h-screen p-4 text-lg">Loading...</div>
      ) : (
        <div className="justify-center p-4">
          <Table
            dataSource={tasks}
            columns={columns}
            onChange={onChange}
            locale={{
              emptyText: loading ? <Skeleton active={true} /> : <Empty />
            }}
          />
        </div>
      )}
    </main>
  );
}
