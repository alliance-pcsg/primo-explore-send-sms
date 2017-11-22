/* eslint-disable max-len */
angular.module('sendSms').component('addSmsAction', {
  require: {
    prmActionCtrl: '^prmActionList',
  },
  controller: ['customActions', 'smsOptions',
  function(customActions, smsOptions) {
    this.$onInit = () => {
      if (!customActions.actionExists(smsOptions.smsAction, this.prmActionCtrl)) {
        customActions.addAction(smsOptions.smsAction, this.prmActionCtrl)
      }
    }
    this.$onDestroy = () => {
      if (customActions.actionExists(smsOptions.smsAction, this.prmActionCtrl)) {
        customActions.removeAction(smsOptions.smsAction, this.prmActionCtrl)
      }
    }
  }],
})
