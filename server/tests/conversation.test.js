const BotTester = require('messenger-bot-tester');
const Server = require("./../src/server");
const Conversation = require("./../src/conversation");
const {expect,should} = require("chai");
describe('Conversation test', function() {

  it('Should start a conversation', function(){

    let conversation = new Conversation("user-1");

    return conversation.processMessage("Hi").then((msgs)=>{

      expect(msgs).to.be.instanceof(Array);
      expect(msgs.length).to.be.equal(1);
      let first = msgs.pop();
      expect(first).to.be.instanceOf(Object);
      expect(first.type).to.exist;
      expect(first.content).to.exist;
      expect(first.content).to.equal('You asked: "Hi". I\'m doing well. Thanks for asking.');
    })


  });


  it('Should help me', function(){

    let conversation = new Conversation("user-2");

    return conversation.processMessage("Please, help me").then((msgs)=>{

      expect(msgs).to.be.instanceof(Array);
      expect(msgs.length).to.be.equal(1);
      let first = msgs.pop();
      expect(first).to.be.instanceOf(Object);
      expect(first.type).to.exist;
      expect(first.content).to.exist;
      expect(first.content).to.equal('You asked: "Please, help me". I can tell you how I\'m doing if you ask nicely.');
    })


  });

});