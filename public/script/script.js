checkFormat = (myURL) => {
    var pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
    return pattern.test(myURL);
}
checkNull = (inputLink) => {
    var slug = '';
    window.fetch("https://dsc-dut.herokuapp.com/url", {
        method: 'POST',
        body: JSON.stringify({ "url": inputLink }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(response => slug = response.slug)
        .then(response => document.getElementById('output-url').value = "https://dsc-dut.herokuapp.com/" + slug)
        .catch(error => console.error('Error:', error))
}
document
    .getElementById('form-submit')
    .addEventListener('submit', function () {
        event.preventDefault();
        var inputLink = document.getElementById('input-url').value;
        inputLink = inputLink.trim();
        if (checkFormat(inputLink)) {
            checkNull(inputLink);
        } else {
            if (checkFormat("https://" + inputLink)) {
                checkNull("https://" + inputLink);
            } else {
                alert("Please input your link again!");
            }
        }
    }
    )

document.getElementById("copybt").addEventListener("click", function copy() {
    var copyText = document.getElementById("output-url");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
}
)

const axios = {
    post: function (url, body) {
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        xmlhttp.open("POST", url);
        xmlhttp.send(JSON.stringify(body));
    }
}

