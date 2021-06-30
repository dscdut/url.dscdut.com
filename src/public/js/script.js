var appBaseUrl = window.location.href

var appForm = document.getElementById('app-form')
var appInputUrl = document.getElementById('app-input-url')
var appInputSlug = document.getElementById('app-input-slug')

var appButtonCancel = document.getElementById('app-button-cancel')

var appLoader = document.getElementById('app-loader')

function initClipboardAPI() {
  navigator.permissions.query({name: "clipboard-write"}).then(result => {
    if (result.state == "granted" || result.state == "prompt") {
      // write to the clipboard now
    } else {
      showAlert("error", "Cannot access to clipboard", "The website cannot copy your URL automatically", "I understand")
    }
  });
}

function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(function() {
    swal({
      title: "Copied your URL into clipboard",
      icon: "success",
    });
  }, function() {
    /* clipboard write failed */
  });
}

function showAlert(icon = "success", title, message, buttonText) {
  var contentElement = document.createElement('div')
  contentElement.innerHTML = '<b style="font-size: 1.25rem;">' + message + '</b>'
  return swal({
    title,
    icon,
    content: contentElement,
    buttons: {
      confirm: {
        text: buttonText,
        value: message,
        visible: true,
        className: ["app-button", icon],
        closeModal: true
      }
    },
  })
}

function showLoader() {
  appLoader.style.zIndex = 9999999;
  appLoader.classList.remove("animate__fadeOut")
  appLoader.classList.add('animate__fadeIn');
}

function hideLoader() {
  appLoader.classList.remove("animate__fadeIn")
  appLoader.classList.add("animate__fadeOut")
  setTimeout(function () {
    appLoader.style.zIndex = -1;
  }, 1000)
}


function validateURL(url, slug) {
  var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

  if (!url) {
    showAlert("error", "URL is required!", "You cannot shorten nothing", "My bad")
    return false
  } else if (!urlRegex.test(url)) {
    showAlert("error", "Invalid URL!", "Hey hey what is this?", "Oopsie")
    return false
  }
  if(slug) {
    if(slug.indexOf(' ') >= 0) {
      showAlert("error", "Invalid SLUG!", "Slug can not contain whitespace", "Oopsie")
      return false
    }
  }
  return true
}

function submitURL(url, slug) {
  showLoader()
  window.fetch('/api/url', {
      method: 'POST',
      body: JSON.stringify({url, slug}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(function(response) {
      hideLoader()
      return response.json()
    })
    .then(function(response) {
      if (response.error) {
        showAlert("error", "Something is wrong!", response.error, "Try again")
      } else {
        showAlert("success", "Copy your URL below", appBaseUrl + response.slug, "Copy URL")
          .then(function (result) {
            updateClipboard(result)
          })
      }
    })
    .catch(function(error) {
      hideLoader()
    });
}

function init() {
  initClipboardAPI()
  hideLoader()

  appButtonCancel.addEventListener('click', function (event) {
    appInputUrl.value = ''
    appInputSlug.value = ''
  })

  appForm.addEventListener('submit', function (event) {
    event.preventDefault()

    var url = appInputUrl.value
    var slug = appInputSlug.value

    if(slug) slug = slug.trim()

    if (validateURL(url, slug)) {
      submitURL(url, slug)
    }

  })
}
init()