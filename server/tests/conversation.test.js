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

  describe('Worked with skill test', function() {

    it('Should detect a single programming language ', function () {

      let conversation = new Conversation("user-3");

      return conversation.processMessage("I worked with java").then((msgs) => {

        expect(msgs).to.be.instanceof(Array);
        expect(msgs.length).to.be.equal(1);
        let first = msgs.pop();
        expect(first).to.be.instanceOf(Object);
        expect(first.type).to.exist;
        expect(first.content).to.exist;
        expect(first.content).to.deep.equal([
          "Oh well you know already some languages *top*. I detected java",
          "But ... come on there is more that you know... :)"
        ]);

      })

    });

    it('Should not detect programming language', function () {

      let conversation = new Conversation("user-3");

      return conversation.processMessage("I worked with something but no programming language").then((msgs) => {

        expect(msgs).to.be.instanceof(Array);
        expect(msgs.length).to.be.equal(1);
        let first = msgs.pop();
        expect(first).to.be.instanceOf(Object);
        expect(first.type).to.exist;
        expect(first.content).to.exist;
        expect(first.content).to.equal('Sorry but I did\'t understood your language');

      })

    });

    it('Should detect multiple programming languages ', function () {

      let conversation = new Conversation("user-3");

      let testA = conversation.processMessage("I worked with java and python ").then((msgs) => {

        expect(msgs).to.be.instanceof(Array);
        expect(msgs.length).to.be.equal(1);
        let first = msgs.pop();
        expect(first.content).to.deep.equal([
          "Oh well you know already some languages *top*. I detected java,python",
          "But ... come on there is more that you know... :)"
        ]);

      });
      let testB = conversation.processMessage("I worked with java, python and C#").then((msgs) => {


        expect(msgs).to.be.instanceof(Array);
        expect(msgs.length).to.be.equal(1);
        let first = msgs.pop();
        expect(first.content).to.deep.equal([
          "Oh well you know already some languages *top*. I detected java,python,c#",
          "But ... come on there is more that you know... :)"
        ]);

      });

      return Promise.all([testA, testB])

    });
  })

});