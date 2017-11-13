angular.module('sendSms').component('addSmsAction', {
  require: {
    prmActionCtrl: '^prmActionList',
  },
  controller: ['sendSmsForm', 'smsOptions', function(sendSmsForm, smsOptions) {
    this.$onInit = () => this.addSmsAction(smsOptions.smsAction)
    this.addSmsAction = (action) => {
      let ctrl = this.prmActionCtrl
      let svc = ctrl.actionListService
      let index = Object.keys(svc.requiredActionsList).length
      if (!svc.actionsToIndex[action.name]) { // don't add twice
        // register icon
        ctrl.actionLabelNamesMap[action.name] = action.label
        ctrl.actionIconNamesMap[action.name] = action.name
        ctrl.actionIcons[action.name] = action.icon
        // add action
        svc.requiredActionsList[index] = action.name
        svc.actionsToDisplay.unshift(action.name)
        svc.actionsToIndex[action.name] = index
        svc.onToggle[action.name] = () => sendSmsForm.showForm()
      }
    }
  }],
})
