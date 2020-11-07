var input = document
    .getElementById('input-url')
input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("submit-url").click();
    }
});

checkNull = () => {
    var inputLink = document.getElementById('input-url').value;
    inputLink = inputLink.trim();
    if (inputLink.indexOf(" ") !== -1 || inputLink.length == 0) {
        alert("Please input your link again!")
    } else {
        var x = document.getElementById('shorten-output');
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
            window.location.reload();
        }

        var slug = '';
        window.fetch("/url", {
            method: 'POST',
            body: JSON.stringify({ "url": inputLink }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(response => slug = response.slug)
            .then(response => document.getElementById('output-url').value = window.location.href + slug)
            .catch(error => console.error('Error:', error))
    }
}
document
    .getElementById('submit-url')
    .addEventListener('click', function () {
        checkNull();
    }
    )
    
function copy() {
    var copyText = document.getElementById("output-url");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
}

const axios = {
    post: function (url, body) {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", url);
        xmlhttp.send(JSON.stringify(body));
    }
}

