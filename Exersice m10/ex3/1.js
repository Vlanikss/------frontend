const echo = "wss://echo.websocket.org";

const input = document.querySelector(".main_input")
const btn_sms = document.querySelector(".main_btn")
const btn_nav = document.querySelector(".main_btn2")
const container = document.querySelector(".main_down")


const webSocket = new WebSocket(echo);

function sendSms(){
    
    const paragraph = input.value;
    const paragraphContainer = document.createElement("p")
    paragraphContainer.innerText = paragraph;
    container.appendChild(paragraphContainer)
    paragraphContainer.classList.add("new_message")
    webSocket.send(paragraph);
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

btn_sms.addEventListener("click",sendSms)



const Error = (error) =>{
    console.log("ошибка",error);
    
}

const succes = (position)=>{
    
    
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
  
    
}

function nav(){

    
    const navi = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    const aContainer = document.createElement("a")
aContainer.setAttribute('class','mapLink')
aContainer.href = navi;
    aContainer.innerText = "Геопозиция" ;
    container.appendChild(aContainer)
    aContainer.classList.add("new_message")
   
} 

if(!navigator.geolocation){
    console.log('не поддерживается');
    
}else {
    console.log('определение местоположения');
    navigator.geolocation.getCurrentPosition(succes, Error)
}

btn_nav.addEventListener("click",nav)