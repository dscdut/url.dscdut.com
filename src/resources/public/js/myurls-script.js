var currentPage = 1;
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

      var totalViewCount = 0

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

  urlItem.style.display = "flex"
  urlItemEdit.style.display = "none"
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

    if (toBottom <= 1) {
      loadMore.removeClass("hidden")
      currentPage++
      getUrlsApi()
    }
  })
})