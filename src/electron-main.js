const { app, BrowserWindow } = require('electron');

app.allowRendererProcessReuse = false;

let mainWindow;

app.on('ready', function() {

    mainWindow = new BrowserWindow({
        width: 800, 
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        alwaysOnTop: true
    });

    mainWindow.loadURL('http://localhost:3000');

    mainWindow.on('closed', function () {
        app.quit();
    })

});

//TODO: create a custom menu