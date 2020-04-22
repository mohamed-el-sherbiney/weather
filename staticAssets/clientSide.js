var searchInput = document.getElementById("search").value;
var button = document.getElementById("btn");
var message = document.getElementById("forecast");


button.addEventListener("click",function(){
  searchInput = document.getElementById("search").value;
  message.textContent = "loading";
  fetch("http://localhost:3000/weather?location="+searchInput).then((response) => {
    response.json().then((data) => {
      message.textContent = "temperature is" + data.temp;
    })
  })

})
