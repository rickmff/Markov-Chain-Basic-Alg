import { readFileSync } from "fs";
import { writeFileSync } from "fs";

interface WordMapData {
  [key: string]: number;
}


function getBody(line: string) {
	const [_rating, _title, body] = line.split(",");
	return body;
}

function getData(): string[] {
	const dataSetData = readFileSync("./data/test.csv", { encoding: "utf-8" });
	const lines = dataSetData.split("\n").map(getBody);

	return lines;
}

const lines = getData();

const wordMap = new Map<string, WordMapData>();
console.time("loaded-1")
for (let line of lines) {
  if (!line) continue;
  const cleanedBody = line.replace(/[^a-zA-Z]+/g, " ").replace(/\s+/g, " ");
  const words: string[] = cleanedBody.split(" ");

  for (let wordIndex in words) {
    let currentWord = words[wordIndex].toLowerCase().trim();

    if (words.length - 1 === Number(wordIndex)) continue;
    const nextWord = words[Number(wordIndex) + 1].toLowerCase().trim();

    if (!nextWord || !currentWord) continue;

    if (wordMap.has(currentWord)) {
      const state = wordMap.get(currentWord);

      if (state![nextWord]) {
        state![nextWord]++;
        continue;
      }
      state![nextWord] = 1;
    } else {
      wordMap.set(currentWord, { [nextWord]: 1 });
    }
  }
}
console.timeEnd("loaded")
console.time("write");
writeFileSync(
  "./results/probability.json",
  JSON.stringify(Object.fromEntries(wordMap))
);
