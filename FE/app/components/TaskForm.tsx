import { Button, Form, FormProps, Input, Radio } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useState } from 'react';
import { addTask, updateTask } from '../api/tasks';
import { Task } from '../interfaces/task';

interface Props {
    task: Task;
    onCancel: () => void;
}

const TaskForm: React.FC<Props> = ({ task, onCancel }) => {
    const [editedTask, setEditedTask] = useState({ ...task });
    const [form] = Form.useForm();

    const handleChange = (changedFields: any) => {
        setEditedTask((prevTask) => ({ ...prevTask, ...changedFields }));
    };

    const onFinish: FormProps<Task>["onFinish"] = async (values) => {
        try {
            await form.validateFields();
            let response = null;
            if (editedTask._id) {
                response = await updateTask(editedTask);
            } else {
                response = await addTask({ ...editedTask, status: 'To Do' });
            }
            onCancel();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return (
        <Form form={form} initialValues={editedTask} layout='vertical' onFinish={onFinish} onValuesChange={(_, allValues) => handleChange(allValues)}>
            <div className="fixed inset-0 flex items-center justify-center bg-slate-800 bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-md w-1/3 relative">
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Title is required' }]}
                    >
                        <Input
                            type="text"
                        />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <TextArea />
                    </Form.Item>
                    {editedTask._id && (
                        <Form.Item label="Status" name="status">
                            <Radio.Group>
                                <Radio.Button value="To Do">To Do</Radio.Button>
                                <Radio.Button value="In Progress">In Progress</Radio.Button>
                                <Radio.Button value="Done">Done</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    )}
                    <div className="flex justify-end">
                        <Form.Item >
                            <Button type="default" onClick={onCancel} className="mr-2">Cancel</Button>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </div>

                </div>
            </div>
        </Form>
    );
};

export default TaskForm;
