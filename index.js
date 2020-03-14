//const core = require("@actions/core");
//const github = require("@actions/github");
const exec = require("@actions/exec");

async function getElixirEnviroment() {
  let output = "";

  const options = {
    silent: true,
    failOnStdErr: true,
    listeners: {
      stdout: data => {
        output += data.toString();
      }
    }
  };
  await exec.exec("elixir", ["--version"], options);
  const [, erlang] = output.match(/Erlang\/OTP ([^\s]+)/);
  const [, elixir] = output.match(/Elixir ([^\s]+)/);

  return { erlang, elixir };
}

try {
  const foo = async function() {
    console.log(await getElixirEnviroment());
  };
  foo();

  // `who-to-greet` input defined in action metadata file
  //const nameToGreet = core.getInput("who-to-greet");
  //console.log(`Hello ${nameToGreet}!`);
  //const time = new Date().toTimeString();
  //core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2);
  //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
