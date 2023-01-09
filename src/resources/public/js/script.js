var appBaseUrl = window.location.protocol + "//" + window.location.hostname + "/";

var appSignin = $("#my-signin2");
var appAvatar = $("#app-avatar");
var appMyURLs = $("#app-button-myurls");

var appAccountMenu = document.getElementById("tippy-1");

var accountMenuAvatar = $("#account-menu-avatar");
var accountMenuName = $("#account-menu-name");
var accountMenuEmail = $("#account-menu-email");
var accountMenuSwitch = $("#account-menu-switch");
var accountMenuSignout = $("#account-menu-signout");

var appForm = $("#app-form");
var appInputUrl = $("#app-input-url");
var appInputSlug = $("#app-input-slug");

var appButtonCancel = $("#app-button-cancel");

var appLoader = $("#app-loader");

const checkButtonClient = document.getElementsByClassName("abcRioButton");

window.onload = function () {
  if (!checkButtonClient.length) {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://apis.google.com/js/platform.js?onload=renderButton";
    s.async = 1;
    s.defer = 1;
    $("head").append(s);
  } 
};

function initClipboardAPI() {
  if (navigator.userAgent.indexOf("Firefox") == -1) {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        // write to the clipboard now
      } else {
        showAlert(
          "error",
          "Cannot access to clipboard",
          "The website cannot copy your URL automatically",
          "I understand"
        );
      }
    });
  }
}

function updateClipboard(newClip) {
  navigator.clipboard.writeText(newClip).then(
    function () {
      swal({
        title: "Copied your URL to the clipboard",
        icon: "success",
        timer: 1500,
        buttons: false,
      });
    },
    function () {
      // clipboard write failed
    }
  );
}

function showAlert(icon = "success", title, message, buttonText) {
  var contentElement = document.createElement("div");
  contentElement.innerHTML =
    '<b style="font-size: 1.25rem;">' + message + "</b>";
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
        closeModal: true,
      },
    },
  });
}

function showLoader() {
  appLoader.css("z-index", 9999999);
  appLoader.removeClass("animate__fadeOut");
  appLoader.addClass("animate__fadeIn");
}

function hideLoader() {
  appLoader.removeClass("animate__fadeIn");
  appLoader.addClass("animate__fadeOut");
  setTimeout(function () {
    appLoader.css("z-index", -1);
  }, 1000);
}

function validateURL({ url, slug }) {
  const urlRegex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;

  if (!url) {
    showAlert(
      "error",
      "URL is required!",
      "You cannot shorten nothing",
      "My bad"
    );
    grecaptcha.reset();
    return false;
  } else if (!urlRegex.test(url)) {
    showAlert("error", "Invalid URL!", "Hey hey what is this?", "Oopsie");
    grecaptcha.reset();
    return false;
  }
  if (slug) {
    if (slug.indexOf(" ") >= 0) {
      showAlert(
        "error",
        "Invalid SLUG!",
        "Slug can not contain whitespace",
        "Oopsie"
      );
      grecaptcha.reset();
      return false;
    }
  }
  return true;
}

var onloadCallback = function () {
  grecaptcha.render("my-recaptcha", {
    sitekey: "6LeI8gUeAAAAAA-GTrJb7cyjN12gnOBXqDNhVbzT"
  });
};

