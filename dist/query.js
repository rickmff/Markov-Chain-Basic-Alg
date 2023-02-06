"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const process_1 = require("process");
const data = JSON.parse((0, fs_1.readFileSync)("./results/nextMostCommon.json", { encoding: "utf-8" }));
const queriedWord = process_1.argv[2];
if (queriedWord in data)
    console.log(data[queriedWord]);
else
    console.log("No next word found");
