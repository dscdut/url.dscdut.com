var baseUrl = window.location.host + "/"

const limit = 10
var hasMore = true
var currentPage = 1
var totalViewCount = 0
var loadMore = $("#load-more")

var urlList = $("#myurls-list")
var template = ""
var urlEditButtons = []

var totalView = $("#myurls-total-views")

$.ajax({
  url: "/js/myurl.ejs",
  success: function (response) {
    template = response
  }
})

function getUrlsApi() {
  $.ajax({
    type: "GET",
    url: "/a/api/urls/",
    data: { page: currentPage },
    success: function (response) {
      urls = response.data

      if (urls.length < limit) {
        hasMore = false
      }

      urls.forEach(function (url) {
        let html = ejs.render(template, { url: url })
        urlList.append(html)

        loadMore.addClass("hidden")

        totalViewCount += url.totalClick

        urlEditButtons = $(".fa-edit")
        urlSaveButtons = $(".fa-check-circle")
        urlCancelButtons = $(".fa-times-circle")
      })

      totalView.text(totalViewCount)

      urlEditButtons.each((_, element) => {
        element.addEventListener("click", buttonEditClick)
      })

      urlSaveButtons.each((_, element) => {
        element.addEventListener("click", buttonSaveClick)
      })

      urlCancelButtons.each((_, element) => {
        element.addEventListener("click", buttonCancelClick)
      })
    }
  })
}

function buttonEditClick(e) {
  var urlItem = e.target.parentElement.parentElement
  var urlItemEdit = urlItem.nextElementSibling

  urlItem.style.display = "none"
  urlItemEdit.style.display = "flex"
}

function buttonSaveClick(e) {
  var urlItemEdit = e.target.parentElement.parentElement
  var urlItem = urlItemEdit.previousElementSibling

  var urlId = urlItem.dataset.id

  var slugInput = urlItemEdit.querySelector("input[name='input-url-slug']").value
  var urlInput = urlItemEdit.querySelector("input[name='input-url-long']").value

  var slugValue = urlItem.querySelector("#my-slug")
  var urlValue = urlItem.querySelector("#my-url")

  if (slugValue.textContent.trim() != slugInput || urlValue.textContent.trim() != urlInput) {
    $.ajax({
      type: "PUT",
      url: "/a/api/urls/" + urlId,
      data: {
        slug: slugInput,
        url: urlInput
      },
      success: function () {
        showAlert("success", "Copy your URL below", baseUrl + slugInput, "Copy URL")
          .then(function (result) {
            updateClipboard(result)
          })
        slugValue.textContent = slugInput
        urlValue.textContent = urlInput
        urlItem.style.display = "flex"
        urlItemEdit.style.display = "none"
      },
      error: function (response) {
        showAlert("error", "Something is wrong!", response.responseJSON.message, "Try again")
      }
    })
  } else {
    swal({
      title: "No changes",
      icon: "info",
      timer: 1500,
      buttons: false,
    });
    urlItem.style.display = "flex"
    urlItemEdit.style.display = "none"
  }
}

function buttonCancelClick(e) {
  var urlItemEdit = e.target.parentElement.parentElement
  var urlItem = urlItemEdit.previousElementSibling

  urlItem.style.display = "flex"
  urlItemEdit.style.display = "none"
}

$(document).ready(function () {
  getUrlsApi()

  urlList.scroll(function () {
    var toBottom = urlList[0].scrollHeight - urlList.innerHeight() - urlList.scrollTop()

    if (toBottom <= 1 && hasMore) {
      loadMore.removeClass("hidden")
      currentPage++
      getUrlsApi()
    }
  })
})