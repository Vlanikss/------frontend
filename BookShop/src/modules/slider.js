let images = [
    {
        url: "./src/img/banner.png"
    },
    {
        url: "./src/img/banner_2.png"
    },
    {
        url: "./src/img/banner_3.png"
    }
];

const sliderBody = document.querySelector(".slider_body");
const circlesContainer = document.querySelector(".slider_circles__container");

let currentIndex = 0;

///////////Создаем фото и текст и кружки///////////////////////////
images.forEach((image, index) => {
    const imgElem = document.createElement("img");
    imgElem.src = image.url;
    imgElem.alt = image.title;
    if (index === 0) imgElem.classList.add("active");
    sliderBody.appendChild(imgElem);
});

images.forEach((_, index) => {
    const circle = document.createElement("div");
    circle.classList.add("slider_circle");
    if (index === currentIndex) circle.classList.add("active");
    circle.addEventListener("click", () => {
        currentIndex = index;
        updateSlider();
    });
    circlesContainer.appendChild(circle);
});


const updateSlider = () => {
    const allImages = document.querySelectorAll(".slider_body img");
    allImages.forEach((img, index) => {
        img.classList.remove("active");
        if (index === currentIndex) img.classList.add("active");
    });
    
    circlesUpdate();
};

const circlesUpdate = () => {
    const circles = document.querySelectorAll(".slider_circle");
    circles.forEach((circle, index) => {
        circle.classList.toggle("active", index === currentIndex);
    });
};

//////////////////////////Автопереключение/////////////////////////////////
const startAutoSlide = () => {
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length; // Зацикливаем индекс
        updateSlider();
    }, 5000); // 5 секунд
};

// Запускаем автопереключение
startAutoSlide();

// Инициализация слайдера
updateSlider();
