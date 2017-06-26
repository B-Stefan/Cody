const BotTester = require('messenger-bot-tester');
const Server = require("./../src/server");
describe('bot test', function() {
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

  it('hi', function(){
    let userId  = "1234";
    let pageId  = "13415123";
    const theScript = new BotTester.Script(userId, pageId);
    theScript.sendTextMessage('hi');  //mock user sending "hi"
    theScript.expectTextResponses([   //either response is valid
      'Hey!',
      'Welcome',
    ]);
    return tester.runScript(theScript);
  });
});