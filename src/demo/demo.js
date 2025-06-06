const inputInteger = require("..");

const input1 = inputInteger();
const input2 = inputInteger();


const title = "my demo form";
const subtitle = "please fill out the form";

const page = document.createElement("div");
page.innerHTML = `
    <h1> ${title} </h1>
    <h2> ${subtitle} </h2>
    <h3> Enter your age </h3>
    <x></x>
    <h3> Enter your age </h3>
    <y></y>
    `;
document.body.append(page);
page.querySelector("x").replaceWith(input1);
page.querySelector("y").replaceWith(input2);

