(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const inputInteger = require("..")

const sheet = new CSSStyleSheet()
const theme = get_theme()
sheet.replaceSync(theme)

function protocol(sender, listen) {
  return (message) => {
    listen(message)
  }
}
const opt1 = { min: 1, max: 150 }
const opt2 = { min: 1900, max: 2025 }

const input1 = inputInteger(opt1, protocol)
const input2 = inputInteger(opt2, protocol)

const title = "my demo form"
const subtitle = "please fill out the form"

const page = document.createElement("div")
const shadow = page.attachShadow({ mode: "closed" })

shadow.innerHTML = `
    <div class="form-container">   
        <h1> ${title} </h1>
        <h2> ${subtitle} </h2>
        <h3> Enter your age </h3>
        <x></x>
        <h3> Enter your age </h3>
        <y></y>
    </div>
    `;

shadow.querySelector("x").replaceWith(input1)
shadow.querySelector("y").replaceWith(input2)

shadow.adoptedStyleSheets = [sheet]

document.body.append(page)

function get_theme() {
  return `
    :host {
      all: initial;
    }

    body, html {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f2f2f2;
    }

    .form-container {
      max-width: 400px;
      margin: 60px auto;
      padding: 40px 30px;
      background-color: #fff;
      border: 2px solid #a64ac9;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
      transition: box-shadow 0.3s ease;
    }

    .form-container:hover {
      box-shadow: 0 12px 35px rgba(0, 0, 0, 0.18);
    }

    h1 {
      font-size: 30px;
      color: #5e2b97;
      margin-bottom: 12px;
      letter-spacing: 0.5px;
    }

    h2 {
      font-size: 18px;
      color: #777;
      margin-bottom: 28px;
      font-weight: normal;
    }

    h3 {
      font-size: 16px;
      color: #444;
      margin: 24px 0 10px;
      font-weight: 500;
    }
  `;
}

},{"..":2}],2:[function(require,module,exports){
module.exports = inputInteger

//CSS Styling
const sheet = new CSSStyleSheet()
const theme = get_theme()
sheet.replaceSync(theme)

var id = 0;

// main function
function inputInteger(opts, protocol) {
  const { min = 0, max = 1000} = opts

  const name = `input-integer-${id++}`

  const notify = protocol({ from: name }, listen)

  function listen(message) {
    const { type, data } = message
    if (type === "update") {
      input.value = data
    }
  }

  const el = document.createElement("div")
  const shadow = el.attachShadow({ mode: 'closed' })
  let input = document.createElement('input')

  input.type = 'number'
  input.min = min
  input.max = max
  input.onkeyup = (e) => handle_onkeyup(e, input, min, max)
  input.onmouseleave = (e) => handle_onmouseleave_and_blur(e, input, min)
  input.onblur = (e) => handle_onmouseleave_and_blur(e, input, min)

  shadow.append(input)

  shadow.adoptedStyleSheets = [sheet]

  return el

  function handle_onkeyup(e, input, min, max) {
    const val = Number(e.target.value)
    const val_len = val.toString().length
    const min_len = min.toString().length

    if (Number.isNaN(val)) return

    if (max < val) {
      input.value = max
      notify({ from: name, type: 'update', data: max })
    } else if (val_len === min_len && min > val) {
      input.value = min
      notify({ from: name, type: 'update', data: min })
    } else {
      notify({ from: name, type: 'update', data: val })
    }
  }

  function handle_onmouseleave_and_blur(e, input, min) {
    const val = Number(e.target.value)
    if (Number.isNaN(val) || val < min) {
      input.value = min
      notify({ from: name, type: 'update', data: min })
    }
  }

}

function get_theme() {
  return `
    input {
      padding: 10px 16px;
      background-color: hsla(284, 45%, 54%, 1);
      border: none;
      border-radius: 25px;
      color: #ffffff;
      font-size: 15px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      outline: none;
      width: 100%;
      max-width: 300px;
      transition: 
        background-color 0.3s ease,
        box-shadow 0.3s ease,
        transform 0.2s ease;
    }

    input::placeholder {
      color: #f0e6f6;
      opacity: 0.9;
    }

    input:hover {
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
      transform: translateY(-1px);
    }

    input:focus {
      background-color: #d843d0;
      box-shadow: 0 0 0 3px rgba(216, 67, 208, 0.3);
    }
  `;
}

},{}]},{},[1]);
