const userInput = document.getElementById("messageInput");
const sendButton = document.getElementById("button");

// click button Send, send request to server
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
  }).then(() => {
    getBreedList();
  });
});


// get the message from server and display it as list on page. 
function getBreedList() {
  fetch("http://127.0.0.1:5000/breeds")
  .then((response)=>{
    return response.json()
  }).then((breeds)=> {
    const list = document.getElementById("breedList");
    list.innerHTML = ""

    breeds.forEach((breed) => {
      const item = document.createElement("li");
      item.textContent= breed;
      list.appendChild(item);
    });
  })
}

getBreedList();