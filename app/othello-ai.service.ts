import { Injectable } from 'angular-ts-decorators';

@Injectable('OthelloAIService')
export class OthelloAIService {

    private othelloHandlerService;

    /**
     * @param {OthelloHandlerService} OthelloHandlerService
     */
    constructor(OthelloHandlerService) {
        this.othelloHandlerService = OthelloHandlerService;
    }

    private checkEdges(matrix: number[][], id: number): Coord | null {

        if (this.othelloHandlerService.stepControl(matrix, 1, 8, id)) {
            return { x: 1, y: 8};
        }
        else if (this.othelloHandlerService.stepControl(matrix, 8, 1, id)) {
            return { x: 8, y: 1};
        }
        else if (this.othelloHandlerService.stepControl(matrix, 1, 1, id)) {
            return { x: 1, y: 1};
        }
        else if (this.othelloHandlerService.stepControl(matrix, 8, 8, id)) {
            return { x: 8, y: 8};
        } else {
            return null;
        }
    }

    calculateMove(matrix: number[][], id: number): Coord {

        let edgeCoords = this.checkEdges(matrix, id);
        if (edgeCoords) {
            return edgeCoords;
        }

        let coords: Coord = { x: 0, y: 0};

        let p1: number, p2: number;

        if (id == 1) {
            p1 = 1;
            p2 = 2;
        }
        else {
            p1 = 2;
            p2 = 1;
        }

        let count = 0;
        for (let n = 1; n <= 8; n = (n + 1)) {
            for (let m = 1; m <= 8; m = (m + 1)) {
                if (this.othelloHandlerService.stepControl(matrix, n, m, id)) {
                    count = (count + 1);
                }
            }
        }

        let moves: CoordScore[] = [];

        let k = 0;
        let directionScore: number[] = [];

        for (let m = 1; m <= 8; m = (m + 1)) {
            for (let n = 1; n <= 8; n = (n + 1)) {
                if (this.othelloHandlerService.stepControl(matrix, m, n, id)) {
                    moves[k] = {
                        x: m,
                        y: n,
                        score: 0
                    };
                    k = (k + 1);
                }
            }
        }

        for (k = 0; k < count; k++) {
            directionScore[1] = 0;
            directionScore[2] = 0;
            directionScore[3] = 0;
            directionScore[4] = 0;
            directionScore[5] = 0;
            directionScore[6] = 0;
            directionScore[7] = 0;
            directionScore[8] = 0;

            // 1
            for (let idx = 1; idx < 8; idx++) {
                if ((moves[k].x + idx) > 9)
                    break;

                if (matrix[(moves[k].x + idx)][moves[k].y] == 0) {
                    directionScore[1] = 0;
                    break;
                }

                if (matrix[(moves[k].x + idx)][moves[k].y] == p2) {
                    directionScore[1]++;

                    if (matrix[(moves[k].x + idx + 1)][moves[k].y] == p1)
                        break;
                }
            }
            moves[k].score += directionScore[1];

            // 2
            for (let idx = 1; idx < 8; idx++) {
                if ((moves[k].y + idx) > 9)
                    break;

                if (matrix[(moves[k].x)][moves[k].y + idx] == 0) {
                    directionScore[2] = 0;
                    break;
                }

                if (matrix[(moves[k].x)][moves[k].y + idx] == p2) {
                    directionScore[2]++;

                    if (matrix[(moves[k].x)][moves[k].y + idx + 1] == p1)
                        break;
                }
            }
            moves[k].score += directionScore[2];

            // 3
            for (let idx = 1; idx < 8; idx++) {
                if ((moves[k].y - idx) < 0)
                    break;

                if (matrix[(moves[k].x)][moves[k].y - idx] == 0) {
                    directionScore[3] = 0;
                    break;
                }

                if (matrix[(moves[k].x)][moves[k].y - idx] == p2) {
                    directionScore[3]++;

                    if (matrix[(moves[k].x)][moves[k].y - idx - 1] == p1)
                        break;
                }
            }
            moves[k].score += directionScore[3];

            // 4
            for (let idx = 1; idx < 8; idx++) {
                if ((moves[k].x - idx) < 0)
                    break;

                if (matrix[(moves[k].x) - idx][moves[k].y] == 0) {
                    directionScore[4] = 0;
                    break;
                }

                if (matrix[(moves[k].x) - idx][moves[k].y] == p2) {
                    directionScore[4]++;

                    if (matrix[(moves[k].x) - idx - 1][moves[k].y] == p1)
                        break;
                }
            }
            moves[k].score += directionScore[4];

            // 5
            for (let idx = 1; idx < 8; idx++) {
                if ((moves[k].x + idx) > 9 || (moves[k].y + idx) > 9)
                    break;

                if (matrix[(moves[k].x) + idx][moves[k].y + idx] == 0) {
                    directionScore[5] = 0;
                    break;
                }

                if (matrix[(moves[k].x) + idx][moves[k].y + idx] == p2) {
                    directionScore[5]++;

                    if (matrix[(moves[k].x) + idx + 1][moves[k].y + idx + 1] == p1)
                        break;
                }
            }
            moves[k].score += directionScore[5];

            // 6
            for (let idx = 1; idx < 8; idx++) {
                if ((moves[k].x - idx) < 0 || (moves[k].y - idx) < 0)
                    break;

                if (matrix[moves[k].x - idx][moves[k].y - idx] == 0) {
                    directionScore[6] = 0;
                    break;
                }

                if (matrix[(moves[k].x) - idx][moves[k].y - idx] == p2) {
                    directionScore[6]++;

                    if (matrix[moves[k].x - idx - 1][moves[k].y - idx - 1] == p1)
                        break;
                }
            }
            moves[k].score += directionScore[6];

            // 7
            for (let idx = 1; idx < 8; idx++) {
                if ((moves[k].x + idx) > 9 || (moves[k].y - idx) < 0)
                    break;

                if (matrix[(moves[k].x) + idx][moves[k].y - idx] == 0) {
                    directionScore[7] = 0;
                    break;
                }

                if (matrix[(moves[k].x) + idx][moves[k].y - idx] == p2) {
                    directionScore[7]++;

                    if (matrix[(moves[k].x) + idx + 1][moves[k].y - idx - 1] == p1)
                        break;
                }
            }
            moves[k].score += directionScore[7];

            // 8
            for (let idx = 1; idx < 8; idx++) {
                if ((moves[k].x - idx) < 0 || (moves[k].y + idx) > 9)
                    break;

                if (matrix[(moves[k].x) - idx][moves[k].y + idx] == 0) {
                    directionScore[8] = 0;
                    break;
                }

                if (matrix[(moves[k].x) - idx][moves[k].y + idx] == p2) {
                    directionScore[8]++;

                    if (matrix[(moves[k].x) - idx - 1][moves[k].y + idx + 1] == p1)
                        break;
                }
            }

            moves[k].score += directionScore[8];
        }

        let max_k = 0;

        for (let k = 0; k < count; k = (k + 1)) {
            if ((moves[k].x == 1) ||
                (moves[k].x == 8) ||
                (moves[k].y == 1) ||
                (moves[k].y == 8)) {
                moves[k].score += 100;
            }
            else if ((moves[k].x == 2) ||
                (moves[k].x == 7) ||
                (moves[k].y == 2) ||
                (moves[k].y == 7)) {
                moves[k].score -= 100;
                if (((moves[k].x == 2) && (moves[k].y == 2)) ||
                    ((moves[k].x == 2) && (moves[k].y == 7)) ||
                    ((moves[k].x == 7) && (moves[k].y == 2)) ||
                    ((moves[k].x == 7) && (moves[k].y == 7)))
                    moves[k].score -= 50;
            }

            if (moves[k].score > moves[max_k].score) {
                max_k = k;
            }
        }

        coords.x = moves[max_k].x;
        coords.y = moves[max_k].y;

        return coords;
    };
}