function submitURL(requestData) {
  showLoader();
  window
    .fetch("/a/api/urls", {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(function (response) {
      hideLoader();
      return response.json();
    })
    .then(function (response) {
      if (response.success === false) {
        showAlert(
          "error",
          "Something is wrong!",
          response.message,
          "Try again"
        );
        grecaptcha.reset();
      } else {
        showAlert(
          "success",
          "Copy your URL below",
          appBaseUrl + response.data,
          "Copy URL"
        ).then(function (result) {
          if (result) updateClipboard(result);
        });
        grecaptcha.reset();
      }
    })
    .catch(function (error) {
      hideLoader();
      grecaptcha.reset();
    });
}

function onSuccess(googleUser) {
  console.log("Login as: " + googleUser.getBasicProfile().getName());
  let id_token = googleUser.getAuthResponse().id_token;
  accountMenuAvatar.attr("src", googleUser.getBasicProfile().getImageUrl());
  accountMenuName.text(googleUser.getBasicProfile().getName());
  accountMenuEmail.text(googleUser.getBasicProfile().getEmail());

  $.ajax({
    method: "POST",
    url: "/a/api/auth/signin",
    headers: {
      "Content-Type": "application/json",
    },
    dataType: "json",
    data: JSON.stringify({ tokenId: id_token }),
    success: function (response) {
      let accessToken = response.data.accessToken;
      document.cookie = "accessToken=" + accessToken;
      appAvatar.attr("src", googleUser.getBasicProfile().getImageUrl());
      appAvatar.show();
      appMyURLs.show();
      appSignin.hide();
      googleUser.disconnect();
    },
    error: function (request) {
      showAlert(
        "error",
        "Something is wrong!",
        request.getResponseHeader("some_header"),
        "Try again"
      );
    },
  });
}

function renderButton() {
  gapi.signin2.render("my-signin2", {
    scope: "profile email",
    width: "auto",
    height: 50,
    longtitle: true,
    theme: "dark",
    onsuccess: onSuccess,
  });
}

function checkAccessToken() {
  let accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  if (accessToken) {
    $.ajax({
      method: "GET",
      url: "/a/api/users/detail",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      success: function (response) {
        appAvatar.attr("src", response.data.avatar);
        accountMenuAvatar.attr("src", response.data.avatar);
        accountMenuName.text(response.data.name);
        accountMenuEmail.text(response.data.email);
        appAvatar.show();
        appMyURLs.show();
        appSignin.hide();
      },
      error: function (httpObj) {
        if (httpObj.status == 401) {
          document.cookie = "accessToken=;";
          appAvatar.hide();
          appMyURLs.hide();
          appSignin.show();
        }
      },
    });
  } else {
    appAvatar.hide();
    appMyURLs.hide();
    appSignin.show();
  }
}

function init() {
  initClipboardAPI();
  checkAccessToken();
  hideLoader();

  tippy("#app-avatar", {
    content: appAccountMenu?.innerHTML,
    allowHTML: true,
    arrow: false,
    trigger: "click",
    interactive: true,
    placement: "bottom-end",
    onMount: function () {
      let tippyMenuAvatar = $(".tippy-box #account-menu-avatar");
      let tippyMenuName = $(".tippy-box #account-menu-name");
      let tippyMenuEmail = $(".tippy-box #account-menu-email");
      let tippyMenuSwitch = $(".tippy-box #account-menu-switch");
      let tippyMenuSignout = $(".tippy-box #account-menu-signout");

      tippyMenuSwitch.on("click", function () {
        gapi.auth2
          .getAuthInstance()
          .signIn({
            prompt: "select_account",
          })
          .then(function () {
            location.reload();
          });
      });

      tippyMenuSignout.on("click", function () {
        gapi.auth2
          .getAuthInstance()
          .signOut({})
          .then(function () {
            location.reload();
            document.cookie = "accessToken=; path=/;";
          });
      });

      tippyMenuAvatar.attr("src", accountMenuAvatar.attr("src"));
      tippyMenuName.text(accountMenuName[0].innerText);
      tippyMenuEmail.text(accountMenuEmail[0].innerText);
    },
  });

  appButtonCancel &&
    appButtonCancel.click(function (event) {
      appInputUrl.val("");
      appInputSlug.val("");
    });

  appForm.on("submit", function (event) {
    event.preventDefault();

    var url = appInputUrl.val();
    var slug = appInputSlug.val();
    var token = grecaptcha.getResponse();

    const urlObject = {
      url,
    };

    if (slug) {
      slug = slug.trim();
      urlObject["slug"] = slug;
    }

    if (token) {
      urlObject["recaptcha"] = token;
    } else {
      showAlert(
        "error",
        "Recaptcha is required!",
        "Please verify that you are not a robot!",
        "Try again"
      );
      return;
    }

    if (validateURL(urlObject)) {
      submitURL(urlObject);
    }
  });
}
init();
