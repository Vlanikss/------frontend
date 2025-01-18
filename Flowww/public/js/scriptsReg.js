const apiUrl = 'http://localhost:3000/api/register';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    const username = document.getElementById('username');  // id='username'
    const email = document.getElementById('email');
    const password = document.getElementById('password');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const userData = {
        username: username,  // Используем username
        email: email,
        password: password
      };
  
      fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        window.location.href = "main.html"; // Переход на главную страницу
      })
      .catch((error) => {
        console.error('Ошибка регистрации:', error);
      });
    });
  });
  