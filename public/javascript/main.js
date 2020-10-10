const formEl = document.querySelector("form");
const shortUrlEl = document.querySelector("#shortUrl");

formEl.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  var url = formEl.url.value;
  var alias = formEl.alias.value;
  console.log(url, alias);

  const response = sendRequest(url, alias);
  console.log("response", response);
  shortUrlEl.innerHTML = `<a href=${document.location.origin}/${alias}>${document.location.origin}/${alias}</a>`;

  formEl.url.value = "";
  formEl.alias.value = "";
}

function sendRequest(url, alias) {
  var http = new XMLHttpRequest();
  var data = JSON.stringify({ url, alias });
  http.open("POST", "/", true);
  http.setRequestHeader("Content-Type", "application/json");

  http.onreadystatechange = () => {
    if (http.readyState === 4 && http.status === 200) {
      console.log(http.responseText);
      return http.responseText;
    }
  };
  http.send(data);
}

function sendRequestJson(url, alias) {}
