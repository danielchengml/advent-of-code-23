const fileName = './input.txt';
const fs = require('fs');

const map = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9
}

let getCalibrationValue = function(line) {
    let first, firstIdx = Infinity, last, lastIdx = -1;
    for (let [key, val] of Object.entries(map)) {        
        let earliest = line.indexOf(key);
        if (earliest !== -1 && earliest < firstIdx) {
            firstIdx = earliest;
            first = val;
        }
        let latest = line.lastIndexOf(key);
        if (latest !== -1 && latest > lastIdx) {
            lastIdx = latest;
            last = val;
        }
    }
    return (first * 10) + last;
}

let sum = 0;
fs.readFile(fileName, (err, input) => {
    if (err) throw err;
    let array = input.toString().split('\n');
    for (let line of array) {
        sum += getCalibrationValue(line);
    }
    console.log("sum", sum)
});


