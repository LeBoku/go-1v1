function countPoints($scope) {
    var x = 0;
    var y = 0;
    var testedDots = [];
    var points = [0, 0, 0];
    var group;

    angular.forEach($scope.model, function (row) {
        x = 0;
        angular.forEach(row, function (field) {
            if (!isDotInGroup(testedDots, [x, y])) {
                group = findDotGroup($scope, [x, y]);
                testedDots.push.apply(testedDots, group);
                pointsFor = field;

                if (field == 0) {
                    pointsFor = isSurroundedBy($scope, group);
                }

                points[pointsFor] += group.length;
            }
            x++;
        })
        y++;
    })

    $scope.points = points;
}

function isSurroundedBy($scope, group) {
    var adjecents;
    var curColor;
    var surroundingColor = -1;

    angular.forEach(group, function (groupDot) {
        adjecents = findAdjecentDots(groupDot);
        if (surroundingColor != 0) {
            angular.forEach(adjecents, function (dot) {
                if (surroundingColor != 0) {
                    curColor = getDotColor($scope, dot, -1);
                    if (curColor > 0) {
                        if (surroundingColor == -1 || curColor == surroundingColor) {
                            surroundingColor = curColor;
                        } else {
                            surroundingColor = 0;
                        }
                    }
                }
            });
        }
    });

    return surroundingColor;
}
