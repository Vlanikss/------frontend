document.getElementById('loadImagesBtn').addEventListener('click', loadImages);

function loadImages() {
    const loader = document.getElementById('loader');
    const gallery = document.getElementById('gallery');
    

    loader.style.display = 'block';
    
 
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }


    fetch('https://dog.ceo/api/breeds/image/random/20')
        .then(response => response.json())
        .then(data => {
         
            loader.style.display = 'none';
            
      
            const images = data.message;
            images.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.alt = 'Dog image';
                gallery.appendChild(img); 
            });
        })
        .catch(error => {
            loader.style.display = 'none';
            console.error('Ошибка при загрузке изображений:', error);
        });
}