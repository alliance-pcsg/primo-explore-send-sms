/* eslint-disable max-len */
angular.module('sendSms').factory('customActions', function() {
  return {
    /**
     * Adds an action to the actions menu, including its icon.
     * Will error in console if action already exists.
     * @param  {object} action  action object
     * @param  {object} ctrl    instance of prmActionCtrl
     */
     // TODO coerce action.index to be <= requiredActionsList.length
    addAction: function(action, ctrl) {
      if (!this.actionExists(action, ctrl)) {
        this.addActionIcon(action, ctrl)
        ctrl.actionListService.requiredActionsList.splice(action.index, 0, action.name)
        ctrl.actionListService.actionsToIndex[action.name] = action.index
        ctrl.actionListService.onToggle[action.name] = action.onToggle
        ctrl.actionListService.actionsToDisplay.unshift(action.name)
      } else console.error('Action already exists: ', action)
    },
    /**
     * Removes an action from the actions menu, including its icon.
     * Will error in console if action doesn't exist.
     * @param  {object} action  action object
     * @param  {object} ctrl    instance of prmActionCtrl
     */
    removeAction: function(action, ctrl) {
      if (this.actionExists(action, ctrl)) {
        this.removeActionIcon(action, ctrl)
        delete ctrl.actionListService.actionsToIndex[action.name]
        delete ctrl.actionListService.onToggle[action.name]
        let i = ctrl.actionListService.actionsToDisplay.indexOf(action.name)
        ctrl.actionListService.actionsToDisplay.splice(i, 1)
        i = ctrl.actionListService.requiredActionsList.indexOf(action.name)
        ctrl.actionListService.requiredActionsList.splice(i, 1)
      } else console.error('Action does not exist: ', action)
    },
    /**
     * Registers an action's icon.
     * Called internally by addAction().
     * @param  {object} action  action object
     * @param  {object} ctrl    instance of prmActionCtrl
     */
    addActionIcon: function(action, ctrl) {
      ctrl.actionLabelNamesMap[action.name] = action.label
      ctrl.actionIconNamesMap[action.name] = action.name
      ctrl.actionIcons[action.name] = action.icon
    },
    /**
     * Deregisters an action's icon.
     * Called internally by removeAction().
     * @param  {object} action  action object
     * @param  {object} ctrl    instance of prmActionCtrl
     */
    removeActionIcon: function(action, ctrl) {
      delete ctrl.actionLabelNamesMap[action.name]
      delete ctrl.actionIconNamesMap[action.name]
      delete ctrl.actionIcons[action.name]
    },
    /**
     * Check if an action exists.
     * Returns true if action is part of actionsToIndex.
     * @param  {object} action  action object
     * @param  {object} ctrl    instance of prmActionCtrl
     * @return {bool}
     */
    actionExists: function(action, ctrl) {
      return ctrl.actionListService.actionsToIndex.hasOwnProperty(action.name)
    },
  }
})
