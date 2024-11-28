document.getElementById('loadImagesBtn').addEventListener('click', loadImages);

function loadImages() {
    const loader = document.getElementById('loader');
    const gallery = document.getElementById('gallery');
    
    // Показываем лоадер
    loader.style.display = 'block';
    
    // Очистка галереи: удаляем все дочерние элементы
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }

    // Отправляем запрос на сервер
    fetch('https://dog.ceo/api/breeds/image/random/20')
        .then(response => response.json())
        .then(data => {
            // Скрываем лоадер, когда изображения загружены
            loader.style.display = 'none';
            
            // Заполняем галерею изображениями
            const images = data.message;
            images.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = 'Dog image';
                gallery.appendChild(img); // Добавляем новое изображение в галерею
            });
        })
        .catch(error => {
            loader.style.display = 'none';
            console.error('Ошибка при загрузке изображений:', error);
        });
}