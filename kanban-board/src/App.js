import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Board from './components/board/board';
import TaskPage from './pages/taskPage';
import './App.css';

const App = () => {
    const [data, setData] = useState([
        { title: 'Backlog', tasks: [{ id: '1', name: 'Task 1', description: 'Description 1' }] },
        { title: 'Ready', tasks: [] },
        { title: 'In Progress', tasks: [] },
        { title: 'Finished', tasks: [{ id: '2', name: 'Task 2', description: 'Description 2' }] },
    ]);

   
    const updateTask = (taskId, newDescription) => {
        setData(prevData =>
            prevData.map(column => ({
                ...column,
                tasks: column.tasks.map(task =>
                    task.id === taskId ? { ...task, description: newDescription } : task
                ),
            }))
        );
    };

    return (
        <Router>
            <Header />
            <main>
                <Routes>
                    <Route path="/" element={<Board columns={data} onUpdateTask={updateTask} />} />
                    <Route path="/tasks/:taskId" element={<TaskPage tasks={data.flatMap(col => col.tasks)} onUpdateTask={updateTask} />} />
                </Routes>
            </main>
            <Footer
                activeTasksCount={data[0].tasks.length}
                finishedTasksCount={data[3].tasks.length}
            />
        </Router>
    );
};

export default App;
