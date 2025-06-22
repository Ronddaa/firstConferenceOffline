import { readFile } from "fs/promises";
import { join } from "path";
import handlebars from "handlebars";
const { compile } = handlebars;

export async function renderTemplate(templateName, data) {
  const filePath = join(process.cwd(), "emailTemplates", `${templateName}.hbs`);
  const source = await readFile(filePath, "utf-8");
  const template = compile(source);
  return template(data);
}
