let _LANG = {}
let loaded = false

function loadLanguage (language, module) {
  let n = false
  try {
    n = require(`../lang/${language}/${module}`)
    _LANG = { _LANG, ...n }
  } catch (e) {
    console.log(`Failed to load ${module} language`)
  }
}

module.exports = {
  l: (txt, ...args) => {
    if (_LANG && _LANG[txt]) {
      txt = _LANG[txt]
    }
    if (!args || args.length === 0) {
      return txt
    }
    for (let i = 0, cnt = args.length; i < cnt; ++i) {
      txt = txt.replace(new RegExp(`\\{${i}\\}`, 'gm'), args[i])
    }
    return txt
  },
  load: (language, moduleUri) => {
    if (!loaded) {
      loaded = true
      loadLanguage(language, 'global')
    }
    if (moduleUri) {
      let m = moduleUri.split('/').slice(1)
      for (let i = 1, cnt = m.length; i <= cnt; ++i) {
        loadLanguage(language, m.slice(0, i).join('-'))
      }
    }
  },
}
