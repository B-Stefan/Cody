

const talkify = require('talkify');


const Bot = talkify.Bot;

// Types dependencies
const BotTypes = talkify.BotTypes;
const Message = BotTypes.Message;
const SingleLineMessage = BotTypes.SingleLineMessage;
const MultiLineMessage = BotTypes.MultiLineMessage;

// Skills dependencies
const Skill = BotTypes.Skill;

// Training dependencies
const TrainingDocument = BotTypes.TrainingDocument;



const trainDocs = [
  new TrainingDocument('how_are_you', 'how are you'),
  new TrainingDocument('how_are_you', 'how are you going'),
  new TrainingDocument('how_are_you', 'how is it going'),

  new TrainingDocument('help', 'how can you help'),
  new TrainingDocument('help', 'i need some help'),
  new TrainingDocument('help', 'how could you assist me')
];

let botPromise = null;

function getTalkifyInstance(){
  if(botPromise == null){
    botPromise = createTalkifyInstance().then((bot)=>{
      addSkills(bot);
      return bot
    })
  }
  return botPromise;
}

function  createTalkifyInstance(){
  let bot = new Bot();
  return new Promise((resolve,reject)=>{
    bot.trainAll(trainDocs, (err)=>{
      if(err) reject(err);
      resolve(bot)
    });
  });

}

function  addSkills(bot){
  let howAction = function(context, request, response, next) {
    response.message = new SingleLineMessage('You asked: \"' + request.message.content + '\". I\'m doing well. Thanks for asking.');
    next();
  };

  let helpAction = function(context, request, response, next) {
    response.message = new SingleLineMessage('You asked: \"' + request.message.content + '\". I can tell you how I\'m doing if you ask nicely.');
    next();
  };

  let howSkill = new Skill('how_skill', 'how_are_you', howAction);
  let helpSkill = new Skill('help_skill', 'help', helpAction);

  bot.addSkill(howSkill);
  bot.addSkill(helpSkill);
}



class Conversation {


  constructor(userId){
    this.userId = userId;

  }

  processMessage(text){
    return getTalkifyInstance().then((bot)=>{
      return new Promise((resolve,reject)=>{
        bot.resolve(this.userId,text,(err,messages)=>{
          if(err){
            reject(err)
          }
          resolve(messages)
        })
      })
    });
  }


}

module.exports = Conversation;