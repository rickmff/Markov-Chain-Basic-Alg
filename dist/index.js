"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fs_2 = require("fs");
function getBody(line) {
    const [_rating, _title, body] = line.split(",");
    return body;
}
console.time("getData");
function getData() {
    const dataSetData = (0, fs_1.readFileSync)("./data/test.csv", { encoding: "utf-8" });
    const lines = dataSetData.split("\n").map(getBody);
    return lines;
}
const lines = getData();
console.timeEnd("getData");
console.time("wordMap");
const wordMap = new Map();
for (let line of lines) {
    if (!line)
        continue;
    const cleanedBody = line.replace(/[^a-zA-Z]+/g, " ").replace(/\s+/g, " ");
    const words = cleanedBody.split(" ");
    for (let wordIndex in words) {
        let currentWord = words[wordIndex].toLowerCase().trim();
        if (words.length - 1 === Number(wordIndex))
            continue;
        const nextWord = words[Number(wordIndex) + 1].toLowerCase().trim();
        if (!nextWord || !currentWord)
            continue;
        if (wordMap.has(currentWord)) {
            const state = wordMap.get(currentWord);
            if (state[nextWord]) {
                state[nextWord]++;
                continue;
            }
            state[nextWord] = 1;
        }
        else {
            wordMap.set(currentWord, { [nextWord]: 1 });
        }
    }
}
console.timeEnd("wordMap");
console.time("write");
(0, fs_2.writeFileSync)("./results/probability.json", JSON.stringify(Object.fromEntries(wordMap)));
console.timeEnd("write");
