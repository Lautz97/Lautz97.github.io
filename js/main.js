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
setInput("");

function setInput(value) {
    textarea.value = value;
    command.textContent = value;
}

function enterKey(e) {
    if (e.key === "Escape") {
        document.location.reload();
    }
    if (e.key === "Enter") {
        SendCommand();
    }
    if (e.key === "ArrowUp" && git != 0) {
        git -= 1;
        setInput(commands[git]);
    }
    if (e.key === "ArrowDown" && git != commands.length) {
        git += 1;
        setInput(commands[git] === undefined ? "" : commands[git]);
    }
}

function SendCommand() {
    let input = nl2br(textarea.value).trim();
    setInput("");
    addLine(lineStart + escapeHtml(input), "no-animation", 0);
    if (input === "") {
        return;
    }
    commands.push(input);
    git = commands.length;
    commander(input.toLowerCase());
}

function clickCommand(cmd) {
    setInput(cmd);
    SendCommand();
    textarea.focus();
}

function commander(cmd) {
    if (Object.prototype.hasOwnProperty.call(commandsEnum, cmd)) {
        commandsEnum[cmd].cmd()
    } else {
        commandsEnum.error.cmd()
    }
}
