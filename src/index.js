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
  const input = document.createElement('input')

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

    if (max < val) {
      input.value = max
    } else if (val_len === min_len && min > val) {
      input.value = min
    }

    notify({ from: name, type: 'update', data: val })
  }

  function handle_onmouseleave_and_blur(e, input, min) {
    const val = Number(e.target.value)

    if (min > val) {
      input.value = ' '
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
