const http = require('http');
const Bot = require('messenger-bot');

let bot = new Bot({
  token: 'PAGE_TOKEN',
  verify: 'VERIFY_TOKEN',
  app_secret: 'APP_SECRET',
  graph_url: "http://localhost:3100/v2.6"
});

bot.on('error', (err) => {
  console.log(err.message)
});

bot.on('message', (payload, reply) => {
  let text = payload.message.text;

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err;

    reply({ text }, (err) => {
      if (err) throw err;

      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
    })
  })
});

http.createServer(bot.middleware()).listen(3000, (err)=>{
  if(err){
    throw new Error(err)
  }
  console.log('Echo bot server running at port 3000.');
});
