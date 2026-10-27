const githubIcon = `<img src="https://img.icons8.com/stickers/25/null/github.png" alt=""/>`

const kofi = 'https://ko-fi.com/lautz97'
const kofiIcon = `<img src="https://img.icons8.com/clouds/50/null/ko-fi.png" alt=""/>`

const linkedin = "https://www.linkedin.com/in/lautz97"
const linkedinIcon = '<img src="https://img.icons8.com/color/50/null/linkedin.png" alt=""/>'

const telegram = 'https://t.me/lautz97'
const telegramIcon = '<img src="https://img.icons8.com/color/50/null/telegram-app--v1.png" alt=""/>'

const email = 'mailto:davide.lauterio@gmail.com'
const emailIcon = '<img src="https://img.icons8.com/plasticine/50/null/apple-mail.png" alt=""/>'

const mailingListForm = 'https://forms.gle/4aj8D76gMXLKKAdKA'
const mailingListIcon = '<img src="https://img.icons8.com/doodle/50/null/newsletter.png" alt=""/>'

const itchIcon = '<img src="img/itchio.svg" alt=""/>'

const protocolBreachItch = 'https://lautz97.itch.io/protocol-breach'
const protocolBreachBeta = `${email}?subject=${encodeURIComponent("Protocol Breach closed beta")}`

// a titled block of lines, omitted entirely when there is nothing to list
function section(title, lines) {
    return lines.length ? [title, "<br>", ...lines, "<br>"] : []
}

// ASCII progress bar, e.g. [##########----------] 50%
function progressBar(percent, width = 20) {
    let filled = Math.round(width * percent / 100)
    return `[${"#".repeat(filled)}${"-".repeat(width - filled)}] ${percent}%`
}

