const http = require('http');
const Bot = require('messenger-bot');
const Conversation = require("./conversation");
const DEFAULT_OPTS = {
  port: 3000,
  token: "YOUR_PAGE_TOKEN",
  graph_url: "https://graph.facebook.com/v2.6/",
  app_secret: false,
  verify_token: false
};
class Server {

  constructor(opts = {}) {
    //Set options
    this.port = opts.port ? opts.port : DEFAULT_OPTS.port;
    this.page_token = opts.token ? opts.token : DEFAULT_OPTS.token;
    this.graph_url = opts.graph_url ? opts.graph_url : DEFAULT_OPTS.graph_url;
    this.app_secret = opts.app_secret ? opts.app_secret : DEFAULT_OPTS.app_secret;
    this.verify_token = opts.verify_token ? opts.verify_token : DEFAULT_OPTS.verify_token;

    this.conversations = {}
  }

  getOrCreateConversation(userId) {

    if (typeof this.conversations[userId] === "undefined") {
      this.conversations[userId] = new Conversation(userId)
    }
    return this.conversations[userId]
  }

  /**
   * Create a new instance of the bot
   */
  createBot() {
    this.bot = new Bot({
      "graph_url": this.graph_url,
      "token": this.page_token,
      "app_secret": this.app_secret,
      "verify_token": this.verify_token
    });

    this.bot.on('error', (err) => {
      console.log(err.message)
    });

    this.bot.on('message', (payload, reply) => {
      let text = payload.message.text;
      console.log("new msg");
      let conversation = this.getOrCreateConversation(payload.sender.id);


      conversation.processMessage(text).then((messages) => {
        messages.forEach((msg) => {
          let text = msg.content;
          reply({text}, (err) => {
            if (err) throw err;
            console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`)
          })
        });

      })

      this.bot.getProfile(payload.sender.id, (err, profile) => {
        if (err) throw err;


      })
    });


  }

  /**
   * Start the server and return a promise
   * @returns {Promise}
   */
  start() {

    this.createBot();
    this.httpServer = http.createServer(this.bot.middleware());

    return new Promise((resolve, reject) => {
      this.httpServer.listen(this.port, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      });
    });

  }

  stop() {
    return new Promise((resolve, reject) => {

      this.httpServer.close((err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })

    })
  }
}
module.exports = Server;