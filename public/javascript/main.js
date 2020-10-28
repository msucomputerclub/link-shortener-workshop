const formEl = document.querySelector('form');
const shortUrlEl = document.querySelector('#shortUrl');

formEl.addEventListener('submit', formSubmit);

//function ran when form is submitted
function formSubmit(e) {
    e.preventDefault(); //prevent page reload

    //grab values from input fields
    var url = DOMPurify.sanitize(formEl.url.value);
    var alias = DOMPurify.sanitize(formEl.alias.value);
    console.log(url, alias);

    //send request to backend and receive the new url
    axios
        .post('/', {
            url,
            alias,
        })
        .then((response) => {
            console.log('response', response.data.url);
            shortUrlEl.innerHTML = `<a href="${response.data.url}">${response.data.url}</a>`;
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data); // => the response payload
                shortUrlEl.innerHTML = `<span>${error.response.data.error}</span>`;
            }
        });

    //insert url into span in the document

    //clear input fields
    formEl.url.value = '';
    formEl.alias.value = '';
}

function sendRequest(url, alias) {
    // http.onreadystatechange = () => {
    //     //function run on response
    //     let response = {};
    //     if (http.readyState === 4 && http.status === 200) {
    //         //check if response is OK
    //         console.log(http.responseText);
    //         response.url = http.responseText; //return short url
    //     } else {
    //         parsedResponse = JSON.parse(http.responseText);
    //         response.errors = parsedResponse['errors'];
    //         // return http.responseText.errors;
    //     }
    //     console.log('inner response', response);
    //     return response;
    // };
    // http.send(data); //send payload
}
