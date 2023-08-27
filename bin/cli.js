#!/usr/bin/env node
const { Command } = require("commander");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const program = new Command();
const copyFile = promisify(fs.copyFile); // 将 fs.copyFile 方法转换为 Promise 形式
const mkdir = promisify(fs.mkdir); // 将 fs.mkdir 方法转换为 Promise 形式
const fsRm = promisify(fs.rm); // 将 fs.rm 方法转换为 Promise 形式

// 定义当前版本
const package = require("../package.json");
program.option("-v, --version").action(() => {
  console.log(`v${package.version}`);
});

// 定义帮助指令
program.on("--help", () => {});

// 读取 templates 目录下的所有子文件夹名字和路径
const templatesPath = path.join(__dirname, "..", "templates"); // 注意这里的路径计算
const files = fs.readdirSync(templatesPath, { withFileTypes: true });
const subDirectories = files.filter((file) => file.isDirectory());
const folderNames = subDirectories.map((dir) => dir.name);
const folderPaths = subDirectories.map((dir) =>
  path.join(templatesPath, dir.name)
);

// 文件复制函数
async function copyTemplateFiles(templatePath, targetPath) {
  const files = await promisify(fs.readdir)(templatePath);
  for (const file of files) {
    const sourceFilePath = path.join(templatePath, file);
    const targetFilePath = path.join(targetPath, file);
    const stats = await promisify(fs.stat)(sourceFilePath);
    if (stats.isDirectory()) {
      await mkdir(targetFilePath);
      await copyTemplateFiles(sourceFilePath, targetFilePath);
    } else {
      await copyFile(sourceFilePath, targetFilePath);
    }
  }
}

program
  .command("create [projectName]") // 增加可选命令 [] 表示可选
  .description("创建模版")
  .action(async (projectName) => {
    // 命名项目
    if (!projectName) {
      const { name } = await inquirer.prompt({
        type: "input",
        name: "projectName",
        message: "请输入项目名称：",
        validate: (input) => {
          if (!input) {
            return "项目名称不能为空";
          }
          return true;
        },
      });
      projectName = name;
    }

    // 获取要创建的目录的路径
    const targetPath = path.join(process.cwd(), projectName);

    // 选择模板
    const { template } = await inquirer.prompt({
      type: "list",
      name: "template",
      message: "请选择模版：",
      choices: folderNames,
    });

    // 判断文件夹是否存在，存在则询问用户是否覆盖
    if (fs.existsSync(targetPath)) {
      const { exist } = await inquirer.prompt({
        type: "confirm",
        name: "exist",
        message: "目录已存在，是否覆盖？",
      });
      // 如果覆盖就递归删除文件夹继续往下执行，否的话就退出进程
      exist ? await fsRm(targetPath, { recursive: true }) : process.exit(1);
    }

    // 创建项目文件夹并复制模板文件到当前目录
    await mkdir(targetPath);
    const selectedTemplateIndex = folderNames.indexOf(template);
    const selectedTemplatePath = folderPaths[selectedTemplateIndex];
    await copyTemplateFiles(selectedTemplatePath, targetPath);
    console.log("模板创建成功！");
    console.log(`\ncd ${projectName}`);
    console.log("yarn");
    console.log("yarn dev\n");
  });

// 解析用户执行命令传入参数
program.parse(process.argv);
