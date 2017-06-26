const BotTester = require('messenger-bot-tester');
const Server = require("./../src/server");
const Conversation = require("./../src/conversation");
const {expect,should} = require("chai");
const {createTestEnvironment} = require("./utils")
describe('Server test', function() {

  const testEnv = createTestEnvironment(3000);

  const tester = testEnv.tester;
  const server = testEnv.server;
  before(function(){
    // start your own bot here or having it running already in the background
    // redirect all Facebook Requests to http://localhost:3100/v2.6 and not https://graph.facebook.com/v2.6

    return testEnv.start()
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