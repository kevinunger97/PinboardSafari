var _console = safari.extension.globalPage.contentWindow.console;

function performCommand (command) {
  if (command.command === "btn_pinit_clicked") {
    util.showPopover("popover-add-bookmarks", "btn_pinit");
  }
}

util.addPopoverToToolbarItem("popover-add-bookmarks", "add-bookmark.html", "btn_pinit", 650, 320);
safari.application.addEventListener("command", performCommand, false);
