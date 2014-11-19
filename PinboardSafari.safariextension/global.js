var _console = safari.extension.globalPage.contentWindow.console;
var authToken = "auth_token=losfinkos:6CD9FA811801DB045752";

function doAjax(url, onSuccess) {
  var xmlhttp;
  xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 ) {
      if(xmlhttp.status == 200){
        onSuccess(xmlhttp.responseText);
      } else if(xmlhttp.status == 400) {
        alert('There was an error 400')
      } else {
        alert('something else other than 200 was returned')
      }
    }
  }

  xmlhttp.open("GET", url + "?" + authToken, true);
  xmlhttp.send();
}

function loadRecent() {
  doAjax("https://api.pinboard.in/v1/posts/recent", function(response) {
    var container = safari.extension.popovers[0].contentWindow.document.getElementById("recentBookmarks")
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(response,"text/xml");
    var posts = xmlDoc.getElementsByTagName("post");
    var ul = document.createElement("ul");
    for (var i = 0, len = posts.length; i < len; i++) {
      var href = posts[i].getAttribute("href");
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.setAttribute("href", href);
      link.appendChild(document.createTextNode(href));
      li.appendChild(link);
      ul.appendChild(li);
    }
    container.appendChild(ul);
  });
}

function performCommand (command) {
  if (command.command === "btn_pinit_clicked") {
    addBookmark();
  }
}

function addBookmark(url) {
  var activeWindow = safari.application.activeBrowserWindow;
  var url = activeWindow.activeTab.url;

  myPop = safari.extension.createPopover(
    "myPopoverID",
    safari.extension.baseURI + "recent.html");

  safari.extension.toolbarItems[0].popover = myPop;
  safari.extension.toolbarItems[0].showPopover();
}

safari.application.addEventListener("command", performCommand, false);
