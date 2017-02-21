(function (angular) {

    class OthelloHandlerService {
        calculateScore(matrix, val) {
            var count = 0;

            for (var i = 1; i < 9; i++) {
                for (var j = 1; j < 9; j++) {
                    if (matrix[i][j] == val)
                        count++;
                }
            }

            return count;
        };

        stepControl(matrix, i, j, id) {

            if (matrix[i][j] == 0) {
                var p2;
                var p1;

                if (id == 1) {
                    p1 = 1;
                    p2 = 2;
                }
                else {
                    p1 = 2;
                    p2 = 1;
                }

                if ((matrix[(i + 1)][j] != p2) &&
                    (matrix[i][(j + 1)] != p2) &&
                    (matrix[(i + 1)][(j + 1)] != p2) &&
                    (matrix[(i - 1)][j] != p2) &&
                    (matrix[i][(j - 1)] != p2) &&
                    (matrix[(i - 1)][(j - 1)] != p2) &&
                    (matrix[(i + 1)][(j - 1)] != p2) &&
                    (matrix[(i - 1)][(j + 1)] != p2)) {
                    return false;
                }

                var x;

                if (matrix[i + 1][j] == p2) {
                    for (x = 2; x < 8; x++) {
                        if ((i + x) > 8)
                            break;

                        if (matrix[i + x][j] == 0)
                            break;

                        if (matrix[i + x][j] == p1)
                            return true;
                    }
                }

                if (matrix[i][j + 1] == p2) {
                    for (x = 2; x < 8; x++) {
                        if ((j + x) > 8)
                            break;

                        if (matrix[i][j + x] == 0)
                            break;

                        if (matrix[i][j + x] == p1)
                            return true;
                    }
                }

                if (matrix[i - 1][j] == p2) {
                    for (x = 2; x < 8; x++) {
                        if (i - x < 1)
                            break;

                        if (matrix[i - x][j] == 0)
                            break;

                        if (matrix[i - x][j] == p1)
                            return true;
                    }
                }

                if (matrix[i][j - 1] == p2) {
                    for (x = 2; x < 8; x++) {
                        if ((j - x) < 1)
                            break;

                        if (matrix[i][j - x] == 0)
                            break;

                        if (matrix[i][j - x] == p1)
                            return true;
                    }
                }

                if (matrix[i + 1][j + 1] == p2) {
                    for (x = 2; x < 8; x++) {
                        if ((i + x) > 8 || (j + x) > 8)
                            break;

                        if (matrix[i + x][j + x] == 0)
                            break;

                        if (matrix[i + x][j + x] == p1)
                            return true;
                    }
                }

                if (matrix[i - 1][j - 1] == p2) {
                    for (x = 2; x < 8; x++) {
                        if ((i - x) < 1 || (j - x) < 1)
                            break;

                        if (matrix[i - x][j - x] == 0)
                            break;

                        if (matrix[i - x][j - x] == p1)
                            return true;
                    }
                }

                if (matrix[i + 1][j - 1] == p2) {
                    for (x = 2; x < 8; x++) {
                        if ((i + x) > 8 || (j - x) < 1)
                            break;

                        if (matrix[i + x][j - x] == 0)
                            break;

                        if (matrix[i + x][j - x] == p1)
                            return true;
                    }
                }

                if (matrix[i - 1][j + 1] == p2) {
                    for (x = 2; x < 8; x++) {
                        if ((i - x) < 1 || (j + x) > 8)
                            break;

                        if (matrix[i - x][j + x] == 0)
                            break;

                        if (matrix[i - x][j + x] == p1)
                            return true;
                    }
                }
            }

            return false;
        };

        stepProcess(matrix, i, j, id) {
            matrix[i][j] = id;

            var p2;
            var p1;

            if (id == 1) {
                p1 = 1;
                p2 = 2;
            }
            else {
                p1 = 2;
                p2 = 1;
            }

            var x;

            if (matrix[i + 1][j] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((i + x) > 8)
                        break;

                    if (matrix[i + x][j] == 0)
                        break;

                    if (matrix[i + x][j] == p1) {
                        x--;
                        while (x > 0) {
                            matrix[i + x][j] = p1;
                            x--;
                        }
                        break;
                    }
                }
            }

            if (matrix[i][j + 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((j + x) > 8)
                        break;

                    if (matrix[i][j + x] == 0)
                        break;

                    if (matrix[i][j + x] == p1) {
                        x--;
                        while (x > 0) {
                            matrix[i][j + x] = p1;
                            x--;
                        }
                        break;
                    }
                }
            }

            if (matrix[i - 1][j] == p2) {
                for (x = 2; x < 8; x++) {
                    if (i - x < 1)
                        break;

                    if (matrix[i - x][j] == 0)
                        break;

                    if (matrix[i - x][j] == p1) {
                        x--;
                        while (x > 0) {
                            matrix[i - x][j] = p1;
                            x--;
                        }
                        break;
                    }
                }
            }

            if (matrix[i][j - 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((j - x) < 1)
                        break;

                    if (matrix[i][j - x] == 0)
                        break;

                    if (matrix[i][j - x] == p1) {
                        x--;
                        while (x > 0) {
                            matrix[i][j - x] = p1;
                            x--;
                        }
                        break;
                    }
                }
            }

            if (matrix[i + 1][j + 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((i + x) > 8 || (j + x) > 8)
                        break;

                    if (matrix[i + x][j + x] == 0)
                        break;

                    if (matrix[i + x][j + x] == p1) {
                        x--;
                        while (x > 0) {
                            matrix[i + x][j + x] = p1;
                            x--;
                        }
                        break;
                    }
                }
            }

            if (matrix[i - 1][j - 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((i - x) < 1 || (j - x) < 1)
                        break;

                    if (matrix[i - x][j - x] == 0)
                        break;

                    if (matrix[i - x][j - x] == p1) {
                        x--;
                        while (x > 0) {
                            matrix[i - x][j - x] = p1;
                            x--;
                        }
                        break;
                    }
                }
            }

            if (matrix[i + 1][j - 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((i + x) > 8 || (j - x) < 1)
                        break;

                    if (matrix[i + x][j - x] == 0)
                        break;

                    if (matrix[i + x][j - x] == p1) {
                        x--;
                        while (x > 0) {
                            matrix[i + x][j - x] = p1;
                            x--;
                        }
                        break;
                    }
                }
            }

            if (matrix[i - 1][j + 1] == p2) {
                for (x = 2; x < 8; x++) {
                    if ((i - x) < 1 || (j + x) > 8)
                        break;

                    if (matrix[i - x][j + x] == 0)
                        break;

                    if (matrix[i - x][j + x] == p1) {
                        x--;
                        while (x > 0) {
                            matrix[i - x][j + x] = p1;
                            x--;
                        }
                        break;
                    }
                }
            }
        };

        getSuggestions(matrix, id) {
            var suggestions = [];
            for (var i = 1; i < 9; i++) {
                for (var j = 1; j < 9; j++) {
                    if (this.stepControl(matrix, i, j, id)) {
                        suggestions.push({
                            x: i,
                            y: j
                        });
                    }
                }
            }
            return suggestions;
        }
    }

    angular.module('othelloApp').service('OthelloHandlerService', OthelloHandlerService);

})(window.angular);