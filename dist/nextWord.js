"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const data = JSON.parse((0, fs_1.readFileSync)("./results/probability.json", { encoding: "utf-8" }));
const entries = Object.entries(data);
const map = new Map();
for (const [word, data] of entries) {
    const nextWords = data;
    if (Object.values(nextWords).length === 0)
        continue;
    const mostCommon = Object.entries(nextWords).sort((a, b) => b[1] - a[1])[0];
    map.set(word, mostCommon[0]);
}
(0, fs_1.writeFileSync)("./results/nextWord.json", JSON.stringify(Object.fromEntries([...map])));
