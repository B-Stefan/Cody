
const BotTester = require('messenger-bot-tester');
const Server = require("./../src/server");

function createTestEnvironment(port) {

  // webHookURL points to where yout bot is currently listening
  // choose a port for the test framework to listen on
  const testingPort = port + 100 ;
  const webHookURL = 'http://localhost:' + port + '/';
  const tester = new BotTester.default(testingPort, webHookURL);
  const server = new Server({graph_url: `http://localhost:${testingPort}/v2.6`});


  return {
    start: ()=>{
      // start your own bot here or having it running already in the background
      // redirect all Facebook Requests to http://localhost:3100/v2.6 and not https://graph.facebook.com/v2.6

      let testerPromise = tester.startListening();
      let serverPromise = server.start();

      return Promise.all([testerPromise,serverPromise])

    },
    stop: ()=>{
      let testerPromise = tester.stopListening();
      let serverPromise = server.stop();
      return Promise.all([testerPromise,serverPromise])
    },
    tester: tester,
    server: server
  }
}

module.exports.createTestEnvironment = createTestEnvironment;