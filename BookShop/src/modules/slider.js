let images = [
    {
        url: "BookShop\src\img\banner.png"
    },
    {
        src: "./src/img/banner 2.png"
    },
    {
        src: "./src/img/banner 3.png"
    }
];




const sliderBody = document.querySelector(".slider_body");
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




updateSlider()






