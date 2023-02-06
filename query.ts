import { readFileSync } from "fs";
import { argv } from "process";

const data = JSON.parse(
	readFileSync("./results/nextMostCommon.json", { encoding: "utf-8" })
);
const queriedWord = argv[2];

if (queriedWord in data) console.log(data[queriedWord]);
else console.log("No next word found");
