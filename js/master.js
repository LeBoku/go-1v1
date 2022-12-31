var app = angular.module("Go", []);

var ctrl = app.controller("Go", function ($scope) {
    $scope.fieldSize = 9;
    $scope.autoCount = true;
    $scope.currentPlayer = 1;
    $scope.gameStarted = false;
    $scope.classes = ["emptyField", "whiteField", "blackField"];
    $scope.previewClasses = ["emptyField", "whitePreview", "blackPreview"];
    $scope.fieldStyle = {};
    $scope.rowStyle = {};
    $scope.points = [0, 0, 0];
    $scope.hasPassed = false;

    $scope.model = [];

    initializeModel($scope);

    $scope.changeFieldSize = function () {
        initializeModel($scope);
    }

    $scope.countPoints = function () {
        countPoints($scope);
    }

    $scope.pass = function () {
        var winnerText;

        if ($scope.hasPassed) {
            countPoints($scope);
            if ($scope.points[1] > $scope.points[2]) {
                winnerText = "Weiss hat gewonnen";
            } else if ($scope.points[2] > $scope.points[1]) {
                winnerText = "Schwarz hat gewonnen";

            } else {

                winnerText = "Gleichstand";
            }

            alert(winnerText);
            initializeModel();
        } else {
            $scope.hasPassed = true;
        }
    }

    $scope.toggleStone = function (x, y) {
        if ($scope.model[y][x] == 0) {
            $scope.model[y][x] = $scope.currentPlayer;
            if (checkDotPlacement($scope, [x, y])) {
                $scope.currentPlayer = ($scope.currentPlayer == 1 ? 2 : 1);
            } else {
                $scope.model[y][x] = 0;
            }
        } else {
            $scope.model[y][x] = 0;
        }

        if ($scope.autoCount) {
            countPoints($scope);
        }
    }
})


function initializeModel($scope) {

    $scope.hasPassed = false;
    $scope.model = [];

    for (var y = 0; y < $scope.fieldSize; y++) {
        inner = [];
        for (var x = 0; x < $scope.fieldSize; x++) {
            inner.push(0);
        };

        $scope.model.push(inner);
    };

    $scope.fieldStyle = {
        'width': "calc(100% / " + $scope.fieldSize + ")",
    }
    $scope.rowStyle = {
        'height': "calc(100% / " + $scope.fieldSize + ")"
    }
}
