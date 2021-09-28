var appBaseUrl = window.location.href

var appSignin = $('#my-signin2')
var appAvatar = $('#app-avatar')

var appForm = $('#app-form')
var appInputUrl = $('#app-input-url')
var appInputSlug = $('#app-input-slug')

var appButtonCancel = $('#app-button-cancel')

var appLoader = $('#app-loader')

function initClipboardAPI() {
  navigator.permissions.query({ name: "clipboard-write" }).then(result => {
    if (result.state == "granted" || result.state == "prompt") {
      // write to the clipboard now
    } else {
      showAlert("error", "Cannot access to clipboard", "The website cannot copy your URL automatically", "I understand")
    }
  });
}

function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(function () {
    swal({
      title: "Copied your URL into clipboard",
      icon: "success",
    });
  }, function () {
    // clipboard write failed
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
  appLoader.css('z-index', 9999999);
  appLoader.removeClass("animate__fadeOut")
  appLoader.addClass('animate__fadeIn');
}

function hideLoader() {
  appLoader.removeClass("animate__fadeIn")
  appLoader.addClass("animate__fadeOut")
  setTimeout(function () {
    appLoader.css('z-index', -1);
  }, 1000)
}

function validateURL({ url, slug }) {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g

  if (!url) {
    showAlert("error", "URL is required!", "You cannot shorten nothing", "My bad")
    return false
  } else if (!urlRegex.test(url)) {
    showAlert("error", "Invalid URL!", "Hey hey what is this?", "Oopsie")
    return false
  }
  if (slug) {
    if (slug.indexOf(' ') >= 0) {
      showAlert("error", "Invalid SLUG!", "Slug can not contain whitespace", "Oopsie")
      return false
    }
  }
  return true
}

function submitURL(requestData) {
  showLoader()
  window.fetch('/api/url', {
    method: 'POST',
    body: JSON.stringify(requestData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      hideLoader()
      return response.json()
    })
    .then(function (response) {
      if (response.success === false) {
        showAlert("error", "Something is wrong!", response.message, "Try again")
      } else {
        showAlert("success", "Copy your URL below", appBaseUrl + response.data.slug, "Copy URL")
          .then(function (result) {
            updateClipboard(result)
          })
      }
    })
    .catch(function (error) {
      hideLoader()
    });
}

function onSuccess(googleUser) {
  let id_token = googleUser.getAuthResponse().id_token;

  $.ajax({
    method: "POST",
    url: "/a/api/auth/signin",
    headers: {
      'Content-Type': 'application/json',
    },
    dataType: 'json',
    data: { tokenId: id_token },
    success: function (response) {
      let accessToken = response.accessToken;
      document.cookie = "accessToken=" + accessToken;
      appAvatar.attr('src', googleUser.getBasicProfile().getImageUrl());
      appAvatar.show();
      appSignin.hide();
    },
    error: function (request) {
      showAlert("error", "Something is wrong!", request.getResponseHeader('some_header'), "Try again")
    }
  });
}

function onFailure(error) {
  showAlert("error", "Something is wrong!", error, "Try again")
}

function renderButton() {
  gapi.signin2.render('my-signin2', {
    'scope': 'profile email',
    'width': 240,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSuccess,
    'onfailure': onFailure
  })
}

function init() {
  initClipboardAPI()
  hideLoader()

  appButtonCancel && appButtonCancel.click(function (event) {
    appInputUrl.val = ''
    appInputSlug.val = ''
  })

  appForm.on('submit', function (event) {
    event.preventDefault()

    var url = appInputUrl.val
    var slug = appInputSlug.val

    const urlObject = {
      url
    }

    if (slug) {
      slug = slug.trim();
      urlObject['slug'] = slug;
    }

    if (validateURL(urlObject)) {
      submitURL(urlObject)
    }
  })
}
init()