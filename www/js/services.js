angular.module('starter.services', [])

  .constant('baseUrl', 'https://data-api-lucasjellema.apaas.em2.oraclecloud.com/employee-api')
  // .constant('baseUrl', 'http://localhost:8080')

  .factory('Employee', function (baseUrl, $http, $resource) {
    return $resource(baseUrl + '/employees/:id');
  })

  .factory('vote', function (baseUrl, $http, $ionicLoading, $ionicPopup) {
    return function vote(id) {
      $ionicLoading.show();
      return $http.post(baseUrl + '/employees/' + id + '/vote')
        .then(function () { $ionicPopup.alert({ title: 'Success', template: 'Vote received, please wait a few seconds for the vote to be processed.', }); })
        .catch(function () { $ionicPopup.alert({ title: 'Error', template: 'Could not process the vote, please try again' }) })
        .finally(function () { $ionicLoading.hide(); });
    };
  })

  .factory('employeeVotes', function ($rootScope, baseUrl, Employee) {
    var votes = Employee.query();

    function findEmployee(id) {
      for (var i = 0; i < votes.length; ++i) {
        if (votes[i].id === id) {
          return votes[i];
        }
      }
    }

    votes.$promise.then(function () {
      var source = new EventSource(baseUrl + '/employees/updates');
      source.addEventListener('message', function (msg) {
        var data = JSON.parse(msg.data);
        data.forEach(function (update) {
          var emp = findEmployee(update.id);
          if (emp) {
            emp.votes = update.votes;
          } else {
            votes.push(update);
          }
        });
        $rootScope.$apply();
      });
    });
    return votes;
  });

