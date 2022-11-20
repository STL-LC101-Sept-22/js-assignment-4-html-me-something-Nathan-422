// Set up JSDom
const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const options = {
   runScripts: "dangerously",
   resources: "usable",
   pretendToBeVisual: true
}

let html = fs.readFileSync(path.resolve(__dirname, "../index.html"), 'utf8');
let css = fs.readFileSync(path.resolve(__dirname, "../styles.css"), 'utf8')

describe ("Grading Tests: ", function () {

   let window, container;

   beforeAll(function() {

      const dom = new JSDOM(html, options);
      window = dom.window;

      let stylesElement = window.document.createElement("style");
      stylesElement.textContent = css;
      window.document.head.appendChild(stylesElement);

      window.addEventListener("load", function() {
         container = window.document;
      });
   });

   it("HTML includes the correct number of certain elements", function() {
      setTimeout(() => {
         
      
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

         expect(pElements).toBeGreaterThanOrEqual(1);
         expect(headerElements).toBeGreaterThanOrEqual(1);
         expect(footerElements).toBeGreaterThanOrEqual(1);
         expect(mainElements).toBeGreaterThanOrEqual(1);
         expect(articleElements).toBeGreaterThanOrEqual(1);
         expect(imageElements).toBeGreaterThanOrEqual(1);
      }, 1000);   
   })

   it("HTML contains correct number of sections", function() {
      setTimeout(() => {
         let childrenElements = container.body.children;
         
         expect(childrenElements.length).toBeGreaterThanOrEqual(3);
         expect(childrenElements.length).toBeLessThanOrEqual(10);
         
               }, 1000)
   })

   it("HTML includes external CSS script", function() {
      setTimeout(() => {
         let linkElement = container.getElementsByTagName("Link");
         expect(linkElement.item(0).href.includes('styles.css')).toBeTrue();
         
               }, 1000)
   })

   it("CSS body sets margin and display", function() {
      setTimeout(() => {
         expect(window.getComputedStyle(container.body).display).toEqual("block");
         expect(window.getComputedStyle(container.body).margin).toEqual("8px");
         
               }, 1000)
   })

   it("CSS funParagraph class is green", function() {
      setTimeout(() => {
         let funParagraphElement = container.getElementById("testP");
         expect(window.getComputedStyle(funParagraphElement).color).toEqual("green");
         
               }, 1000)
   })

   it("CSS mainHeading id is red", function() {
      setTimeout(() => {
         let headingElement = container.getElementById("mainHeading");
         expect(window.getComputedStyle(headingElement).color).toEqual("red");
         
               }, 1000)
   })

   it("HTML includes HTML entities", function() {
      // Regex pattern: /(&.+;)/ig
      
      const regex = /(&.+;)/ig;
      expect(html.search(regex)).not.toEqual(-1);
   })
});
