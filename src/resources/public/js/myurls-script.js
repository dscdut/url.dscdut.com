var baseUrl = window.location.host + "/"

const limit = 10
var hasMore = true
var currentPage = 1
var loadMore = $("#load-more")

var totalViewCount = 0
var totalView = $("#myurls-total-views")

var urlList = $("#myurls-list")
var template = ""

var totalCheckboxes = 0
var selectedCheckboxes = 0
var deleteAll = $("#delete-all")
var checkboxAll = $("#checkbox-all")
var totalCheckboxCount = $("#delete-count")

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
        urlDeleteButtons = $(".fa-trash-alt")

        checkboxes = $(".checkbox-item")
        totalCheckboxes++
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

      urlDeleteButtons.each((_, element) => {
        element.addEventListener("click", buttonDeleteClick)
      })

      checkboxes.each((_, element) => {
        element.addEventListener("click", checkboxClick)
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
    })
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

function checkboxAllClick() {
  if (checkboxAll.is(':checked')) {
    selectedCheckboxes = totalCheckboxes
    totalCheckboxCount.text(totalCheckboxes)
    deleteAll.css("visibility", "visible")
    checkboxes.prop('checked', true)
  } else {
    selectedCheckboxes = 0
    deleteAll.css("visibility", "hidden")
    checkboxes.prop('checked', false)
  }
}

function checkboxClick(e) {
  let selectedCheckbox = e.target
  if (selectedCheckbox.checked) {
    selectedCheckboxes++
    if (selectedCheckboxes == totalCheckboxes) {
      checkboxAll.prop('checked', true)
    }
    deleteAll.css("visibility", "visible")
  } else {
    selectedCheckboxes--
    checkboxAll.prop('checked', false)
    if (selectedCheckboxes == 0) {
      deleteAll.css("visibility", "hidden")
    }
  }
  totalCheckboxCount.text(selectedCheckboxes)
}

function buttonDeleteAllClick() {
  var checkedUrls = []
  var checkedItems = []
  checkboxes.each((_, element) => {
    if (element.checked) {
      checkedUrls.push(element.parentElement.parentElement.dataset.id)
      checkedItems.push(element.parentElement.parentElement)
    }
  })

  swal({
    title: "Are you sure?",
    text: `You will delete all selected URLs!`,
    icon: "warning",
    buttons: ["Oh noez!", "Aww yiss!"],
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        fetch("/a/api/urls/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: checkedUrls,
          }),
        })
          .then((response) => {
            if (response.ok) {
              swal("Poof! Your URL has been deleted!", {
                icon: "success",
                timer: 1500,
                buttons: false,
              }).then(() => {
                checkedItems.forEach((element) => {
                  element.remove()
                })
              })
            } else {
              swal("Oops! Something went wrong!", {
                icon: "error",
                timer: 1500,
                buttons: false,
              })
            }
          })
          .catch(() => {
            swal("Oops! Something went wrong!", {
              icon: "error",
              timer: 1500,
              buttons: false,
            })
          })
      } else {
        swal("Your URL is safe!", {
          timer: 1500,
          buttons: false,
        })
      }
    })
}

function buttonDeleteClick(e) {
  var selectedUrls = []
  var urlId = e.target.parentElement.parentElement.dataset.id
  selectedUrls.push(urlId)
  var urlSlug = e.target.parentElement.previousElementSibling.children[1].children[0].children[1].innerText
  var selectedItem = e.target.parentElement.parentElement

  swal({
    title: "Are you sure?",
    text: `You will delete ${baseUrl}${urlSlug}!`,
    icon: "warning",
    buttons: ["Oh noez!", "Aww yiss!"],
    dangerMode: true,
  })
    .then((willDelete) => {
      if (willDelete) {
        fetch("/a/api/urls/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ids: selectedUrls,
          }),
        })
          .then((response) => {
            if (response.ok) {
              swal("Poof! Your URL has been deleted!", {
                icon: "success",
                timer: 1500,
                buttons: false,
              }).then(() => {
                selectedItem.remove()
              })
            } else {
              swal("Oops! Something went wrong!", {
                icon: "error",
                timer: 1500,
                buttons: false,
              })
            }
          })
          .catch(() => {
            swal("Oops! Something went wrong!", {
              icon: "error",
              timer: 1500,
              buttons: false,
            })
          })
      } else {
        swal("Your URL is safe!", {
          timer: 1500,
          buttons: false,
        })
      }
    })
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

  checkboxAll.change(checkboxAllClick)
  deleteAll.click(buttonDeleteAllClick)
})