const BotTester = require('messenger-bot-tester');
const Server = require("./../src/server");
const contextUtil = require("./../src/context");
const {expect,should} = require("chai");
describe('Context test', function() {

  it('Should add a lang to the context', function(){

    let context = {};

    contextUtil.addProgrammingLangToContext(context, ["python"]);

    expect(context.known_langs).to.be.instanceOf(Array);
    expect(context.known_langs.length).to.equal(1);
    expect(context.known_langs[0]).to.equal("python");

  });


  it('Should only add new languages to the context', function(){

    let context = {};

    contextUtil.addProgrammingLangToContext(context, ["python"]);
    contextUtil.addProgrammingLangToContext(context, ["python"]);
    contextUtil.addProgrammingLangToContext(context, ["c#"]);

    expect(context.known_langs).to.be.instanceOf(Array);
    expect(context.known_langs.length).to.equal(2);
    expect(context.known_langs[0]).to.equal("python");

  });


});