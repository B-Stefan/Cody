const Server = require('./src/server');

let options = {
  token: 'PAGE_TOKEN',
  verify: 'VERIFY_TOKEN',
  app_secret: 'APP_SECRET',
  graph_url: "https://graph.facebook.com/v2.6/"
};


const server = new Server(options);
server.start().then(()=>{
  console.log("Server started ");
}).catch((err)=>{
  console.error(err);
  throw new Error(err);
});