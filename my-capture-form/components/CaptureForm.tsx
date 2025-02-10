'use client';

import { useState, useEffect } from 'react';

const CaptureForm = () => {
  const [token, setToken] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [budgetFrom, setBudgetFrom] = useState('');
  const [budgetTo, setBudgetTo] = useState('');
  const [deadline, setDeadline] = useState('');
  const [reminds, setReminds] = useState('');
  const [privateContent, setPrivateContent] = useState('');
  const [isHard, setIsHard] = useState(true);
  const [autoResponses, setAutoResponses] = useState(false);
  const [rules, setRules] = useState({
    budget_from: 5000,
    budget_to: 8000,
    deadline_days: 5,
    qty_freelancers: 1,
    task_id: '',
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('task_token');
    if (savedToken) setToken(savedToken);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      alert('Токен обязателен!');
      return;
    }

    localStorage.setItem('task_token', token);

    const apiUrl = `https://deadlinetaskbot.productlove.ru/api/v1/tasks/client/newhardtask`;

    const params = {
      token: token,
      title: title,
      description: description,
      tags: tags.split(','),
      budget_from: Number(budgetFrom),
      budget_to: Number(budgetTo),
      deadline_days: Number(deadline),
      number_of_reminders: Number(reminds),
      private_content: privateContent || null,
      is_hard: isHard,
      all_auto_responses: autoResponses,
      rules: rules,
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (response.ok) {
        alert('Задача успешно опубликована!');
        setTitle('');
        setDescription('');
        setTags('');
        setBudgetFrom('');
        setBudgetTo('');
        setDeadline('');
        setReminds('');
        setPrivateContent('');
        setIsHard(true);
        setAutoResponses(false);
        setRules({ budget_from: 5000, budget_to: 8000, deadline_days: 5, qty_freelancers: 1, task_id: '' });
      } else {
        alert(`Ошибка: ${response.status}`);
      }
    } catch (error) {
      alert('Ошибка сети!');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Создать задачу</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Токен" className="w-full p-2 border rounded" />
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название задачи" className="w-full p-2 border rounded" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Описание" className="w-full p-2 border rounded" required />
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Теги (через запятую)" className="w-full p-2 border rounded" />
        <div className="flex space-x-2">
          <input type="number" value={budgetFrom} onChange={(e) => setBudgetFrom(e.target.value)} placeholder="Бюджет от" className="w-1/2 p-2 border rounded" />
          <input type="number" value={budgetTo} onChange={(e) => setBudgetTo(e.target.value)} placeholder="Бюджет до" className="w-1/2 p-2 border rounded" />
        </div>
        <input type="number" value={deadline} onChange={(e) => setDeadline(e.target.value)} placeholder="Дедлайн (дни)" className="w-full p-2 border rounded" />
        <input type="number" value={reminds} onChange={(e) => setReminds(e.target.value)} placeholder="Напоминания" className="w-full p-2 border rounded" />
        <input type="text" value={privateContent} onChange={(e) => setPrivateContent(e.target.value)} placeholder="Приватное содержимое" className="w-full p-2 border rounded" />
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={isHard} onChange={(e) => setIsHard(e.target.checked)} />
          <span>Сложная задача</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="checkbox" checked={autoResponses} onChange={(e) => setAutoResponses(e.target.checked)} />
          <span>Разрешить авто-ответы</span>
        </label>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Отправить</button>
      </form>
    </div>
  );
};

export default CaptureForm;