const commandsEnum = {
    help: {
        description: "You have just typed this. Have you already forgotten what it does?",
        cmd: function () {
            let message = []
            message.push("<br>")

            Object.keys(commandsEnum).sort().forEach(k => {
                if (commandsEnum[k].listable) {
                    let name = k.padEnd(12)
                    let desc = commandsEnum[k].description
                    message.push(`<span><pre class="help-row"><span class="command">${name}</span>${desc}</pre></span>`)
                }
            });

            message.push("<br>")
            loopLines(message, "color2 margin", 80);
        },
        listable: true
    },

    whoami: {
        description: "Information about the guest.",
        cmd: function () {
            addLine("<span>Nice philosophical question.</span>", "error margin", 2);
        },
        listable: true
    },

    whoislautz: {
        description: "Information about the author.",
        cmd: function () {
            loopLines([...commandsEnum.whoislautz.textArray(),], "", 80)
        },
        listable: true,
        textArray: () => [
            "<br>",
            "<span class='color2'>Davide <span class='command'>Lautz97</span> Lauterio</span>",
            "<br>",
            "<span class='color2'>Bachelor's degree in Information Engineering.</span>",
            "<span class='color2'>Master's degree in Computer and Systems Engineering.</span>",
            "<span class='color2'>Currently working as a Security Engineer.</span>",
            "<span class='color2'>Game developer.</span>",
            "<br>",
            ...section("<span class='color2'>At the moment working on: </span>", commandsEnum.activeprojects.textArray()),
            "<span class='color2'>If you want to support me: </span>",
            ...commandsEnum.support.textArray(),
            "<span class='color2'>If I got you interested, you can contact me for more information</span>",
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
            commandsEnum.banner.cmd();
        },
        listable: true
    },

    banner: {
        description: "Display website banner",
        cmd: function () {
            let banner = [
                "<br>",
                //https://patorjk.com/software/taag/#p=display&f=3D-ASCII&t=Lautz
                '<span class="ascii">   ___       ________  ___  ___  _________  ________                         </span>',
                '<span class="ascii">  |\\  \\     |\\   __  \\|\\  \\|\\  \\|\\___   ___\\\\_____  \\            </span>',
                '<span class="ascii">  \\ \\  \\    \\ \\  \\|\\  \\ \\  \\\\\\  \\|___ \\  \\_|\\|___/  /|       </span>',
                '<span class="ascii">   \\ \\  \\    \\ \\   __  \\ \\  \\\\\\  \\   \\ \\  \\     /  / /         </span>',
                '<span class="ascii">    \\ \\  \\____\\ \\  \\ \\  \\ \\  \\\\\\  \\   \\ \\  \\   /  /_/__      </span>',
                '<span class="ascii">     \\ \\_______\\ \\__\\ \\__\\ \\_______\\   \\ \\__\\ |\\________\\      </span>',
                '<span class="ascii">      \\|_______|\\|__|\\|__|\\|_______|    \\|__|  \\|_______|              </span>',
                '<span class="ascii">                                                                             </span>',
                "<span class=\"color2\">For a list of available commands, ask for </span> <span class=\"command\">help</span><span class=\"color2\">.</span>",
                "<a href=\"https://icons8.it/\" class=\"creditsText colorlink\" >Icons by Icons8.</a>",
                "<br>",
                ...commandsEnum.protocolbreachnews.textArray(),
                "<br/>",
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
                            addLine("Oh...wait...I cannot close windows that were not open by a script like me :(", "command margin", 80);
                        }, 250)
                    }, 500)
                }, 500)
            }, 500)
        },
        listable: true
    },

    social: {
        description: "Contact information and social networks",
        cmd: function () {
            loopLines([...commandsEnum.social.textArray()], "", 90)
        },
        listable: true,
        textArray: () => [
            "<br>",
            `<span class="color2 margin"><a href='${email}' target="_blank" rel="noopener noreferrer">${emailIcon}Send me an email</a></span>`,
            `<span class="color2 margin"><a href='${telegram}' target="_blank" rel="noopener noreferrer">${telegramIcon}Reach me on Telegram</a></span>`,
            `<span class="color2 margin"><a href='${mailingListForm}' target="_blank" rel="noopener noreferrer">${mailingListIcon}or send me your mail address to receive updates on my projects.</a></span>`,
            `<span class="color2 margin"><a href='${linkedin}' target="_blank" rel="noopener noreferrer">${linkedinIcon}... or if you really want to, on LinkedIn</a></span>`,
            "<br>",
        ],
    },

    support: {
        description: "Buy me a coffee!",
        cmd: function () {
            addLine("Opening ko-fi &lt;3 Thanks bud!", "color2 margin", 80);
            window.open(kofi, '_blank', 'noopener,noreferrer')
        },
        listable: true,
        textArray: () => [
            "<br>",
            `<span class="color2 margin"><a href='${kofi}' target="_blank" rel="noopener noreferrer">${kofiIcon}Buy me a coffee on Ko-fi</a></span>`,
            "<br>",
        ],
    },

    projects: {
        description: "List of projects made fully or partially by Lautz97",
        cmd: function () {
            loopLines([...commandsEnum.projects.textArray()], "", 90)
        },
        textArray: () => [
            ...section(`<span class="color2">Projects currently in progress: </span>`, commandsEnum.activeprojects.textArray()),
            ...section(`<span class="color2">Completed or paused projects: </span>`, commandsEnum.completedprojects.textArray()),
            ...section(`<span class="color2">Archived projects: </span>`, commandsEnum.archivedprojects.textArray()),
        ],
        listable: true
    },

    error: {
        description: "error",
        cmd: function () {
            addLine("<span class=\"inherit\">Command not found. For a list of commands, ask for <span class=\"command\">help</span>.</span>", "error", 100);
        },
        listable: false
    },

    lautz97: {
        cmd: function () {
            commandsEnum.whoislautz.cmd()
        },
        listable: false
    },

    protocolbreachnews: {
        cmd: function () {
            loopLines([...commandsEnum.protocolbreachnews.textArray()], "", 90)
        },
        textArray: () => [
            `<span class="headline">PROTOCOL BREACH IS IN CLOSED BETA!</span>`,
            `<span class="color2 margin"><a href='${protocolBreachBeta}' target="_blank" rel="noopener noreferrer">${emailIcon}Send me an email to join</a></span>`,
            `<span class="color2 margin"><a href='${protocolBreachItch}' target="_blank" rel="noopener noreferrer">${itchIcon}Follow it on itch.io</a></span>`,
            "<br>",
            `<span class="color2">Type </span><span class="command">protocolbreach</span><span class="color2"> to know more.</span>`,
        ],
        listable: false
    },

    tetriwall: {
        cmd: function () {
            loopLines([...commandsEnum.tetriwall.textArray()], "", 90)
        },
        textArray: () => [
            `<span class="colorlink">Tetriwall</span>`,
            `<span class="color2 margin">Abandoned for lack of time: the last version is still available on itch.io.</span>`,
            `<span class="color2 margin"><a href='https://lautz97.itch.io/tetriwall' target="_blank" rel="noopener noreferrer">${itchIcon}Download it for free on itch.io</a></span>`,
            `<span class="color2 margin"><a href='https://github.com/Lautz97/TetriWall' target="_blank" rel="noopener noreferrer">${githubIcon}Open on GitHub</a></span>`,
            `<span class="color2 margin creditsText"><a href='/tetriwall/tetriwall-privacy-policy.html' target="_blank" rel="noopener noreferrer">Read the privacy policy</a></span>`,
            `<span class="color2 margin creditsText"><a href='/tetriwall/tetriwall-terms-of-service.html' target="_blank" rel="noopener noreferrer">Read the terms of service</a></span>`,
        ],
        listable: false
    },


    guessit: {
        cmd: function () {
            loopLines([...commandsEnum.guessit.textArray()], "", 90)
        },
        textArray: () => [
            `<span class="colorlink">GuessIt</span>`,
            `<span class="color2 margin">A Mastermind replica for Android, an old experiment.</span>`,
            `<span class="color2 margin"><a href='https://github.com/Lautz97/guessIt' target="_blank" rel="noopener noreferrer">${githubIcon}Open on GitHub</a></span>`,
        ],
        listable: false
    },

    protocolbreach: {
        cmd: function () {
            loopLines([...commandsEnum.protocolbreach.textArray(), "<br>"], "", 90)
        },
        summary: `<span class="margin"><span class="command">protocolbreach</span> <span class="color2">- cyberpunk tactical infiltration roguelite</span></span>`,
        textArray: () => [
            "<br>",
            `<span class="colorlink">Protocol Breach</span>`,
            `<span class="color2 margin">Real-time cyberpunk infiltration roguelite.</span>`,
            `<span class="color2 margin">Jack into a corporate network, breach its nodes and complete the contract before the trace finds you.</span>`,
            "<br>",
            `<span class="margin"><span class="color2">Status:  </span>${progressBar(50)} in development, closed beta running</span>`,
            `<span class="margin"><span class="color2">Tech:    </span>Godot 4.6, GDScript</span>`,
            `<span class="margin"><span class="color2">Updated: </span>2026-10-24</span>`,
            "<br>",
            `<span class="color2 margin"><a href='${protocolBreachBeta}' target="_blank" rel="noopener noreferrer">${emailIcon}Want to join the closed beta? Send me an email</a></span>`,
            `<span class="color2 margin"><a href='${protocolBreachItch}' target="_blank" rel="noopener noreferrer">${itchIcon}Follow it on itch.io</a></span>`,
        ],
        listable: false
    },

    activeprojects: {
        cmd: function () {
            commandsEnum.error.cmd()
        },
        // one clickable summary per project in progress; the section is hidden while empty
        textArray: () => [
            commandsEnum.protocolbreach.summary,
        ],
        listable: false
    },

    completedprojects: {
        cmd: function () {
            commandsEnum.error.cmd()
        },
        // the section is hidden while empty
        textArray: () => [],
        listable: false
    },

    archivedprojects: {
        cmd: function () {
            commandsEnum.error.cmd()
        },
        textArray: () => [
            ...commandsEnum.tetriwall.textArray(),
            "<br>",
            ...commandsEnum.guessit.textArray(),
        ],
        listable: false
    },
}
