const markdownParser = import("./md/markdownParser.js");

const github = "https://github.com/Lautz97/";
const githubIcon = `<img src="https://img.icons8.com/stickers/25/null/github.png"/>`
const sprintIcon = `<img src="https://img.icons8.com/fluency/25/null/sprint-iteration.png"/>`

const kofi = 'https://ko-fi.com/lautz97'
const kofiIcon = `<img src="https://img.icons8.com/clouds/50/null/ko-fi.png"/>`

const linkedin = "https://www.linkedin.com/in/lautz97"
const linkedinIcon = '<img src="https://img.icons8.com/color/50/null/linkedin.png"/>'

const instagram = "https://www.instagram.com/Lautz97/"
const instagramIcon = '<img src="https://img.icons8.com/arcade/50/null/instagram-new.png"/>'

const telegram = 'https://t.me/lautz97'
const telegramIcon = '<img src="https://img.icons8.com/color/50/null/telegram-app--v1.png"/>'

const email = 'mailto:davide.lauterio@gmail.com'
const emailIcon = '<img src="https://img.icons8.com/plasticine/50/null/apple-mail.png"/>'

const mailingListForm = 'https://forms.gle/4aj8D76gMXLKKAdKA'
const mailingListIcon = '<img src="https://img.icons8.com/doodle/50/null/newsletter.png"/>'

const commandsEnum = {
    help: {
        description: "You have just typed this. Have you already forget what it does?",
        cmd: function () {
            let message = []
            message.push("<br>")

            let row = "", desc = ""

            Object.keys(commandsEnum).sort().forEach(k => {
                if (eval(`commandsEnum.${k}.listable`)) {
                    while (k.length < 18) {
                        k += " "
                    }
                    desc = eval(`commandsEnum.${k}.description`)
                    row = `<span><pre style="display:inline; font-size:125%"><span class="command">${k}</span>${desc}</pre></span>`
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

    whoislautz: {
        description: "Informations about the author.",
        cmd: function () {
            loopLines([...commandsEnum.whoislautz.textArray(),], "", 80)
        },
        listable: true,
        textArray: () => [
            "<br>",
            "<span class='color2'>Davide <span class='command'>Lautz97</span> Lauterio</span>",
            "<br>",
            "<span class='color2'>Graduate in Engineering of Informations (bachelor's degree).</span>",
            "<span class='color2'>Student of Computer and Systems Engineering (master's degree).</span>",
            "<span class='color2'>Game developer.</span>",
            "<br>",
            "<span class='color2'>At the moment working on: </span>",
            "<br>",
            ...commandsEnum.activeprojects.textArray(),
            "<span>If you want to support me: </span>",
            ...commandsEnum.support.textArray(),
            "<span>If I got you interested, you can contact me for more informations</span>",
            ...commandsEnum.social.textArray(),
        ]
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
                "<br>",
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
                "<a href=\"https://icons8.it/\" class=\"creditsText colorLink\" >Icons by Icons8.</a>",
                "<br>",
            ];
            loopLines(banner, "", 80);

        },
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
                        }, 250)
                    }, 500)
                }, 500)
            }, 500)
        },
        listable: true
    },

    social: {
        description: "Contact informations and social networks",
        cmd: function () {
            loopLines([...commandsEnum.social.textArray()], "", 90)
        },
        listable: true,
        textArray: () => [
            "<br>",
            `<span class="color2 margin"><a href='${email}' target="_blank" rel="noopener noreferrer">${emailIcon}Send me an email</a></span>`,
            //`<span class="color2 margin"><a href='${instagram}' target="_blank" rel="noopener noreferrer">${instagramIcon}Reach to me on Instagram</a></span>`,
            `<span class="color2 margin"><a href='${telegram}' target="_blank" rel="noopener noreferrer">${telegramIcon}Reach to me via Telegram</a></span>`,
            `<span class="color2 margin"><a href='${mailingListForm}' target="_blank" rel="noopener noreferrer">${mailingListIcon}or send me your mail address to receive updates on my projects.</a></span>`,
            `<span class="color2 margin"><a href='${linkedin}' target="_blank" rel="noopener noreferrer">${linkedinIcon}... or if you really want to, on LinkedIn</a></span>`,
            "<br>",
        ],
    },

    support: {
        description: "Offer me a coffe!",
        cmd: function () {
            addLine("Opening ko-fi <3 Thanks bud!", "color2 margin", 80);
            window.open('https://ko-fi.com/lautz97', '_blank').focus()
        },
        listable: true,
        textArray: () => [
            "<br>",
            `<span class="colorlink">Offer me a coffe!</span>`,
            `<span class="color2 margin"><a href='https://ko-fi.com/lautz97' target="_blank" rel="noopener noreferrer">${kofiIcon}</a></span>`,
            "<br>",
        ],
    },

    projects: {
        description: "List of projects made fully or partially by Lautz97",
        cmd: function () {
            loopLines([...commandsEnum.projects.textArray(), "<br>"], "", 90)
        },
        textArray: () => [
            `<span class="color2">Projects actually in progress: </span>`,
            ...commandsEnum.activeprojects.textArray(),
            `<span class="color2">Archived projects: </span>`,
            ...commandsEnum.archivedprojects.textArray(),
        ],
        listable: true
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
            loopLines([...commandsEnum.tetriwall.textArray()], "", 90)
        },
        textArray: () => [
            `<span class="colorlink">Tetriwall</span>`,
            `<span class="color2 margin"><a href='https://github.com/Lautz97/TetriWall' target="_blank" rel="noopener noreferrer">${githubIcon} Open on GitHub</a></span>`,
            `<span class="color2 margin"><a href='https://github.com/Lautz97/TetriWall/wiki' target="_blank" rel="noopener noreferrer">${sprintIcon} Read the wiki</a></span>`,
            "<br>",
        ],
        listable: false
    },

    guessit: {
        cmd: function () {
            addLine(bind(commandsEnum.guessit.textMd()), "", 180)
        },
        textArray: () => [
            `<span class="colorlink">GuessIt is a mastermind replica for android</span>`,
            `<span class="colorlink">This was an old experiment.</span>`,
            `<span class="color2 margin"><a href='https://github.com/Lautz97/guessIt' target="_blank" rel="noopener noreferrer">${githubIcon} Open on GitHub</a></span>`,
            "<br>",
        ],
        textMd: () => `
    #GuessIt is a mastermind replica for android. 
    This was an old experiment.
    [${githubIcon} Open on GitHub]('https://github.com/Lautz97/guessIt')
        `,
        listable: false
    },

    activeprojects: {
        cmd: function () {
            commandsEnum.error.cmd()
        },
        textArray: () => [
            ...commandsEnum.tetriwall.textArray()
        ],
        listable: false
    },

    archivedprojects: {
        cmd: function () {
            commandsEnum.error.cmd()
        },
        textArray: () => [
            ...commandsEnum.guessit.textArray(),
        ],
        listable: false
    },
}
