const echo = "wss://echo.websocket.org";

const input = document.querySelector(".main_input")
const btn1 = document.querySelector(".main_btn")
const btn2 = document.querySelector(".main_btn2")
const container = document.querySelector(".main_down")


let webSocket = new WebSocket(echo);

function addP(){
    
    const p = input.value;
    const pContainer = document.createElement("p")
    pContainer.innerText = p;
    container.appendChild(pContainer)
    pContainer.classList.add("new_message")
    webSocket.send(p);
}

webSocket.onmessage = function (e) {
    const response = e.data;
    if (!response.includes("Request served by")){
    const responseContainer= document.createElement("p");
responseContainer.innerText = response
container.appendChild(responseContainer);
responseContainer.classList.add("new_message2")
}}

webSocket.onerror = function(){
    console.log("error");
    
}
webSocket.onclose = function(){
    console.log("closed");
    
}

btn1.addEventListener("click",addP)



const Error = (error) =>{
    console.log("ошибка",error);
    
}

const succes = (position)=>{
    
    
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  
    
}

function nav(){

    if (latitude && longitude) {
    const navi = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    const aContainer = document.createElement("a")
aContainer.setAttribute('class','mapLink')
aContainer.href = navi;
    aContainer.innerText = "Геопозиция" ;
    container.appendChild(aContainer)
    aContainer.classList.add("new_message")
   
} else {
        console.log("Геолокация не определена.");
    }
}

if(!navigator.geolocation){
    console.log('не поддерживается');
    
}else {
    console.log('определение местоположения');
    navigator.geolocation.getCurrentPosition(succes, Error)
}

btn2.addEventListener("click",nav)