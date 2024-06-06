var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteURL");
var visitBtn = document.getElementById("visitBtn");
var clearBtn = document.getElementById("clearBtn")

var bookmarkList;
var globalIndex;

if (localStorage.getItem("bookmarkList")) {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
    display(bookmarkList)
}
else {
    bookmarkList = [];
}

function addBookmark() {
    var bookmark = {
        name: siteName.value,
        url: siteUrl.value,
    }
    bookmarkList.push(bookmark);
    display(bookmarkList);
    clearInputs();
    setToLocalStorage();
    openLink();
}

function display(bookmarkList) {
    var cartoona = ``;
    for (var i = 0; i < bookmarkList.length; i++) {
        index = i + 1;
        cartoona += `
                <tr>
                    <td>${index}</td>
                    <td>${bookmarkList[i].name}</td>
                    <td>
                        <button onclick="visit(${i})" class="btn btn-success id="visitBtn">
                            <i class="fa-solid fa-eye pe-1"></i>
                            Visit</button>
                    </td>
                    <td>
                        <button onclick="clearRow(${i})" class="btn btn-danger id="clearBtn">
                            <i class="fa-solid fa-trash-can pe-1"></i>
                            Delete</button>
                    </td>
                </tr>
        `
    }
    document.getElementById("bookmark-content").innerHTML = cartoona;
}

function visit(index) {
    window.location.href = bookmarkList[index].url;
    display(bookmarkList)
    setToLocalStorage()
}

function clearRow(index) {
    bookmarkList.splice(index, 1);
    display(bookmarkList)
    setToLocalStorage()
    globalIndex = index;
}

function clearInputs() {
    siteName.value = null;
    siteUrl.value = null;
}

function setToLocalStorage() {
    localStorage.setItem("bookmarkList", JSON.stringify(bookmarkList));
}

// function isValidURL(url) {
//     const pattern = /^(https?:\/\/)[^\s$.?#].[^\s]*$/;
//     return pattern.test(url);
// }
// function openLink() {
//     const url = bookmarkList.url;

//     if (isValidURL(url)) {
//         window.location.href = url;
//     } else {
//         alert('The URL is not valid: ' + url);
//     }
// }
