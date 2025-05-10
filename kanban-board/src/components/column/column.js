import React, { useState } from 'react';
import Task from '../task/task';
import styles from './Column.module.css';

const Column = ({ title, tasks, previousTasks, onAddTask, onMoveTask }) => {
    const [newTaskName, setNewTaskName] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [selectedTask, setSelectedTask] = useState('');

    const handleAddTask = () => {
        if (newTaskName.trim() !== '' && onAddTask) {
            onAddTask(newTaskName);
            setNewTaskName('');
        }
        setIsAdding(false);
    };

    const handleMoveTask = () => {
        if (selectedTask && selectedTask !== 'default') {
            onMoveTask(selectedTask);
            setSelectedTask('');
        }
    };

    return (
        <div className={styles.column}>
            <h2 className={styles.columnTitle}>{title}</h2>
            <ul className={styles.taskList}>
                {tasks.map(task => (
                    <Task key={task.id} {...task} />
                ))}
            </ul>

            {/* Добавление задачи (только для Backlog) */}
            {title === 'Backlog' && (
                isAdding ? (
                    <div>
                        <input
                            type="text"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                        />
                        <button className={styles.submitButton} onClick={handleAddTask}>
                            Submit
                        </button>
                    </div>
                ) : (
                    <button
                        className={styles.addCardButton}
                        onClick={() => setIsAdding(true)}
                    >
                        + Add card
                    </button>
                )
            )}

            {}
            {previousTasks?.length > 0 && (
                <div>
                    <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)}>
                        <option value="default">Choose a task</option>
                        {previousTasks.map(task => (
                            <option key={task.id} value={task.id}>
                                {task.name}
                            </option>
                        ))}
                    </select>
                    <button className={styles.submitButton} onClick={handleMoveTask} disabled={!selectedTask}>
                        Move
                    </button>
                </div>
            )}
        </div>
    );
};

export default Column;
