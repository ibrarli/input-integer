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
