const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/main.html`);
    mainWindow.on("closed", () => app.quit());

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: "Add New Todo"
    });
    addWindow.loadURL(`file://${__dirname}/add.html`);
    addWindow.on("closed", () => addWindow = null);
    
}

function reloadWindow() {
    mainWindow.reload();
}


ipcMain.on("todoAdd", (event, todo) => {
    mainWindow.webContents.send("todoAdd", todo);
    addWindow.close();
});

const menuTemplate = [
    {
        label: "File",
        submenu: [
            { label: "New Todo",
            accelerator: process.platform === "darwin" ? "Command+N" : "Ctrl+N",
            click() { reloadWindow(); }
            },
            { label: "Clear Todos",
            click() { mainWindow.webContents.send("todoClear"); }
            },
            {
                label: "Quit",
                accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
                click() {
                    app.quit();
                }
            }
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
            { label: "Reload",
            accelerator: process.platform === "darwin" ? "Command+R" : "Ctrl+R",
            click() { reloadWindow(); }
            },
        ]
    },
    {
        label: "History",
        submenu: [
        ]
    },
    {
        label: "Window",
        submenu: [
        ]
    },
    {
        label: "Help",
        submenu: [
        ]
    },
];

if (process.platform === "darwin") {
    menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production" ) {
    menuTemplate.push({
        label: "Developer",
        submenu: [
            // { role: "reload" },
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