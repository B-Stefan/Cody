const programming_languages = require("./../../res/programming_languages.json");
const {BotTypes} = require('talkify');
const contextUtil = require("./../context");
// Types dependencies
const Message = BotTypes.Message;
const SingleLineMessage = BotTypes.SingleLineMessage;
const MultiLineMessage = BotTypes.MultiLineMessage;



//Some of the languages have unfortunate names... So I remove them to prevent unexpected behaviour
let bannedLanguages = ["no", "yes"];

/**
 * Transform the list of langauges into a simple array list of names
 * @type {Array<string>}
 */
let languages_names = programming_languages.itemListElement
    .map((item)=>item.item)
    .map((language)=>language.name.toLowerCase())
    .filter((lang)=> bannedLanguages.indexOf(lang) === -1);

/**
 * The skill function to determinate a certain skill
 * @param context - The context object of the conversation
 * @param request - The original request from the user
 * @param response - The current response
 * @param next - callback function
 */
function workedWithSkill(context, request, response, next){

  let msg = request.message.content;

  let known_langs = findProgrammingLang(msg);
  //Check if the
  if(known_langs.length > 0){
    contextUtil.addProgrammingLangToContext(context,known_langs);
    response.message = new MultiLineMessage([
        'Oh well you know already some languages *top*. I detected ' + known_langs ,
        'But ... come on there is more that you know... :)'
    ]);
  }else {
    response.message = new SingleLineMessage('Sorry but I did\'t understood your language');
  }
  console.log(JSON.stringify(context));
  next();
}


/**
 * Tries to find a programming language
 * @param {string} text - The input text sentence
 * @returns {Array.<string>} - list of detected languages
 */
function findProgrammingLang(text) {

  /*
   * Split text
   * "I worked with java" -> [I, worked, with, java]
   * "I worked with java,nodejs" -> [I, worked, with, java, nodejs]
   * "I worked with java and nodejs" -> [I, worked, with, java,and,nodejs]
   */
  return text.toLowerCase()
      .split(/,| /)
      .filter((word)=>languages_names.indexOf(word) > -1 );
}

module.exports.workedWithSkill = workedWithSkill;
module.exports.findProgrammingLang = findProgrammingLang;
