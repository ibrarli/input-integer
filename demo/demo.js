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
