#!/usr/bin/env node
import { input } from "@inquirer/prompts";
import { cp, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";
import colors from "yoctocolors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const run = async () => {
  //Handle Quit (Ctrl+C)
  process.on("uncaughtException", (error) => {
    if (error instanceof Error && error.name === "ExitPromptError") {
      console.log(colors.red("❌ Operation cancelled"));
    } else {
      // Rethrow unknown errors
      throw error;
    }
  });
  // Prompt user
  const name = await input({
    message: "Component's name:",
    default: "My component",
  });
  const description = await input({
    message: "Description:",
    default: "Component developed using Vite.",
  });
  const author = await input({ message: "Author:", default: "Awesome dev" });

  const suggestedSlug = name
    .toLowerCase()
    .split(" ")
    .filter((v, i) => i < 3)
    .join("-");

  const slug = await input({
    message: "Slug (no-spaces):",
    default: suggestedSlug,
  });

  const dir = await input({
    message: "Target directory:",
    default: slug,
  });

  // Copy template
  const templateDir = path.join(__dirname, "template-vanilla-js");
  const targetDir = path.join(process.cwd(), dir);

  await cp(templateDir, targetDir, { recursive: true });

  // Create UID for the component
  const buffer = crypto.randomBytes(3);
  const hash = buffer.toString("hex");

  // Save config at component.config.json
  const configPath = path.join(targetDir, "component.config.json");
  const configData = {
    name: name,
    description: description,
    author: author,
    slug: slug,
    _hash: hash,
  };

  await writeFile(configPath, JSON.stringify(configData, null, 2));

  // Final log
  console.log(
    colors.green("✔ Config saved at:"),
    colors.yellow("'component.config.json'")
  );
  console.log(
    colors.gray(
      `You can modify the config file or run the command ${colors.yellow(
        "'npm run config'"
      )} to update.`
    )
  );
  console.log(
    colors.gray(
      `Make sure to rebuild ${colors.yellow(
        "'npm run build'"
      )} before deploying your bundle.`
    )
  );

  console.log(
    colors.green(`✔ Project created at: ${colors.yellow(`'${dir}'`)}`)
  );
  console.log(colors.gray(`➜ cd ${dir}`));
  console.log(colors.gray("➜ npm install"));
  console.log(colors.gray("➜ npm run dev"));
};

run();
