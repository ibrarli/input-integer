(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = inputInteger;

const sheet = new CSSStyleSheet();
const theme = get_theme();
sheet.replaceSync(theme);

function inputInteger(opts) {
  const { min, max } = opts;

  const el = document.createElement("div");
  const shadow = el.attachShadow({ mode: "closed" });
  const input = document.createElement("input");
  input.type = "number";
  input.min = min;
  input.max = max;
  input.onkeyup = (e) => handle_onkeyup(e, input, min, max);
  input.onmouseleave = (e) => handle_onmouseleave_and_blur(e, input, min);
  input.onblur = (e) => handle_onmouseleave_and_blur(e, input, min);

  shadow.append(input);

  shadow.adoptedStyleSheets = [sheet];
  return el;
}

function get_theme() {
  return `
        input {
            padding: 4px 10px;
            background-color: hsla(284, 45%, 54%, 1);
            border-radius: 20px;
        }
        input:focus {
        background-color: red;
        }
    `;
}

function handle_onkeyup(e, input, min, max) {
  console.log(e.target.value);

  const val = Number(e.target.value);
  const val_len = val.toString().length;
  const min_len = min.toString().length;

  if (max < val) {
    input.value = max;
  } else if (val_len === min_len && min > val) {
    input.value = min;
  }
}

function handle_onmouseleave_and_blur(e, input, min) {
  const val = Number(e.target.value);

  if (min > val) {
    input.value = "";
  }
}

},{}],2:[function(require,module,exports){
const inputInteger = require("input-integer-apen");

const opt1 = { min: 1, max: 150 };
const opt2 = { min: 1900, max: 2025 };

const input1 = inputInteger(opt1);
const input2 = inputInteger(opt2);

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

},{"input-integer-apen":1}]},{},[2]);
