let images = [
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Walther_P99_9x19mm.png/1280px-Walther_P99_9x19mm.png",
        title: "Walther p99",
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/AK-47_type_II_noBG.png/405px-AK-47_type_II_noBG.png",
        title: "AK-47",
    },
    {
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/210816-M-IK792-1121_-_Unknown_Distances_%28Image_9_of_9%29.jpg/1920px-210816-M-IK792-1121_-_Unknown_Distances_%28Image_9_of_9%29.jpg",
        title: "mk13",
    },
];

const sliderBody = document.querySelector(".slider_body");
const sliderLeftClick = document.querySelector(".slider_leftClick");
const sliderRightClick = document.querySelector(".slider_rightClick");
const circlesContainer = document.querySelector(".slider_circles__container")
const textContainer = document.querySelector(".text_container")
let currentIndex = 0;

///////////Создаем фото и текст и кружки///////////////////////////
images.forEach((image,index)=>{
    const imgElem = document.createElement("img")
    imgElem.src = image.url;
    imgElem.alt = image.title;
    if(index == 0 ) imgElem.classList.add("active")
        sliderBody.appendChild(imgElem)
})

images.forEach((image,index)=>{
    const textElem = document.createElement("p")
    textElem.classList.add("active")
    textElem.textContent= image.title
    if(index === 0) textElem.classList.add("active")
        textElem.addEventListener("click",()=>{
    currentIndex = index;
    updateSlider()
        })
        textContainer.appendChild(textElem)
})
images.forEach((_,index)=>{
    const circle = document.createElement("div")
    circle.classList.add("slider_circle")
    if(index === currentIndex) circle.classList.add("active")
        circle.addEventListener("click",()=>{
    currentIndex=index;
    updateSlider()
})
circlesContainer.appendChild(circle)
})
//////////////////////////обновление///////////////////////////////////////

const textUpdate = () =>{
    const texts = document.querySelectorAll(".slider_text")
    texts.forEach((text,index)=>{
       text.classList.remove("active")
       if (index === currentIndex) text.classList.add("active")
    })

}

const updateSlider = ()=>{
const allImages = document.querySelectorAll(".slider_body img")
allImages.forEach((img,index)=>{
    img.classList.remove("active")
    if(index === currentIndex) img.classList.add("active")
})
textUpdate()
}
 

const circlesUpdate = ()=>{
    const circles = document.querySelectorAll(".slider_circle")
    circles.forEach((circle,index)=>{
        circle.classList.toggle("active", index===currentIndex)

    })
}
updateSlider()

sliderLeftClick.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; 
    updateSlider();
});

sliderRightClick.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length; 
    updateSlider();
});


updateSlider()


