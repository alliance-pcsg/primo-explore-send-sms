angular.module('sendSms').value('smsOptions', {
  smsAction: {
    name: 'send_sms',
    label: 'SMS',
    index: 9,
    icon: {
      icon: 'ic_smartphone_24px',
      iconSet: 'hardware',
      type: 'svg',
    },
  },
  smsCarriers: {
    'ATT': 'txt.att.net',
    'T-Mobile': 'tmomail.net',
    'Virgin': 'vmobl.com',
    'Sprint': 'messaging.sprintpcs.com',
    'Nextel': 'messaging.nextel.com',
    'Verizon': 'vtext.com',
    'Cricket': 'mms.mycricket.com',
    'Qwest': 'qwestmp.com',
    'Project Fi': 'msg.fi.google.com',
  },
})
