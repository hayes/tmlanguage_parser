module.exports = tmanguage_parser

function tmanguage_parser(stream, done)
  var xml = require('xml-object-stream')
    , parser = xml.parse(stream)

  parser.each('plist', function(plist) {
    return to_object(plist.$children[0])
  })
}

function is_dict(item) {
  return item.$name === 'dict'
}

function to_object(dict) {
  var obj = {}
    , val

  for(var i = 0, len = dict.$children.length; i < len; i = i + 2) {
    obj[dict.$children[i].$text] = tag_to_val(dict.$children[i + 1])
  }

  return obj
}

function tag_to_val(tag) {
  switch(tag.$name) {
    case 'string':
      return tag.$text.trim()
    case 'array':
      return tag.$children.map(tag_to_val)
    case 'dict':
      return to_object(tag)
  }
}
