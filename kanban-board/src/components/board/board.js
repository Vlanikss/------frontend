import React, { useState } from 'react';
import Column from '../column/column';
import styles from './Board.module.css';

const Board = () => {
    const initialData = [
        { title: 'Backlog', tasks: [{ id: '1', name: 'Task 1', description: 'Description 1' }, { id: '2', name: 'Task 2', description: 'Description 2' }] },
        { title: 'Ready', tasks: [] },
        { title: 'In Progress', tasks: [] },
        { title: 'Finished', tasks: [] },
    ];

    const [data, setData] = useState(initialData);

    const addTask = (newTaskName) => {
        setData(prevData => {
            const updatedData = [...prevData];
            updatedData[0].tasks.push({ id: Date.now().toString(), name: newTaskName, description: '' });
            return updatedData;
        });
    };

    const moveTask = (taskId, fromIndex, toIndex) => {
        setData(prevData => {
            const updatedData = [...prevData];
            const taskToMove = updatedData[fromIndex].tasks.find(task => task.id === taskId);
            if (!taskToMove) return updatedData;

            updatedData[fromIndex].tasks = updatedData[fromIndex].tasks.filter(task => task.id !== taskId);
            updatedData[toIndex].tasks.push(taskToMove);

            return updatedData;
        });
    };

    return (
        <div className={styles.board}>
            {data.map((column, index) => (
                <Column
                    key={column.title}
                    title={column.title}
                    tasks={column.tasks}
                    previousTasks={index > 0 ? data[index - 1].tasks : []} 
                    onAddTask={index === 0 ? addTask : null} 
                    onMoveTask={(taskId) => moveTask(taskId, index - 1, index)} 
                />
            ))}
        </div>
    );
};

export default Board;
