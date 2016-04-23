(function () {
  'use strict';

  angular.module('tibialotteryApp').controller('LotteryViewController', LotteryViewController);

  LotteryViewController.$inject = ['$stateParams', 'LotteryService'];

  function LotteryViewController($stateParams, LotteryService) {
    var self = this;

    self.lotteryResultList = [];
    self.lotteryFilter = '';
    self.loading = true;
    self.listAssigned = false;
    self.lottery = null;

    LotteryService.getLotteryById($stateParams.lotteryId).then(function success(results) {
      self.loading = false;

      if (results.data.success) {
        self.lottery = results.data.lottery;
        if (self.lottery) {
          self.lottery['Creation Date'] = new Date(parseInt(self.lottery['Creation Date']) * 1000);
          self.lottery['Draw Time'] = new Date(parseInt(self.lottery['Draw Time']) * 1000);
          self.lottery['Drawn Order'] = self.lottery['Drawn Order'].length !== 0 ? unserialize(self.lottery['Drawn Order']) : self.lottery['Drawn Order'];
          self.listAssigned = self.lottery['List Order'].length !== 0;

          if (self.lottery['Drawn Order'].length !== 0) {
            setUpDrawArray();
          }
        }
      } else {
        self.lottery = null;
      }
    }).catch(function error(err) {
      console.error("An error occurred:", err);
    });

    function setUpDrawArray() {
      self.lotteryResultList = [];
      for (var i = 0; i < self.lottery['Drawn Order'].length; i++) {
        self.lotteryResultList.push({
          rank: i+1,
          ticket: self.lottery['Drawn Order'][i],
          player: self.listAssigned ? (self.lottery['List Order'][self.lottery['Drawn Order'][i]-1] || '') : ''
        });
      }
    }
  }
})();
