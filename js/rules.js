var komiDot = [-1, -1];

function checkDotPlacement($scope, curDot) {
    var group;
    var curDotColor;
    var isValid = true;

    if ((curDot[0] === komiDot[0]) && (curDot[1] === komiDot[1])) {
        isValid = false;
    } else {
        komiDot = [-1, -1];
        angular.forEach(findAdjecentDots(curDot), function (dot) {
            curDotColor = getDotColor($scope, dot);
            if (!((curDotColor == $scope.currentPlayer) || (curDotColor == 0))) {
                group = findDotGroup($scope, dot);
                if (IsGroupSurounded($scope, group)) {
                    if (group.length == 1) {
                        komiDot = group[0];
                    }
                    removeGroup($scope, group);
                }
            }
        });

        if (IsGroupSurounded($scope, findDotGroup($scope, curDot))) {
            isValid = false;
        }
    }
    return isValid;
}

function findAdjecentDots(dot) {
    var dots = [];

    dots.push([dot[0] - 1, dot[1]]);
    dots.push([dot[0] + 1, dot[1]]);
    dots.push([dot[0], dot[1] - 1]);
    dots.push([dot[0], dot[1] + 1]);
    return dots;
}

function findDotGroup($scope, dot) {
    var group = [];
    var dotsToTest = [dot];
    var curDot;
    var groupColor = getDotColor($scope, dot);


    do {
        curDot = dotsToTest[0];
        if ((getDotColor($scope, curDot, -1) == groupColor) && (!isDotInGroup(group, curDot))) {
            group.push(curDot);
            dotsToTest.push.apply(dotsToTest, findAdjecentDots(curDot));
        }
        dotsToTest.splice(0, 1)
    } while (dotsToTest.length > 0);
    return group;
}

function IsGroupSurounded($scope, group) {
    var adjecents;
    var isSurrounded = true;
    var surroundingColor = (getDotColor($scope, group[0]) == 1 ? 2 : 1);

    angular.forEach(group, function (groupDot) {
        if (isSurrounded) {
            adjecents = findAdjecentDots(groupDot);
            angular.forEach(adjecents, function (dot) {
                if (getDotColor($scope, dot, surroundingColor) == 0) {
                    isSurrounded = false;
                }
            });
        }
    });
    return isSurrounded;
}

function removeGroup($scope, group) {
    angular.forEach(group, function (dot) {
        $scope.model[dot[1]][dot[0]] = 0;
    });
}

function isDotInGroup(group, dot) {
    var isContained = false;
    angular.forEach(group, function (val) {
        if (val[0] == dot[0] && val[1] == dot[1]) {
            isContained = true;
        }
    });
    return isContained;
}

function getDotColor($scope, dot, borderEquals) {
    borderEquals = defaultParam(borderEquals, 0);

    var color;
    if (!(dot[0] >= 0 && dot[0] < $scope.fieldSize) || !(dot[1] >= 0 && dot[1] < $scope.fieldSize)) {
        color = borderEquals;
    } else {
        color = $scope.model[dot[1]][dot[0]];
    }
    return color;
}

function defaultParam(param, defaultVal) {
    return (typeof param !== 'undefined' ? param : defaultVal)
}
