import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditTask from './EditTask';

export default function ListTask() {
    const [tasks, setTasks] = useState([]);
    const [showCompleted, setShowCompleted] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost/todolist/');
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCheckboxChange = async (taskId, isChecked) => {
        try {
            await axios.post('http://localhost/todolist/update-task', {
                id: taskId,
                is_done: isChecked
            });
            fetchTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const toggleCompletedTasks = () => {
        setShowCompleted(!showCompleted);
    };

    const filteredTasks = showCompleted ? tasks : tasks.filter(task => task.is_done == 0);

    return (
        <div>
            <EditTask toggleCompletedTasks={toggleCompletedTasks} />
            <hr></hr>
            {filteredTasks.length > 0 ? (
            <table className="center">
                <tbody>
                    {filteredTasks.map(task => (
                        <tr key={task.id}
                            style={{ textDecoration: task.is_done == 1 ? 'line-through' : 'none' }}>
                            <td>
                                <input
                                    name="is_done"
                                    type="checkbox"
                                    defaultChecked={task.is_done == 1}
                                    onChange={e =>
                                        handleCheckboxChange(task.id, e.target.checked)
                                    }
                                />
                            </td>
                            <td>{task.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
                <p>Nothing to do...</p>
            )}
        </div>
    );
}