const apiUrl = 'http://localhost:3000/api/products';

// Функция для отображения продуктов
function renderProducts() {
  fetch(apiUrl)
    .then((response) => response.json())
    .then((products) => {
      const productsList = document.getElementById('products');
      productsList.innerHTML = '';  // Очищаем список перед его обновлением

      products.forEach((product) => {
        const productItem = document.createElement('li');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
          <img src="${product.photos?.[0] || 'placeholder.jpg'}" alt="${product.name}" />
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>Цена: ${product.price} ₽</p>
            <p>${product.description}</p>
          </div>
          <button onclick="deleteProduct('${product._id}')">Удалить</button>
          
        `;
        productsList.appendChild(productItem);
      });
    })
    .catch((error) => {
      console.error('Ошибка при загрузке продуктов:', error);
    });
}

// Функция для редактирования продукта
function editProduct(id) {
  fetch(`${apiUrl}/${id}`)
    .then((response) => response.json())
    .then((product) => {
      // Заполняем форму для редактирования
      document.getElementById('name').value = product.name;
      document.getElementById('price').value = product.price;
      document.getElementById('description').value = product.description;

      // Меняем текст кнопки на "Изменить продукт"
      const submitButton = document.querySelector('.button');
      submitButton.textContent = 'Изменить продукт';
      submitButton.setAttribute('onclick', `updateProduct('${product._id}')`);
    })
    .catch((error) => {
      console.error('Ошибка при получении данных продукта:', error);
    });
}

// Функция для обновления продукта
function updateProduct(id) {
  const name = document.getElementById('name').value;
  const price = parseFloat(document.getElementById('price').value);
  const description = document.getElementById('description').value;
  const photos = document.getElementById('photos').files;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('description', description);

  Array.from(photos).forEach((photo) => {
    formData.append('photos', photo);
  });

  fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    body: formData,
  })
    .then((response) => response.json())
    .then(() => {
      // После обновления, сбрасываем форму и меняем текст кнопки
      document.querySelector('.button').textContent = 'Добавить продукт';
      document.querySelector('.button').removeAttribute('onclick');
      form.reset();
      renderProducts();  // Обновляем список продуктов
    })
    .catch((error) => {
      console.error('Ошибка при обновлении продукта:', error);
    });
}

// Функция для удаления продукта
function deleteProduct(id) {
  fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then(() => {
      renderProducts();  // После удаления обновляем список
    })
    .catch((error) => {
      console.error('Ошибка при удалении продукта:', error);
    });
}

// Форма для добавления продукта
const form = document.getElementById('productForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const price = parseFloat(document.getElementById('price').value);
  const description = document.getElementById('description').value;
  const photos = document.getElementById('photos').files;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('description', description);

  Array.from(photos).forEach((photo) => {
    formData.append('photos', photo);
  });

  fetch(apiUrl, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then(() => {
      form.reset();  // Сбрасываем форму после добавления
      renderProducts();  // Обновляем список продуктов
    })
    .catch((error) => {
      console.error('Ошибка при добавлении продукта:', error);
    });
});

// Инициализация списка продуктов при загрузке страницы
window.onload = renderProducts;
