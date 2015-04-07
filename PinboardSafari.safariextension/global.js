var _console = safari.extension.globalPage.contentWindow.console;

function performCommand (command) {
  if (command.command === "btn_pinit_clicked") {
    //util.showPopover("popover-add-bookmarks", "btn_pinit");
    var toBookmark = encodeURIComponent(safari.application.activeBrowserWindow.activeTab.url);
    var title = safari.application.activeBrowserWindow.activeTab.title;
    var url = "https://pinboard.in/add?url=" + toBookmark + "&title=" + encodeURIComponent(title);
    var browserWindow = safari.application.activeBrowserWindow;
    browserWindow.openTab().url = url;
  }
}

util.addPopoverToToolbarItem("popover-add-bookmarks", "add-bookmark.html", "btn_pinit", 650, 320);
safari.application.addEventListener("command", performCommand, false);
