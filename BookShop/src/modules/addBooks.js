const API_KEY = 'AIzaSyBfT1IHlaIInefqUg3hGgM-X1YczDkKuEs';
const API_URL = 'https://www.googleapis.com/books/v1/volumes';

let startIndex = 0;
const maxResults = 6;
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const bookList = document.getElementById('book-list');
const loadMoreButton = document.getElementById('load-more');

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

async function fetchBooks(category = 'Business') {
  const url = `${API_URL}?q=subject:${category}&key=${API_KEY}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items || [];
}

function renderBook(book) {
  const {
    volumeInfo: { title, authors, description, imageLinks, averageRating, ratingsCount },
    saleInfo: { listPrice },
  } = book;

  const isInCart = cart.some((item) => item.id === book.id);
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const cover = imageLinks?.thumbnail || 'https://placekitten.com/200/300';
  const authorText = authors ? authors.join(', ') : 'Unknown author';
  const shortDescription = description
    ? description.split(' ').slice(0, 15).join(' ') + '...'
    : 'No description available';
  const priceText = listPrice ? `${listPrice.amount} ${listPrice.currencyCode}` : null;

  bookCard.innerHTML = `
    <div class="book-card-content">
      <img src="${cover}" alt="Book Cover" class="book-cover">
      <div class="book-info">
        <div class="title">${title}</div>
        <div class="author">${authorText}</div>
        ${averageRating ? `<div class="rating">${'⭐'.repeat(Math.round(averageRating))} (${ratingsCount})</div>` : ''}
        <div class="description">${shortDescription}</div>
        ${priceText ? `<div class="price">${priceText}</div>` : ''}
      </div>
      <button class="buy-now ${isInCart ? 'active' : ''}" data-id="${book.id}">${isInCart ? 'In Cart' : 'Add to Cart'}</button>
    </div>
  `;

  bookCard.querySelector('.buy-now').addEventListener('click', () => toggleCart(book));
  bookList.appendChild(bookCard);
}

function renderBooks(books) {
  books.forEach(renderBook);
}

function toggleCart(book) {
  const index = cart.findIndex((item) => item.id === book.id);

  if (index > -1) {
    cart.splice(index, 1);
  } else {
    cart.push(book);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  renderBooksFromCart();
}

function renderBooksFromCart() {
  const cartSection = document.getElementById('cart-section');
  cartSection.innerHTML = '';

  cart.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
      <div class="book-card-content">
        <img src="${book.volumeInfo.imageLinks?.thumbnail || 'https://placekitten.com/200/300'}" alt="Book Cover" class="book-cover">
        <div class="book-info">
          <div class="title">${book.volumeInfo.title}</div>
          <div class="author">${book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown author'}</div>
          <div class="description">${book.volumeInfo.description || 'No description available'}</div>
        </div>
      </div>
    `;
    cartSection.appendChild(bookCard);
  });
}

async function loadBooks(category = 'Business') {
  const books = await fetchBooks(category);
  renderBooks(books);
  startIndex += maxResults;
}

function updateActiveCategory(selectedCategory) {
  const categories = document.querySelectorAll('.category');
  categories.forEach((category) => {
    category.classList.remove('active2');
  });
  selectedCategory.classList.add('active2');
}

const categories = document.querySelectorAll('.category');
categories.forEach((category) => {
  category.addEventListener('click', (e) => {
    const categoryName = e.target.textContent;
    loadBooks(categoryName);
    updateActiveCategory(e.target);
  });
});

loadMoreButton.addEventListener('click', () => loadBooks());

loadBooks();

updateCartCount();
