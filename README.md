# Lautz97.github.io

Personal website of Davide "Lautz97" Lauterio, published with GitHub Pages at <https://lautz97.github.io>.

The site is an interactive terminal written in plain HTML, CSS and JavaScript: no build step and no dependencies. Open `index.html` through any static server to run it locally, for example:

```sh
python3 -m http.server
```

## Structure

| Path | Content |
| --- | --- |
| `index.html` | Page skeleton and script loading |
| `css/style.css` | Terminal look, animations and the small-screen layout |
| `js/commands.js` | Every command and its text (add new commands here) |
| `js/main.js` | Input handling, history and command dispatch |
| `js/utils.js` | Helpers that print lines to the terminal |
| `js/caret.js` | Mirrors the hidden textarea into the visible prompt |
| `img/` | Self-hosted icons (itch.io logo from Simple Icons, CC0) |
| `tetriwall/` | Privacy policy and terms of service for Tetriwall (no longer linked) |

A command is an entry of `commandsEnum` with a `cmd` function. The first word typed picks the command and the remaining words are passed to `cmd` as an array of arguments. Entries with `listable: true` and a `description` appear in `help`; Tab completes those and the ones marked `completable: true`. Anything else is a hidden command (the easter eggs live at the end of the file).

The projects in progress are listed by command name in `activeprojects.names`.

## Branching model

The repository follows [git-flow](https://nvie.com/posts/a-successful-git-branching-model/):

- `main` is what GitHub Pages publishes; it only receives merges from `release/*` and `hotfix/*` branches, and each merge is tagged (`vX.Y.Z`).
- `develop` collects finished work for the next release.
- `feature/<name>` and `bugfix/<name>` branch off `develop` and are merged back into it with `--no-ff`.
- `release/X.Y.Z` branches off `develop` when it is ready to ship, then is merged into `main` and back into `develop`.
- `hotfix/X.Y.Z` branches off `main` for urgent fixes to the live site, then is merged into `main` and `develop`.
