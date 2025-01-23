const API_KEY = 'AIzaSyBfT1IHlaIInefqUg3hGgM-X1YczDkKuEs'; 
const API_URL = 'https://www.googleapis.com/books/v1/volumes';



let startIndex = 0;
const maxResults = 6;
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const bookList = document.getElementById('book-list');
const loadMoreButton = document.getElementById('load-more');


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

  const cover = imageLinks?.thumbnail || 'placeholder.jpg';
  const authorText = authors ? authors.join(', ') : 'Unknown author';
  const shortDescription = description
    ? description.split(' ').slice(0, 15).join(' ') + '...'
    : 'No description available';
  const priceText = listPrice ? `${listPrice.amount} ${listPrice.currencyCode}` : null;

  bookCard.innerHTML = `
    <img src="${cover}" alt="Book Cover">
    <div class="content">
      <div>
        <div class="title">${title}</div>
        <div class="author">${authorText}</div>
        ${averageRating ? `<div class="rating">${'⭐'.repeat(Math.round(averageRating))} (${ratingsCount})</div>` : ''}
        <div class="description">${shortDescription}</div>
        ${priceText ? `<div class="price">${priceText}</div>` : ''}
      </div>
      <button class="buy-now ${isInCart ? 'active' : ''}" data-id="${book.id}">${isInCart ? 'In Cart' : 'Buy Now'}</button>
    </div>
  `;

  bookCard.querySelector('.buy-now').addEventListener('click', () => toggleCart(book));
  bookList.appendChild(bookCard);
}

  


async function loadBooks() {
  const books = await fetchBooks();
  books.forEach(renderBook);
  startIndex += maxResults;
}

function toggleCart(book) {
  const index = cart.findIndex((item) => item.id === book.id);

  if (index > -1) {
    cart.splice(index, 1); 
  } else {
    cart.push(book); 
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  bookList.innerHTML = '';
  startIndex = 0;
  loadBooks();
}


loadMoreButton.addEventListener('click', loadBooks);
loadBooks();
