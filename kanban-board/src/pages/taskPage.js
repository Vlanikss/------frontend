import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TaskPage = ({ tasks, onUpdateTask }) => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const task = tasks.find(task => task.id === taskId);

    const [description, setDescription] = useState(task?.description || 'This task has no description');

    useEffect(() => {
        if (task) {
            setDescription(task.description || 'This task has no description');
        }
    }, [task]);

    if (!task) {
        return <p>Task not found</p>;
    }

    const handleSave = () => {
        onUpdateTask(taskId, description);
        navigate('/'); 
    };

    return (
        <div>
            <h1>{task.name}</h1>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
            <Link to="/">Back</Link>
        </div>
    );
};

export default TaskPage;
