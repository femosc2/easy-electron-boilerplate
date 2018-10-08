const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain, Tray } = electron;

const path = require("path");

let mainWindow;
let addWindow;
let helpWindow;

app.on("ready", () => {
    // Starts the app, make sure to change the .loadURL to your own filepath
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadURL(`file://${__dirname}/main.html`); // CHANGE HERE
    mainWindow.on("closed", () => app.quit());

    const trayName = process.platform === "win32" ? "windowstest.png" : "test.png"; // creates a tray icon depending on what platform you are on.
    const trayPath = path.join(__dirname, `./src/assets/${trayName}`);              // Change the Icons in the src/assets/folder
    new Tray(trayPath);

    const mainMenu = Menu.buildFromTemplate(menuTemplate); // Builds a new menu
    Menu.setApplicationMenu(mainMenu); // Sets the applications menu from the standard chrome one to the customized one.
});

function createAddWindow(width, height) {
    // Creates a new window, use the width and height as parameters
    addWindow = new BrowserWindow({
        width: width,
        height: height,
        title: "Test Window"
    });
    addWindow.loadURL(`file://${__dirname}/testWindow.html`);
    addWindow.on("closed", () => addWindow = null);
    lastFocusedWindow = BrowserWindow.getFocusedWindow().id;
}

function createHelpWindow(width, height) {
    // Creates a new window with the readMe on the repo open, use the width and height to determine the size of the window
    helpWindow = new BrowserWindow({
        width: width,
        height: height,
        title: "Test Window"
    });
    helpWindow.loadURL(`https://github.com/femosc2/easy-electron-boilerplate`);
    helpWindow.on("closed", () => helpWindow = null);
}

function reloadWindow() {
    // Reloads the window
    BrowserWindow.getFocusedWindow().reload();
}

function fullScreen() {
    // Sets fullscreen, toggleable
    try {
    if (BrowserWindow.getFocusedWindow().isFullScreen() === false) {
        BrowserWindow.getFocusedWindow().setFullScreen(true);
    } else if (BrowserWindow.getFocusedWindow().isFullScreen() === true) {
        BrowserWindow.getFocusedWindow().setFullScreen(false); // This is required for the setSize function to work
        BrowserWindow.getFocusedWindow().setSize(800, 600, true);
    }
    } catch(err) {
        mainWindow.restore();
        mainWindow.setFullScreen(true);
    }
}

function minimize() {
    // Minimizes the window
    try {
        BrowserWindow.getFocusedWindow().setFullScreen(false); // This is required in order for the window to minimize if it is in fullscreen
        BrowserWindow.getFocusedWindow().minimize();
    }catch (err) {
        mainWindow.restore();
    }
}   

function mute() {
    // mutes the playing audio, toggleable
    let isMute = false;
    // var vid = document.getElementById("ELEMENT GOES HERE ");
    if (isMute === false) {
        // vid.muted = true;
        console.log("Mute");
        isMute = true;
    } else if (isMute === true) {
        // vid.muted = false;
        console.log("Unmuted");
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
            click() { createAddWindow(300, 300); }
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
            {
            label: "Undo",
            accelerator: process.platform === "darwin" ? "Command+Z" : "Ctrl+Z",
            selector: "undo:"
            },
            { 
            label: "Redo",
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
            // Toggles Fullscreen
            { label: "Toggle Fullscreen",
            accelerator: process.platform === "darwin" ? "Command+F" : "Ctrl+F",
            click() { fullScreen(); }
            },
        
        ]
    },
    {
        label: "Window",
        submenu: [
            // Toggles Minimization
            { label: "Toggle Minimize",
            accelerator: process.platform === "darwin" ? "Command+M" : "Ctrl+M",
            click() { minimize(); }
            },
            // Mutes the audio playing elements
            { label: "Toggle Mute",
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
            click() { createHelpWindow(1920, 1080); }
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