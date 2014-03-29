var usersApp = angular.module('usersApp', []);

usersApp.controller('usersController', function ($scope) {

    $scope.bugs = [];

    function resetSelectedBug() {
        $scope.selectedBug = {Status: 'Open', Priority: "High"};
    }

    resetSelectedBug();
    $scope.createUpdateBug = function () {

        $.ajax(
            {
                url: 'createbug',
                type: 'POST',
                contentType: "application/json",
                dataType: 'json',
                data: angular.toJson($scope.selectedBug)
            }
        );
        resetSelectedBug();
    };

    $scope.readBugs = function () {
        $.ajax(
            {
                url: 'allbugs',
                type: 'GET',
                success: function (data) {
                    $scope.bugs = data;
                    $scope.$apply();
                }
            }
        );
    };

    $scope.searchIfOpen = function () {
        return function (bug) {
            if (!$scope.onlyOpen)
                return true;
            else {
                if (bug.Status == 'Open')
                    return true;
            }
        }
    };

    $scope.edit = function (bug) {
        $scope.selectedBug = bug;
        showEdit();
    };

});


