var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

const lineStart = "guest@lautz:~$ "

var git = 0;
var commands = [];

setTimeout(function () {
    commandsEnum.banner.cmd()
    textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

//init
textarea.value = "";
command.innerHTML = textarea.value;

function enterKey(e) {
    if (e.keyCode == 27) {
        document.location.reload(true);
    }
    if (e.keyCode == 13) {
        SendCommand();
    }
    if (e.keyCode == 38 && git != 0) {
        git -= 1;
        textarea.value = commands[git];
        command.innerHTML = textarea.value;
    }
    if (e.keyCode == 40 && git != commands.length) {
        git += 1;
        if (commands[git] === undefined) {
            textarea.value = "";
        } else {
            textarea.value = commands[git];
        }
        command.innerHTML = textarea.value;
    }
}

function SendCommand() {
    commands.push(command.innerHTML);
    git = commands.length;
    addLine(lineStart + command.innerHTML, "no-animation", 0);
    commander(command.innerHTML.toLowerCase());
    command.innerHTML = "";
    textarea.value = "";
}

function clickCommand(cmd) {
    textarea.value = cmd;
    command.innerHTML = textarea.value;
    SendCommand();
    textarea.focus();
}

function commander(cmd) {
    if (cmd in commandsEnum) {
        eval(`commandsEnum.${cmd}.cmd()`)
    } else {
        commandsEnum.error.cmd()
    }
}
