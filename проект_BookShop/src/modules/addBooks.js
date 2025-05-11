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

    const cover = imageLinks?.thumbnail || 'https://edwards.flinders.edu.au/wp-content/uploads/2009/06/nopic_3.jpg';
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

  function updateButtons() {
    const buttons = document.querySelectorAll('.buy-now')
    buttons.forEach(button=>{
      const bookid = button.getAttribute('data-id')
      const isInCart = cart.some(item => item.id === bookid)
      button.textContent = isInCart ? 'in cart' : 'add to cart'
      button.classList.toggle('active',isInCart)
    })
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
    updateButtons();  
    updateCartCount();
    
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




  document.addEventListener('click',(e)=>{
    if(e.target.classList.contains('load-more')){
      loadBooks()
    }
    if(e.target.classList.contains('category')){
      const categoryName = e.target.textContent;
      loadBooks(categoryName);
      bookList.innerHTML = '';
      startIndex = 0;
      updateActiveCategory(e.target);
    }
  })

  loadBooks();

  updateCartCount();
