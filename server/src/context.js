
function addProgrammingLangToContext(context,langs){
  context.known_langs = context.known_langs ? context.known_langs : [];

  //Add only the new langs into the context
  let newLangs = langs.filter((lang)=>context.known_langs.indexOf(lang) === -1);

  //Merge the arrays
  context.known_langs = context.known_langs.concat(newLangs)
}

module.exports.addProgrammingLangToContext = addProgrammingLangToContext;