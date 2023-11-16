const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
	const mainWindow = new BrowserWindow({
		width: 850,
		height: 650,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	mainWindow.loadURL('https://www.timeanddate.com/calendar/monthly.html');

	mainWindow.webContents.on('dom-ready', () => {
		// Execute JavaScript after the page is ready
		mainWindow.webContents.executeJavaScript(`
            // Remove the specific child element by class name
            var calareaElement = document.getElementById('calarea');
            var childElement = calareaElement.querySelector('.fixed.pn');
            if (childElement) {
                childElement.remove();
            }
            
            // Update the body content with the modified calarea content
            document.body.innerHTML = '<div id="calarea">' + calareaElement.innerHTML + '</div>';
        `);
	});
});
