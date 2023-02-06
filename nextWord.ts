import { readFileSync, writeFileSync } from "fs";

const data = JSON.parse(
  readFileSync("./results/probability.json", { encoding: "utf-8" })
);
const entries = Object.entries(data);

const map = new Map<string, string>();

for (const [word, data] of entries) {
  const nextWords = data as { [nextWord: string]: number };
  if (Object.values(nextWords).length === 0) continue;

  const mostCommon = Object.entries(nextWords).sort((a, b) => b[1] - a[1])[0];
  map.set(word, mostCommon[0]);
}

writeFileSync(
  "./results/nextWord.json",
  JSON.stringify(Object.fromEntries([...map]))
);