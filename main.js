const { app, BrowserWindow, ipcMain } = require('electron');
const { screen } = require('electron-screen-recorder');

let recorder;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('./app/index.html');

    recorder = screen.createRecorder({
        onEncodingError: (error) => {
            console.error('Error:', error);
        }
    });

    ipcMain.on('start-recording', () => {
        recorder.startCapturing();
    });

    ipcMain.on('stop-recording', () => {
        recorder.stopCapturing();
        recorder.save('output.mp4', () => {
            console.log('Grabación guardada exitosamente!');
        });
    });

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
