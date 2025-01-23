// Получаем элементы
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');

// Функция для обновления количества товаров в корзине
function updateCartCount() {
  // Получаем корзину из localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Обновляем счетчик
  cartCount.textContent = cart.length;
}

// Функция для добавления книги в корзину
function addToCart(book) {
  // Получаем корзину из localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Проверяем, существует ли книга в корзине
  const bookExists = cart.some(item => item.id === book.id);

  if (!bookExists) {
    cart.push(book); // Добавляем книгу в корзину
    localStorage.setItem('cart', JSON.stringify(cart)); // Сохраняем корзину в localStorage
  }

  // Обновляем счетчик
  updateCartCount();
}

// Пример книги для добавления
const exampleBook = {
  id: '1',
  title: 'JavaScript for Beginners',
  price: 29.99,
  author: 'John Doe',
};

// Пример добавления книги в корзину
document.querySelector('.buy-now').addEventListener('click', () => {
  addToCart(exampleBook); // Добавляем книгу при нажатии на кнопку
});

// Инициализируем счетчик при загрузке страницы
updateCartCount();
