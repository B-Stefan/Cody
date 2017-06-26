const BotTester = require('messenger-bot-tester');
const Server = require("./../src/server");
const Conversation = require("./../src/conversation");
const {expect,should} = require("chai");
describe('Server test', function() {
  // webHookURL points to where yout bot is currently listening
  // choose a port for the test framework to listen on
  const testingPort = 3100;
  const webHookURL = 'http://localhost:' + 3000 + '/';
  const tester = new BotTester.default(testingPort, webHookURL);
  const server = new Server({graph_url: `http://localhost:${testingPort}/v2.6`});

  before(function(){
    // start your own bot here or having it running already in the background
    // redirect all Facebook Requests to http://localhost:3100/v2.6 and not https://graph.facebook.com/v2.6

    let testerPromise = tester.startListening();
    let serverPromise = server.start();
    return Promise.all([testerPromise, serverPromise])
  });

  it('Should create conversations for each user', function(){
    let userId  = "1234";
    let pageId  = "13415123";

    let testScripts = [
      new BotTester.Script(userId, pageId),
      new BotTester.Script(userId+"-1", pageId)
    ];

    testScripts.forEach((script)=>{
      script.sendTextMessage("Init msg")
    });


    let testPromises = testScripts.map((script)=>tester.runScript(script));
    return Promise.all(testPromises).then(()=>{
      expect(Object.keys(server.conversations).length).to.equal(2);
      expect(server.conversations[userId]).to.be.an.instanceOf(Conversation);
      expect(server.conversations[userId+"-1"]).to.be.an.instanceOf(Conversation);
    });

  });
});