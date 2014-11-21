var util = {
  getToolbarItemById: function(toolbarItemId) {
    return safari.extension.toolbarItems.filter(function (tbi) {
      return tbi.identifier == toolbarItemId && tbi.browserWindow == safari.application.activeBrowserWindow;
    })[0];
  },
  getPopoverById: function(popoverId) {
    return safari.extension.popovers.filter(function (po) {
      return po.identifier == popoverId;
    })[0];
  },
  showPopover: function (popoverId, toolbarItemId) {
    var toolbarItem = this.getToolbarItemById(toolbarItemId);
    toolbarItem.popover = this.getPopoverById(popoverId);
    toolbarItem.showPopover();
  },
  addPopoverToToolbarItem: function (popoverId, page, tbitemid) {
    var toolbaritem = util.getToolbarItemById(tbitemid)
    toolbaritem.popover = safari.extension.createPopover(popoverId, safari.extension.baseURI + page);
  }
};
