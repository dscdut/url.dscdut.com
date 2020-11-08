// returnID = () => {
//     var x = window.location.href;
//     var y = x;
//     var z;
//     while (y.indexOf("/") !== -1) {
//         z = y.indexOf("/")
//         y = y.replace("/", ".");
//     }
//     z++;
//     var t = x.substr(z, x.length)
//     if (t.length != 0) {
//         window.location.href = "https://dsc-dut.herokuapp.com/" + t;
//     }
// }


checkFormat=(myURL)=>{
    var pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)+[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm;
            return pattern.test(myURL);
}
checkNull = (inputLink) => {
//    var inputLink = document.getElementById('input-url').value;
    inputLink = inputLink.trim();
    if (inputLink.indexOf(" ") !== -1 || inputLink.length == 0) {
        alert("Please input your link again!")
    } else {
        // var x = document.getElementById('shorten-output');
        // if (x.style.display === 'none') {
        //     x.style.display = 'block';   
        // } else {
        //     x.style.display = 'none';
        //     window.location.reload();
        // }

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
}
document
    .getElementById('form-submit')
    .addEventListener('submit', function () {
        event.preventDefault();
        var inputLink = document.getElementById('input-url').value;
        if(checkFormat(inputLink)){
            checkNull(inputLink);
        }else{
            if(checkFormat("https://"+inputLink)){
                checkNull("https://"+inputLink);
            }else{
                alert("Please input your link again!");
            }
        }
    }
    )

document.getElementById("copybt").addEventListener("click",function copy() {
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

