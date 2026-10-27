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
textarea.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
        autocomplete();
    }
});

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

// the first word picks the command, the rest is passed to it as arguments
function commander(cmd) {
    let [name, ...args] = cmd.split(/\s+/);
    if (Object.prototype.hasOwnProperty.call(commandsEnum, name)) {
        commandsEnum[name].cmd(args)
    } else {
        commandsEnum.error.cmd()
    }
}

// Tab: complete a unique command, extend to the common prefix, or list the candidates
function autocomplete() {
    let input = nl2br(textarea.value).trim().toLowerCase();
    if (input === "") {
        return;
    }
    let matches = Object.keys(commandsEnum)
        .filter(k => commandsEnum[k].listable || commandsEnum[k].completable)
        .filter(k => k.startsWith(input))
        .sort();
    if (matches.length === 0) {
        return;
    }
    let prefix = matches.reduce((a, b) => {
        let i = 0;
        while (i < a.length && a[i] === b[i]) i++;
        return a.slice(0, i);
    });
    if (prefix.length > input.length) {
        setInput(prefix);
    } else if (matches.length > 1) {
        addLine(lineStart + escapeHtml(input), "no-animation", 0);
        addLine(matches.join("  "), "command margin", 0);
    }
}
