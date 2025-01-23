const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartCount.textContent = cart.length;
}

function addToCart(book) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const bookExists = cart.some(item => item.id === book.id);

  if (!bookExists) {
    cart.push(book);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  updateCartCount();
}

const exampleBook = {
  id: '1',
  title: 'JavaScript for Beginners',
  price: 29.99,
  author: 'John Doe',
};

document.querySelector('.buy-now').addEventListener('click', () => {
  addToCart(exampleBook);
});

updateCartCount();
