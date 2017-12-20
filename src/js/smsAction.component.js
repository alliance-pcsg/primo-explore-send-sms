/* eslint-disable max-len */
angular.module('sendSms').component('smsAction', {
  require: {
    prmActionCtrl: '^prmActionList',
  },
  controller: ['customActions', 'smsOptions',
  function(customActions, smsOptions) {
    this.$onInit = () => customActions.addAction(smsOptions.smsAction, this.prmActionCtrl)
    this.$onDestroy = () => customActions.removeAction(smsOptions.smsAction, this.prmActionCtrl)
  }],
})
