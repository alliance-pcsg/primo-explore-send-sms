describe('addSmsAction component', function() {
  var $componentController,
      $mdDialog,
      smsOptions,
      sendSmsService,
      sendSmsForm,
      prmActionCtrl

  beforeEach(function() {
    module('sendSms')
    inject(function(_$componentController_, _$mdDialog_, _smsOptions_, _sendSmsService_, _sendSmsForm_) {
      $componentController = _$componentController_
      $mdDialog = _$mdDialog_
      smsOptions = _smsOptions_
      sendSmsService = _sendSmsService_
      sendSmsForm = _sendSmsForm_
    })
    // mock prmActionCtrl
    prmActionCtrl = {
      actionLabelNamesMap: [],
      actionIconNamesMap: [],
      actionIcons: [],
      actionListService: {
        requiredActionsList: ['email', 'permalink'],
        actionsToIndex: { 'email': 1, 'permalink': 2 },
        actionsToDisplay: ['email', 'permalink'],
        onToggle: [],
      }
    }
  })

  it('should register the sms action icon', function() {
    var action = smsOptions.smsAction
    var $ctrl = $componentController('addSmsAction')
    $ctrl.prmActionCtrl = prmActionCtrl
    $ctrl.$onInit()
    expect(prmActionCtrl.actionLabelNamesMap[action.name]).toEqual(action.label)
    expect(prmActionCtrl.actionIconNamesMap[action.name]).toEqual(action.name)
    expect(prmActionCtrl.actionIcons[action.name]).toEqual(action.icon)
  })

  it('should add the sms action to the actions menu', function() {
    var action = smsOptions.smsAction
    var $ctrl = $componentController('addSmsAction')
    $ctrl.prmActionCtrl = prmActionCtrl
    $ctrl.$onInit()
    expect(prmActionCtrl.actionListService.requiredActionsList).toContain(action.name)
    expect(prmActionCtrl.actionListService.actionsToDisplay).toContain(action.name)
    expect(prmActionCtrl.actionListService.actionsToIndex[action.name]).toEqual(jasmine.any(Number))
    expect(prmActionCtrl.actionListService.onToggle[action.name]).toEqual(jasmine.any(Function))
  })

  it('should add the sms action to the actions menu only once', function() {
    var action = smsOptions.smsAction
    var $ctrl = $componentController('addSmsAction')
    $ctrl.prmActionCtrl = prmActionCtrl
    $ctrl.$onInit()
    $ctrl.$onInit()
    expect(prmActionCtrl.actionListService.requiredActionsList.length).toBe(3)
  })

  it('should allow customizing the sms action', function() {
    var action = {
      name: 'send_text',
      label: 'Text me',
      icon: {
        icon: 'ic_report_problem_24px',
        iconSet: 'action',
        type: 'svg',
      },
    }
    smsOptions.smsAction = action
    var $ctrl = $componentController('addSmsAction')
    $ctrl.prmActionCtrl = prmActionCtrl
    $ctrl.$onInit()
    expect(prmActionCtrl.actionLabelNamesMap[action.name]).toEqual(action.label)
    expect(prmActionCtrl.actionIconNamesMap[action.name]).toEqual(action.name)
    expect(prmActionCtrl.actionIcons[action.name]).toEqual(action.icon)
    expect(prmActionCtrl.actionListService.requiredActionsList).toContain(action.name)
    expect(prmActionCtrl.actionListService.actionsToDisplay).toContain(action.name)
  })
})
