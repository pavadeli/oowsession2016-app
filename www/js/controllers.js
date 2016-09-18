angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, employeeVotes) {
    $scope.options = {
      chart: {
        type: 'pieChart',
        height: 300,
        x: function (d) { return d.name; },
        y: function (d) { return d.votes || 0; },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
      }
    };

    $scope.data = employeeVotes;

    $scope.onready = function (scope) {
      $scope.api = scope.api;
    }

    $scope.$on('$ionicView.enter', function () {
      $scope.api.refresh();
    });
  })

  .controller('VotesCtrl', function ($scope, employeeVotes) {
    $scope.options = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function (d) { return d.name; },
        y: function (d) { return d.votes || 0; },
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
      }
    };

    $scope.data = employeeVotes;

    $scope.onready = function (scope) {
      $scope.api = scope.api;
    }

    $scope.$on('$ionicView.enter', function () {
      $scope.api.refresh();
    });
  })

  .controller('EmployeesCtrl', function ($scope, employeeVotes) {
    $scope.employees = employeeVotes;
  })

  .controller('EmployeeDetailCtrl', function ($scope, $stateParams, Employee, $ionicLoading, $ionicPopup) {
    $scope.employee = Employee.get({ id: $stateParams.employeeId });
    $ionicLoading.show();
    $scope.employee.$promise
      .catch(function () { $ionicPopup.alert({ title: 'Error', template: 'Could not load employee information, please try again' }); })
      .finally(function () { $ionicLoading.hide(); });
  })

  .controller('VoteCtrl', function ($scope, employeeVotes, vote) {
    $scope.employees = employeeVotes;
    $scope.vote = vote;
  });
