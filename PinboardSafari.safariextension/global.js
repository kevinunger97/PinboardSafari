var _console = safari.extension.globalPage.contentWindow.console;
var authToken = "put your Pinboard auth token here";

function loadRecent(_document) {
  $.get("https://api.pinboard.in/v1/posts/recent?" + authToken, function(response) {
    _console.log("response", response);
    var $container = $(_document.getElementById("recentBookmarks"));
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
    // addBookmark();
    util.showPopover("popover-add-bookmarks", "btn_pinit");
  }
}

function showRecentBookmarks() {
  util.showPopover("popover_recent", "btn_pinit");
}

// util.addPopoverToToolbarItem("popover_recent", "recent.html", "btn_pinit");
util.addPopoverToToolbarItem("popover-add-bookmarks", "add-bookmark.html", "btn_pinit", 650, 320);
safari.application.addEventListener("command", performCommand, false);
