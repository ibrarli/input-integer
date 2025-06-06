module.exports = inputInteger;

const sheet = new CSSStyleSheet();
const theme = get_theme();
sheet.replaceSync(theme);

function inputInteger() {
  const el = document.createElement("div");
  const shadow = el.attachShadow({ mode: "closed" });
  const input = document.createElement("input");
  input.type = "number";
  input.min = 0;
  input.max = 10;
  input.onkeyup = (e) => handle_onkeyup(e, input);

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

function handle_onkeyup(e, input) {
  console.log(e.target.value);
  const val = Number(e.target.value);

  if (input.max < val) {
    input.value = 150;
  }
  else if (input.min > val){
    input.value = 0;
  }
}
