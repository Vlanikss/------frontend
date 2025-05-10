document.addEventListener('DOMContentLoaded', () => {
    const storesList = document.getElementById('storesList');
  
    // Функция для отображения списка магазинов
    function renderStores() {
      fetch('http://localhost:3000/api/stores')
        .then((response) => response.json())
        .then((stores) => {
          storesList.innerHTML = '';  // Очищаем список перед его обновлением
  
          stores.forEach((store) => {
            const storeItem = document.createElement('li');
            storeItem.innerHTML = `<h3>${store.name}</h3><p>Продавец: ${store.seller}</p>`;
            storesList.appendChild(storeItem);
          });
        })
        .catch((error) => {
          console.error('Ошибка при загрузке магазинов:', error);
        });
    }
  
    renderStores();  // Вызываем функцию при загрузке страницы
  });
  