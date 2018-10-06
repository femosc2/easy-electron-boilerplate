const electron = require("electron");

const { webFrame } = require('electron');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on("closed", () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Test Window"
    });
    addWindow.loadURL(`file://${__dirname}/testWindow.html`);
    addWindow.on("closed", () => addWindow = null);
}

function createHelpWindow() {
    addWindow = new BrowserWindow({
        width: 1680,
        height: 1050,
        title: "Test Window"
    });
    addWindow.loadURL(`https://github.com/femosc2/easy-electron-boilerplate`);
    addWindow.on("closed", () => addWindow = null);
}

function reloadWindow() {
    // Reloads the window
    mainWindow.reload();
}

function zoomIn() {
    // Not Working Yet
    webFrame.setZoomFactor(2);
}

function zoomOut() {
    // Not Working Yet
    webFrame.setZoomFactor(-2);
}

function fullScreen() {
    // Sets fullscreen, toggleable
    let isFullScreen = false;
    if (isFullScreen === false) {
        mainWindow.setFullScreen(true);
        isFullScreen = true;
    } if (isFullScreen === true) {
        mainWindow.setFullScreen(false); // This is required for the setSize function to work
        mainWindow.setSize(800, 600, true);
        isFullScreen = false;
    }
}

function minimize() {
    // Minimizes the window
    mainWindow.setFullScreen(false); // This is required in order for the window to minimize if it is in fullscreen
    mainWindow.minimize();
}

function mute() {
    // mutes the playing audio, toggleable
    let isMute = false;
    // var vid = document.getElementById("ELEMENT GOES HERE ");
    if (isMute === false) {
        // vid.muted = true;
        isMute = true;
    } else if (isMute === True) {
        // vid.muted = false;
        isMute = false;
    }
}


const menuTemplate = [
    {
        label: "File",
        submenu: [
            // Creates a new Test Window
            { label: "New Test Window",
            accelerator: process.platform === "darwin" ? "Command+N" : "Ctrl+N",
            click() { createAddWindow(); }
            },
            {
            // Quits the app and closes the window
            label: "Quit",
            accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
            click() { app.quit(); }
            },
        ]
    },
    {
        label: "Edit",
        submenu: [
            { label: "Undo",
            accelerator: process.platform === "darwin" ? "Command+Z" : "Ctrl+Z",
            selector: "undo:"
            },
            { label: "Redo",
            accelerator: process.platform === "darwin" ? "Shift+Command+Z" : "Shift+Ctrl+Z",
            selector: "redo:"
            },
            {
            label: "Cut",
            accelerator: process.platform === "darwin" ? "Command+X" : "Ctrl+X",
            selector: "cut:"
            },
            {
            label: "Copy",
            accelerator: process.platform === "darwin" ? "Command+C" : "Ctrl+C",
            selector: "copy:"
            },
            {
            label: "Paste",
            accelerator: process.platform === "darwin" ? "Command+V" : "Ctrl+V",
            selector: "paste:"
            },
            {
            label: "Select All",
            accelerator: process.platform === "darwin" ? "Command+A" : "Ctrl+A",
            selector: "selectAll:"
            },
        ]
    },
    {
        label: "View",
        submenu: [
            // Reloads the window
            { label: "Reload",
            accelerator: process.platform === "darwin" ? "Command+R" : "Ctrl+R",
            click() { reloadWindow(); }
            },
            // NOT IMPLEMENTED YET, Zooms in the window
            { label: "Zoom In",
            accelerator: process.platform === "darwin" ? "Command++" : "Ctrl++",
            click() { console.log("Should zoom in the page"); }
            },
            // NOT IMPLEMENTED YET, Zooms out the window
            { label: "Zoom Out",
            accelerator: process.platform === "darwin" ? "Command+-" : "Ctrl+-",
            click() { console.log("Should zoom out the page"); }
            },
            // Enters Fullscreen
            { label: "Fullscreen",
            accelerator: process.platform === "darwin" ? "Command+F" : "Ctrl+F",
            click() { fullScreen(); }
            },
        
        ]
    },
    {
        label: "Window",
        submenu: [
            // Minimizes the window
            { label: "Minimize",
            accelerator: process.platform === "darwin" ? "Command+M" : "Ctrl+M",
            click() { minimize(); }
            },
            // Mutes the audio playing elements
            { label: "Mute",
            accelerator: process.platform === "darwin" ? "Shift+Command+M" : "Shift+Ctrl+M",
            click() { mute(); }
            },
        ]
    },
    {
        label: "Help",
        submenu: [
            // Directs you to the readMe
            { label: "ReadMe",
            accelerator: process.platform === "darwin" ? "Command+H" : "Ctrl+H",
            click() { createHelpWindow(); }
            },
        ]
    },
];

if (process.platform === "darwin") {
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production" ) {
    // checks for the development environment, shows a developer option for production.
    menuTemplate.push({
        label: "Developer",
        submenu: [
            {
                label: "Toggle Developer Tools",
                accelerator: process.platform === "darwin" ? "Alt+Command+I" : "Shift+Ctrl+I",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]

    });
}