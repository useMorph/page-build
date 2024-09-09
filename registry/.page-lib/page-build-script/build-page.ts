import { Command } from "@commander-js/extra-typings";
import { exec } from "child_process";
import path from "path";
import { copyFileSync } from "fs";

const program = new Command();

program
  .command("build-page")
  .description("Build a page")
  .argument("<file>", ".mdx file to compile")
  .requiredOption("-o, --outDir <outDir>", "Output directory")
  .option("-p, --preview <preview>", "For preview environment")
  .action(async (file, option) => {
    const originalPath = path.resolve(path.join(process.cwd(), "../../", file));
    const targetPath = path.resolve(
      path.join(
        process.cwd(),
        "../../",
        ".page-lib/page-build-template/src/Page.mdx"
      )
    );

    await copyFileSync(originalPath, targetPath);

    await exec(
      `yarn workspace @usemorph/page-build-template build --outDir ../../${
        option.outDir
      } ${option.preview !== undefined ? "--mode preview" : ""}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`error: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
      }
    );
  });

program.parse();
