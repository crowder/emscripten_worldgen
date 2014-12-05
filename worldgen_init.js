
Module['print'] = console.log;
Module['printErr'] = function(text) { console.log('stderr: ' + text) };
Module['preInit'] = worldGenPreInit;
Module['preRun'] = worldGenPreRun;

function worldGenPreInit()
{
  FS.init(readStdin, writeStdout, writeStderr);
  console.log("preinit");
}

function worldGenPreRun()
{
  console.log("preRun");
  Module['postRun'].push(worldGenPostRun);
}

function worldGenPostRun()
{
  console.log("postRun");
  var gifdata = FS.readFile('foo.gif');
  var b64 = Base64.encode(gifdata);
  if (typeof document != 'undefined') {
    var wgimg = document.createElement("img");
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    console.log("drawing...");
    wgimg.src = "data:image/gif;base64," + b64;
    wgimg.onload = function () { ctx.drawImage(wgimg, 0, 0); };
  }
}

var stdinBuffer = "50\n50\n20\n30\nfoo\n";
var stdinCatbuf = "";
function readStdin(stream, buffer, offset, length, pos /* ignored */)
{
  code = stdinBuffer.charCodeAt(0);
  if (code == 10) {
    writeStdout(code);
    writeStderr(code);
  } else {
    stdinCatbuf = stdinCatbuf.concat(stdinBuffer.charAt(0));
  }
  stdinBuffer = stdinBuffer.substr(1);
  return code;
}

var stdoutBuffer = "";
function writeStdout(ch)
{
  if (ch != 10) {
    stdoutBuffer = stdoutBuffer.concat(String.fromCharCode(ch));
  } else if (stdoutBuffer.length > 0) {
    console.log(stdoutBuffer + stdinCatbuf);
    stdinCatbuf = "";
    stdoutBuffer = "";
  }
}

var stderrBuffer = "";
function writeStderr(ch)
{
  if (ch != 10) {
    stderrBuffer = stderrBuffer.concat(String.fromCharCode(ch));
  } else if (stderrBuffer.length > 0) {
    console.log(stderrBuffer + stdinCatbuf);
    stdinCatbuf = "";
    stderrBuffer = "";
  }
}
