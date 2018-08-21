import { SourceMapConsumer } from "source-map";
import * as fs from "fs";
import * as path from "path";
import * as shell from "shelljs";

async function main() {
  const sourceMap = fs.readFileSync("../../../presenterClient.js.map", "utf-8");
  const consumer = await new SourceMapConsumer(sourceMap);
  const prefix = "webpack:///";
  const sources = consumer.sources.map(x => ({
    source: x,
    dest: path.join("./webpack", x.substring(prefix.length))
  }));
  for (let a of sources) {
    const aaaa = consumer.sourceContentFor(a.source);
    const dir = path.dirname(a.dest);
    console.log(dir);
    if (!fs.existsSync(dir)) {
      shell.mkdir("-p", dir);
    }
    fs.writeFileSync(a.dest, aaaa, "utf-8");
  }
}

main();
