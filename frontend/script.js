const userInput = document.querySelector("#messageInput");
const sendButton = document.querySelector("#button");

sendButton.addEventListener('click', function() {
    message = userInput.value;
    fetch("http://127.0.0.1:5000/breeds", {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message:message
        })
    });
})