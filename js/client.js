/* connect to server*/
// const socket = io('http://localhost:8000'); //give cors issues
const socket = io("http://localhost:8000", { transports: ["websocket"] });

const form = document.getElementById('send-container')
const messageInput = document.getElementById("messageInp")
const messageContainer = document.querySelector('.container')
var audio = new Audio('ting.mp3')


// Append event into container
const append = (message, position) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
    if (position == "left") {
        audio.play()
    }
}

// Send message to the server
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = messageInput.value;
    append(`You: ${message}`, 'right')
    socket.emit('send', message);
    messageInput.value = '';
})

// *************************************************** STARTS HERE***********************************************

const name = prompt("Enter you name");
socket.emit('new-user-joined', name);

// User join
socket.on('user-joined', name => {
    append(`${name} has joined the chat`, 'right')
})  

// Message receive
socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left')
})

// User leaves
socket.on('left', name => {
    append(`${name} left the chat`, 'right')
})

