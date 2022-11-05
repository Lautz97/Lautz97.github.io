const githubIcon = `<img src="https://img.icons8.com/stickers/25/null/github.png"/>`
const sprintIcon = `<img src="https://img.icons8.com/fluency/25/null/sprint-iteration.png"/>`
const kofiIcon = `<img src="https://img.icons8.com/clouds/50/null/ko-fi.png"/>`
const commandsEnum = {
    help: {
        description: "You have just typed this. Have you already forget what it does?",
        cmd: function () {
            let message = []
            message.push("<br>")

            let row = "", desc = "", tab = ""

            Object.keys(commandsEnum).sort().forEach(k => {
                if (eval(`commandsEnum.${k}.listable`)) {
                    if (k.length > 8) tab = "\t"
                    else if (k.length >= 4) tab = "\t\t"
                    else if (k.length >= 0) tab = "\t\t\t"
                    desc = eval(`commandsEnum.${k}.description`)
                    row = `<span><pre style="display:inline"><span class="command">${k + tab}</span>${desc}</pre></span>`
                    message.push(row)
                }
            });

            message.push("<br>")
            loopLines(message, "color2 margin", 80);
        },
        listable: true
    },

    whoami: {
        description: "Informations about the guest.",
        cmd: function () {
            addLine("<span>Nice philosofical question.</span>", "error margin", 2);
        },
        listable: true
    },


    history: {
        description: "Show commands history",
        cmd: function () {
            addLine("<br>", "", 0);
            loopLines(commands, "command", 80);
            addLine("<br>", "command", 80 * commands.length + 50);
        },
        listable: true
    },

    clear: {
        description: "Clear terminal screen",
        cmd: function () {
            setTimeout(function () {
                terminal.innerHTML = '<a id="before"></a>';
                before = document.getElementById("before");
            }, 1);
        },
        listable: true
    },

    banner: {
        description: "Display website banner",
        cmd: function () {
            banner = [
                //https://patorjk.com/software/taag/#p=display&f=3D-ASCII&t=Lautz
                // '<span class="index">Lautz cmd explorer</span>',
                '<span>   ___       ________  ___  ___  _________  ________                         </span>',
                '<span>  |\\  \\     |\\   __  \\|\\  \\|\\  \\|\\___   ___\\\\_____  \\            </span>',
                '<span>  \\ \\  \\    \\ \\  \\|\\  \\ \\  \\\\\\  \\|___ \\  \\_|\\|___/  /|       </span>',
                '<span>   \\ \\  \\    \\ \\   __  \\ \\  \\\\\\  \\   \\ \\  \\     /  / /         </span>',
                '<span>    \\ \\  \\____\\ \\  \\ \\  \\ \\  \\\\\\  \\   \\ \\  \\   /  /_/__      </span>',
                '<span>     \\ \\_______\\ \\__\\ \\__\\ \\_______\\   \\ \\__\\ |\\________\\      </span>',
                '<span>      \\|_______|\\|__|\\|__|\\|_______|    \\|__|  \\|_______|              </span>',
                '<span>                                                                             </span>',
                '<span class="color2"></span>',
                "<span class=\"color2\">For a list of available commands, ask for </span> <span class=\"command\">'help'</span><span class=\"color2\">.</span>",
            ];
            loopLines(banner, "", 80);

        },
        listable: true
    },
    projects: {
        description: "List of projects made fully or partially by Lautz97",
        cmd: function () {
            loopLines(commandsEnum.projects.textArray, "", 90)
        },
        textArray: [
            `<span class="color2">Projects actually in progress: </span>`,
            ...commandsEnum.activeProjects.textArray,
            `<span class="color2">Archived projects: </span>`,
            ...commandsEnum.archivedProjects.textArray,
        ],
        listable: true
    },

    exit: {
        description: "Close this website",
        cmd: function () {
            addLine("3...", "command margin", 80);
            setTimeout(() => {
                addLine("2...", "command margin", 80);
                setTimeout(() => {
                    addLine("1...", "command margin", 80);
                    setTimeout(() => {
                        addLine("CLOSING...", "command margin", 80);
                        setTimeout(() => {
                            window.close()
                            addLine("Oh...wait...I cannot close windows that were not open by a script like me :(", "command margin", 80 * commands.length + 50);
                        }, 500)
                    }, 1000)
                }, 1000)
            }, 1000)
        },
        listable: true
    },

    support: {
        description: "Offer me a coffe!",
        cmd: function () {
            addLine("Opening ko-fi <3 Thanks bud!", "color2 margin", 80);
            window.open('https://ko-fi.com/lautz97', '_blank').focus()
        },
        listable: true,
        textArray: [
            `<span class="colorlink">Offer me a coffe!</span>`,
            `<span class="color2 margin"><a href='https://ko-fi.com/lautz97' target="_blank" rel="noopener noreferrer">${kofiIcon}</a></span>`,
        ],
    },

    blank: {
        description: "blank",
        cmd: function () { console.log("do nothing"); },
        listable: false
    },
    error: {
        description: "error",
        cmd: function () {
            addLine("<span class=\"inherit\">Command not found. For a list of commands, ask for <span class=\"command\">'help'</span>.</span>", "error", 100);
        },
        listable: false
    },
    tetriwall: {
        cmd: function () {
            loopLines(commandsEnum.tetriwall.textArray, "", 90)
        },
        textArray: [
            `<span class="colorlink">Tetriwall</span>`,
            `<span class="color2 margin"><a href='https://github.com/Lautz97/TetriWall' target="_blank" rel="noopener noreferrer">${githubIcon} Open on GitHub</a></span>`,
            `<span class="color2 margin"><a href='https://github.com/Lautz97/TetriWall/wiki' target="_blank" rel="noopener noreferrer">${sprintIcon} Read the wiki</a></span>`

        ],
        listable: false
    },

    guessIt: {
        cmd: function () {
            loopLines(commandsEnum.guessIt.textArray, "", 90)
        },
        textArray: [
            `<span class="colorlink">GuessIt: a mastermind replica for android</span>`,
            `<span class="colorlink">This was an old experiment.</span>`,
            `<span class="color2 margin"><a href='https://github.com/Lautz97/guessIt' target="_blank" rel="noopener noreferrer">${githubIcon} Open on GitHub</a></span>`,
        ],
        listable: false
    },

    activeProjects: {
        cmd: function () {
            commandsEnum.error.cmd()
        },
        textArray: [
            ...commandsEnum.tetriwall.textArray,
        ],
        listable: false
    },

    archivedProjects: {
        cmd: function () {
            commandsEnum.error.cmd()
        },
        textArray: [
            ...commandsEnum.guessIt.textArray,
        ],
        listable: false
    },


    whoislautz: {
        description: "Informations about the author.",
        cmd: function () {
            loopLines([...commandsEnum.whoislautz.textArray, "<br>"], "", 80)
        },
        listable: true,
        textArray: [
            "<span>Lautz97, student of InfoTech Engineering.</span>",
            "<span>Game developer.</span>",
            "<span>At the moment working on: </span>",
            ...commandsEnum.activeProjects.textArray,
            "<span>If you want to support me: </span>",
            ...commandsEnum.support.textArray
        ]
    },
}
