const fileName = './input.txt';
const fs = require('fs');

let getCalibrationValue = function(line) {
    let first, last;
    let start = 0;
    let end = line.length-1;
    while (true) {
        if (!Number.isNaN(parseInt(line.charAt(start))) || start === line.length) {
            first = line.charAt(start);
            break;
        }
        start+=1;
    }
    while (true) {
        if (!Number.isNaN((parseInt(line.charAt(end)))) || end < 0) {
            last = line.charAt(end);
            break;
        }
        end-=1;
    }
    return parseInt(first+last);
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


