var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

const lineStart = "guest@lautz:~$ "

var git = 0;
var pw = false;
let pwd = false;
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
    // console.log(e.keyCode);
    if (e.keyCode == 27) {
        commandsEnum.clear.cmd()
    }
    if (pw) {
        let et = "*";
        let w = textarea.value.length;
        command.innerHTML = et.repeat(w);
        if (textarea.value === password) {
            pwd = true;
        }
        if (pwd && e.keyCode == 13) {
            loopLines(secret, "color2 margin", 120);
            command.innerHTML = "";
            textarea.value = "";
            pwd = false;
            pw = false;
            liner.classList.remove("password");
        } else if (e.keyCode == 13) {
            addLine("Wrong password", "error", 0);
            command.innerHTML = "";
            textarea.value = "";
            pw = false;
            liner.classList.remove("password");
        }
    } else {
        if (e.keyCode == 13) {
            commands.push(command.innerHTML);
            git = commands.length;
            addLine(lineStart + command.innerHTML, "no-animation", 0);
            commander(command.innerHTML.toLowerCase());
            command.innerHTML = "";
            textarea.value = "";
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
}

function commander(cmd) {

    if (cmd in commandsEnum) {
        eval(`commandsEnum.${cmd}.cmd()`)
    } else {
        commandsEnum.error.cmd()
    }

    // switch (cmd.toLowerCase()) {
    //     case "whois":
    //         loopLines(whois, "color2 margin", 80);
    //         break;
    //     case "secret":
    //         liner.classList.add("password");
    //         pw = true;
    //         break;
    //     case "email":
    //         addLine('Opening mailto:<a href="mailto:gmail">gmail</a>...', "color2", 80);
    //         newTab(email);
    //         break;
    //     // socials
    //     case "github":
    //         addLine("Opening GitHub...", "color2", 0);
    //         newTab(github);
    //         break;
    //     default:
    //         break;
    // }
}


