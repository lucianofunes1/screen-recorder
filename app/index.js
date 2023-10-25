const { ipcRenderer } = require('electron');

const startRecording = () => {
    ipcRenderer.send('start-recording');
};

const stopRecording = () => {
    ipcRenderer.send('stop-recording');
};

document.getElementById('startButton').addEventListener('click', () => {
    startRecording();
});
