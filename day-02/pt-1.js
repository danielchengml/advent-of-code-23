/**
 * Determine which games would have been possible if the bag had been 
 * loaded with only 12 red cubes, 13 green cubes, and 14 blue cubes. 
 * What is the sum of the IDs of those games?
 * 
 * Game 1:   3 blue, 4 red;
 *           1 red, 2 green, 6 blue;
 *           2 green
 * Game 2:   1 blue, 2 green;
 *           3 green, 4 blue, 1 red;
 *           1 green, 1 blue
 * Game 3:   8 green, 6 blue, 20 red;
 *           5 blue, 4 red, 13 green;
 *           5 green, 1 red
 * Game 4:   1 green, 3 red, 6 blue;
 *           3 green, 6 red;
 *           3 green, 15 blue, 14 red
 * Game 5:   6 red, 1 blue, 3 green;
 *           2 blue, 1 red, 2 green
 */

const fileName = './input.txt';
const fs = require('fs');


// const GAMES = [
//     [],
//     [{"blue": 3, "red": 4, "green": 0}, {"blue": 0, "red": 1, "green": 2}, {"blue": 6, "red": 0, "green": 2}],
//     [{"blue": 1, "red": 0, "green": 2}, {"blue": 4, "red": 1, "green": 3}, {"blue": 1, "red": 0, "green": 1}],
//     [{"blue": 6, "red": 20, "green": 8}, {"blue": 5, "red": 4, "green": 13}, {"blue": 0, "red": 1, "green": 5}],
//     [{"blue": 6, "red": 3, "green": 1}, {"blue": 0, "red": 6, "green": 3}, {"blue": 15, "red": 14, "green": 3}],
//     [{"blue": 1, "red": 6, "green": 3}, {"blue": 2, "red": 1, "green": 2}]
// ]

let isPossible = function(game, red, blue, green) {
    for (let round of game) {
        if (round.red > red || round.blue > blue || round.green > green) return false;
    }
    return true;
}

let getSumOfGameIds = function(games, red, blue, green) {
    let sum = 0;
    for (let id=1; id<games.length; id++) {
        if (isPossible(games[id], red, blue, green)) {
            sum+=id;
        }
    }
    return sum;
}

let convertRoundToDict = function(text) {
    let colors = text.split(",").map(s => s.trim().split(" "));
    let obj = {};
    for (let [num, color] of colors) {
        obj[color] = parseInt(num);
    }
    return obj;
}

let convertToMap = function(input) {
    let games = [null];
    let array = input.toString().split('\n');
    for (let line of array) {
        if (line) {
            let gamesArr = line.split(':');
            // let gameId = gamesArr[0].split('Game ')[1];
            let roundText = gamesArr[1].split("; ");
            let rounds = [];
            for (let text of roundText) {
                let round = convertRoundToDict(text);
                rounds.push(round);
            }
            games.push(rounds);
        }
    }
    return games;
}

let getSumofPowerOfSets = function(games) {
    let sum = 0;
    for (let id=1; id<games.length; id++) {
        let red = 0, blue=0, green = 0;
        let game = games[id];
        console.log("game", game)
        for (let round of game) {
            if (round["green"] && round["green"] > green) green = round["green"];
            if (round["blue"] && round["blue"] > blue) blue = round["blue"];
            if (round["red"] && round["red"] > red) red = round["red"];
        }
        sum += (red * blue * green);
    }
    return sum;
}

fs.readFile(fileName, (err, input) => {
    if (err) throw err;
    let games = convertToMap(input);
    let sumOfIds = getSumOfGameIds(games, 12, 14, 13);
    console.log("pt1:", sumOfIds);
    let sumOfPower = getSumofPowerOfSets(games);
    console.log("sumOfPower", sumOfPower)
});