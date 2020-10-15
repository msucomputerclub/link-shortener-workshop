const formEl = document.querySelector("form");
const shortUrlEl = document.querySelector("#shortUrl");

formEl.addEventListener("submit", formSubmit);

//function ran when form is submitted
function formSubmit(e) {
  e.preventDefault(); //prevent page reload

  //grab values from input fields
  var url = formEl.url.value;
  var alias = formEl.alias.value;
  console.log(url, alias);

  //send request to backend and receive the new url
  const response = sendRequest(url, alias);
  console.log("response", response);

  //insert url into span in the document
  shortUrlEl.innerHTML = `<a href=${document.location.origin}/${alias}>${document.location.origin}/${alias}</a>`;

  //clear input fields
  formEl.url.value = "";
  formEl.alias.value = "";
}

function sendRequest(url, alias) {
  var http = new XMLHttpRequest(); //init request object
  var data = JSON.stringify({ url, alias }); //stringify json with user url and alias
  http.open("POST", "/", true); //specify type of request and route
  http.setRequestHeader("Content-Type", "application/json"); //specify MIME type header

  http.onreadystatechange = () => {
    //function run on response
    if (http.readyState === 4 && http.status === 200) {
      //check if response is OK
      console.log(http.responseText);
      return http.responseText; //return short url
    }
  };
  http.send(data); //send payload
}

function sendRequestJson(url, alias) {}
