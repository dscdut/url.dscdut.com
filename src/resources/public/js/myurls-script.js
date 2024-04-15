var baseUrl = window.location.host + "/"

var searchBox = $("#myurls-input-search")
var searchButton = $("#icon-search")

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

var noMore = $("#no-more")

function alertError() {
  swal("Oops! Something went wrong!", {
    icon: "error",
    timer: 1500,
    buttons: false,
  })
}

$.ajax({
  url: "/templates/myurl.ejs",
  success: function (response) {
    template = response
  }
})

function getUrlsApi(searchValue) {
  $.ajax({
    type: "GET",
    url: "/a/api/urls/",
    data: { page: currentPage, search: searchValue },
    success: function (response) {

      if (currentPage == 1)
        urlList.empty()

      urls = response.data

      if (urls.length < limit) {
        hasMore = false
      } else hasMore = true

      urls.forEach(function (url) {
        let html = ejs.render(template, { url: url })
        urlList.append(html)

        loadMore.addClass("hidden")

        totalViewCount += url.totalClick

        urlSlugLink = $("#myurls-item .myurls-url-slug")
        urlEditButtons = $(".fa-edit")
        urlSaveButtons = $(".fa-check-circle")
        urlCancelButtons = $(".fa-times-circle")
        urlCopyButtons = $(".fa-copy")
        urlDeleteButtons = $(".fa-trash-alt")
        urlGenerateQR = $(".fa-qrcode")

        checkboxes = $(".checkbox-item")
        totalCheckboxes++
      })

      totalView.text(totalViewCount)

      if (urls.length > 0) {
        urlSlugLink.each((_, element) => {
          element.addEventListener('click', function (e) {
            let urlTextContent = e.target.parentElement.parentElement.querySelector("#my-url").textContent.trim()
            window.open(urlTextContent, '_blank')
          })
        })

        urlEditButtons.each((_, element) => {
          element.addEventListener("click", buttonEditClick)
        })

        urlSaveButtons.each((_, element) => {
          element.addEventListener("click", buttonSaveClick)
        })

        urlCancelButtons.each((_, element) => {
          element.addEventListener("click", buttonCancelClick)
        })

        urlCopyButtons.each((_, element) => {
          element.addEventListener("click", buttonCopyClick)
        })

        urlDeleteButtons.each((_, element) => {
          element.addEventListener("click", buttonDeleteClick)
        })

        urlGenerateQR.each((_, element) => {
          element.addEventListener("click", buttonGenerateQRClick)
        })

        checkboxes.each((_, element) => {
          element.addEventListener("click", checkboxClick)
        })
      }
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
        swal({
          title: "Edit URL successfully!",
          icon: "success",
          timer: 1500,
          buttons: false,
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

function showAlert(icon = "success", title, message, buttonText, url = null) {
  var contentElement = document.createElement("div");
  contentElement.innerHTML =
    '<b style="font-size: 1.25rem;">' + message + "</b>";

  if (url) {
    var qrElement = document.createElement("div");
    var qrImg = document.createElement("img");
    qrElement.id = "qrcode";
    qrElement.style.width = "200px";
    qrElement.style.height = "200px";
    qrElement.style.margin = "auto";
    qrElement.style.marginTop = "1rem";

    const qrcodeUrl = `https://quickchart.io/qr?text=${url}&centerImageUrl=https://res.cloudinary.com/dddj3wlza/image/upload/v1713155834/gdsc/GDSC_Icon_o1zhsk.png&centerImageSizeRatio=0.5&size=400`
    qrImg.src = qrcodeUrl;
    qrImg.style.width = "100%";
    qrImg.style.height = "100%";
    qrElement.appendChild(qrImg);
  }

  var customContent = document.createElement('div');
  customContent.appendChild(contentElement);
  if (url) { 
    customContent.appendChild(qrElement);
  }

  return swal({
    title,
    icon,
    content: customContent,
    buttons: {
      confirm: {
        text: buttonText,
        value: message,
        visible: true,
        className: ["app-button", icon],
        closeModal: true,
      },
    },
  })
}

function buttonCopyClick(e) {
  var urlItem = e.target.parentElement.parentElement
  var urlSlug = urlItem.querySelector("#my-slug").textContent.trim()
  updateClipboard(baseUrl + urlSlug)
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
                  let currentView = element.querySelector("#my-total-click").textContent.trim()
                  totalViewCount -= currentView
                  totalView.text(totalViewCount)
                  deleteAll.css("visibility", "hidden")
                })
              })
            } else {
              alertError()
            }
          })
          .catch(() => {
            alertError()
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
                selectedCheckboxes--
                totalCheckboxCount.text(selectedCheckboxes)
                checkboxes.each((_, element) => {
                  if (element.parentElement.parentElement.dataset.id == urlId) {
                    checkboxes.splice(element.index, 1)
                    let currentView = element.parentElement.nextElementSibling.querySelector("#my-total-click").textContent.trim()
                    totalViewCount -= currentView
                    totalView.text(totalViewCount)
                    return false
                  }
                })
              })
            } else {
              alertError()
            }
          })
          .catch(() => {
            alertError()
          })
      } else {
        swal("Your URL is safe!", {
          timer: 1500,
          buttons: false,
        })
      }
    })
}

function buttonGenerateQRClick(e) {
  var urlItem = e.target.parentElement.parentElement
  var urlSlug = urlItem.querySelector("#my-slug").textContent.trim()

  var appBaseUrl = window.location.protocol + "//" + window.location.host + "/"
  var url = appBaseUrl + urlSlug
  showAlert("success", "Scan QR code to visit your URL", url)
}

var debounce = function (func, wait, immediate) {
  var timeout
  return function () {
    var context = this, args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    };
    var callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  };
};

isScrolled = false;
$(document).ready(function () {
  getUrlsApi(searchBox.val())

  searchBox.keyup(debounce(function () {
    totalViewCount = 0
    currentPage = 1

    getUrlsApi(searchBox.val())
  }, 500))

  urlList.scroll(function () {
    var toBottom = urlList[0].scrollHeight - urlList.innerHeight() - urlList.scrollTop()

    if (toBottom <= 1 && hasMore && !isScrolled) {
      isScrolled = true
      loadMore.removeClass("hidden")
      currentPage++
      getUrlsApi(searchBox.val())

      setTimeout(() => {
        isScrolled = false;
      }, 1000);
    }
    else if (toBottom <= 1 && !hasMore) {
      noMore.removeClass("hidden")
    } else {
      noMore.addClass("hidden")
    }
  })

  checkboxAll.change(checkboxAllClick)
  deleteAll.click(buttonDeleteAllClick)
})