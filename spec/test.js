const fs = require("fs");
const path = require("path");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const options = {
  runScripts: "dangerously",
  resources: "usable",
  pretendToBeVisual: true,
};

let html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");
let css = fs.readFileSync(path.resolve(__dirname, "../styles.css"), "utf8");

// console.log(`HTML path: ${html}`)
// console.log(`CSS  path: ${css}`)

let window, container;

const dom = new JSDOM(html, options);
window = dom.window;

let stylesElement = window.document.createElement("style");
stylesElement.textContent = css;
window.document.head.appendChild(stylesElement);

window.addEventListener("load", function () {
  container = window.document;
  // console.log(container);
  // console.log(window.document.body.getElementsByTagName("P").length);
  let pElements = container.body.getElementsByTagName("P").length;
  console.log(pElements);
  let headerElements = container.body.getElementsByTagName("Header").length;
  console.log(headerElements);
  let footerElements = container.body.getElementsByTagName("Footer").length;
  console.log(footerElements);
  let mainElements = container.body.getElementsByTagName("Main").length;
  console.log(mainElements);
  let articleElements = container.body.getElementsByTagName("Article").length;
  console.log(articleElements);
  let imageElements = container.body.getElementsByTagName("img").length;
  console.log(imageElements);
});

