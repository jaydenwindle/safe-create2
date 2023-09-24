import fs from "fs";

if (process.argv.length === 2) {
  console.error("Expected at least one argument!");
  process.exit(1);
}

const fileName = process.argv[2];

console.log(`contracts/out/${fileName}/${fileName.replace("sol", "json")}`);

const file = fs.readFileSync(
  `contracts/out/${fileName}/${fileName.replace("sol", "json")}`,
  "utf-8"
);

const metadata = JSON.parse(file);

const bytecode = metadata.bytecode.object;

console.log(`Deploy Here: http://localhost:5173?bytecode=${bytecode}`);
