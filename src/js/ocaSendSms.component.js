/* eslint-disable max-len */
angular.module('sendSms').component('ocaSendSms', {
  bindings: {
    item: '<',
    finishedSmsEvent: '&',
  },
  template: `
  <div class="send-actions-content-item" layout="row">
      <md-content layout-wrap layout-padding layout-fill>
          <form name="smsForm" novalidate layout="column" layout-align="center center" (submit)="$ctrl.sendSms($event);">
              <div layout="row" class="layout-full-width" layout-align="center center">
                  <div flex="20" flex-sm="10" hide-xs></div>
                  <div class="form-focus service-form" layout-padding flex>
                      <div layout-margin>
                          <div layout="column">
                              <h4 class="md-subhead">Standard message and data rates may apply.</h4>
                              <md-input-container class="underlined-input md-required"><label>Phone number:</label>
                                  <input ng-model="$ctrl.phoneNumber" name="phoneNumber" type="text" required ng-pattern="::$ctrl.telRegEx">
                                  <div ng-messages="smsForm.phoneNumber.$error">
                                      <div ng-message="pattern, required ">phone number is invalid</div>
                                  </div>
                              </md-input-container>
                              <md-input-container class="md-required"><label>Carrier:</label>
                                <md-select ng-model="$ctrl.carrier" name="carrier" placeholder="Select a carrier" required>
                                  <md-option ng-repeat="(carrier, address) in carriers" value="{{ address }}">
                                    {{ carrier }}
                                  </md-option>
                                </md-select>
                                <div ng-messages="smsForm.carrier.$error">
                                    <div ng-message="required">please select a carrier</div>
                                </div>
                              </md-input-container>
                              <md-input-container class="underlined-input" ng-if="$ctrl.isCaptcha">
                                  <div vc-recaptcha key="$ctrl.getCaptchaPublicKey()" on-success="$ctrl.setResponse(response)"></div>
                                  <span class="recaptcha-error-info" ng-show="smsForm.$submitted && (smsForm.recaptchaResponse.$invalid || smsForm.$error.recaptcha.length)">
                                    <span translate="captcha.notselected"></span>
                                  </span>
                              </md-input-container>
                          </div>
                      </div>
                  </div>
                  <div flex="20" flex-sm="10" hide-xs></div>
              </div>
              <div layout="row">
                  <div layout="row" layout-align="center" layout-fill>
                      <md-button type="submit" class="button-with-icon button-large button-confirm" aria-label="Send the result by SMS">
                          <prm-icon icon-type="svg" svg-icon-set="primo-ui" icon-definition="send"></prm-icon><span translate="email.popup.link.send"></span></md-button>
                  </div>
              </div>
          </form>
      </md-content>
  </div>
  <prm-send-email ng-hide="true"></prm-send-email>
  <oca-send-sms-after parent-ctrl="$ctrl"></oca-send-sms-after>`,
  controller: ['$scope', 'smsOptions', function($scope, smsOptions) {
    this.$onInit = () => {
      $scope.$watch('$$childTail.$ctrl', (ctrl) => this.sendEmailService = ctrl.sendEmailService)
      $scope.carriers = smsOptions.smsCarriers
      this.carrier = this.phoneNumber = ''
      this.telRegEx = /^\d{3}( |-)?\d{3}( |-)?\d{4}$/
    }
    this.validate = () => this.telRegEx.test(this.phoneNumber) && this.carrier
    this.isCaptcha = () => window.appConfig['system-configuration']['Activate Captcha [Y/N]'] == 'Y'
    this.getCaptchaPublicKey = () => window.appConfig['system-configuration']['Public Captcha Key']
    this.setResponse = (response) => this.gCaptchaResponse = response
    this.sendSms = () => {
      if (this.validate()) {
        this.sendEmailService.sendEmail(
          [this.phoneNumber + '@' + this.carrier], // addresses
          '', // subject
          '', // note
          [this.item], // items
          this.gCaptchaResponse // captcha
        ).then((msg) => console.log('sms successfully sent', msg))
        .catch((err) => console.error('sms sending failed', err))
        .finally(() => this.finishedSmsEvent())
      }
    }
  }],
}).run(['$templateCache', 'smsOptions', function($templateCache, smsOptions) {
  $templateCache.put('components/search/actions/actionContainer/action-container.html', `
  <oca-send-sms ng-if="($ctrl.actionName==='${smsOptions.smsAction.name}')" finished-sms-event="$ctrl.throwCloseTabsEvent()" item="::$ctrl.item"></oca-send-sms>
  <prm-send-email ng-if="($ctrl.actionName==='E-mail')" (finished-email-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [toggleform]="::$ctrl.toggleActionCotent" [user]="::''"></prm-send-email>
  <prm-citation ng-if="($ctrl.actionName==='Citation')" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-citation>
  <prm-permalink ng-if="($ctrl.actionName==='Permalink')" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-permalink>
  <prm-print-item ng-if="($ctrl.actionName==='Print')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-print-item>
  <prm-endnote ng-if="($ctrl.actionName==='EndNote')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-endnote>
  <prm-easybib ng-if="($ctrl.actionName==='EasyBib')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-easybib>
  <prm-refworks ng-if="($ctrl.actionName==='RefWorks')" (close-tabs-event)="$ctrl.throwCloseTabsEvent()" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-refworks>
  <prm-export-ris ng-if="($ctrl.actionName==='RISPushTo')" [item]="::$ctrl.item" [on-toggle]="::$ctrl.onToggle"></prm-export-ris>
  <prm-action-container-after parent-ctrl="$ctrl"></prm-action-container-after>`)
}])
