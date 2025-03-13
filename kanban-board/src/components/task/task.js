import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Task.module.css';

const Task = ({ id, name, description }) => {
    return (
        <div className={styles.task}>
            {}
            <Link to={`/tasks/${id}`} className={styles.taskTitle}>
    {name}
</Link>

            <p>{description || "This task has no description"}</p>
        </div>
    );
};

export default Task;
