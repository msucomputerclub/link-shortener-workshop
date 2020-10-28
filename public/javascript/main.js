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

            //clear input fields
            formEl.url.value = '';
            formEl.alias.value = '';
        })
        .catch((error) => {
            if (error.response) {
                console.log(error.response.data); // => the response payload
            }
        });
}
