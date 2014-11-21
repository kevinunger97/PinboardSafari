var _console = safari.extension.globalPage.contentWindow.console;
var authToken = "auth_token=losfinkos:6CD9FA811801DB045752";

function loadRecent() {
  $.get("https://api.pinboard.in/v1/posts/recent?" + authToken, function(response) {
    _console.log("response", response);
    var popover = util.getPopoverById("popover_recent");
    var $container = $(popover.contentWindow.document.getElementById("recentBookmarks"));
    var posts = response.getElementsByTagName("post");
    var $ul = $("<ul></ul>");
    for (var i = 0, len = posts.length; i < len; i++) {
      var href = posts[i].getAttribute("href");
      var desc = posts[i].getAttribute("description");
      var link = $("<a href='" + href + "'>" + desc + "</a>");
      $ul.append($("<li></li>").append(link));
    }
    $container.append($ul);
  });
}

function performCommand (command) {
  if (command.command === "btn_pinit_clicked") {
    showRecentBookmarks();
  }
}

function addBookmark(url) {
  var activeWindow = safari.application.activeBrowserWindow;
  var url = activeWindow.activeTab.url;
  // implement me!
}

function showRecentBookmarks() {
  util.showPopover("popover_recent", "btn_pinit");
}

util.addPopoverToToolbarItem("popover_recent", "recent.html", "btn_pinit");
safari.application.addEventListener("command", performCommand, false);
