1. Initiate NPM
```bash
   npm init -y
```
2. Make necessary changes to the `package.json` & replace `start` with below;
```json
"scripts": {
    "start": "electron main.js",
    "package": "electron-builder"
},
```
3. Install dev dependancies
```bash
npm install electron electron-builder --save-dev
```
4. Create `main.js` with below;
```js
const { app, BrowserWindow } = require("electron");

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({
        width: 850,
        height: 650,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    mainWindow.loadURL("https://www.timeanddate.com/calendar/monthly.html");

    mainWindow.webContents.on("dom-ready", () => {
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
```
5. Update electron build information to `package.json`
```json
"build": {
    "appId": "com.codechillilk.month",
    "productName": "Month",
    "directories": {
        "output": "dist"
    },
    "mac": {
        "target": "mas",
        "icon": "assets/icon.icns"
    },
    "files": [
        "main.js",
        "assets/icon.icns",
    ]
}
```
6. Download an icon from https://macosicons.com/ & save it in the `assets` folder
7. Test the app
```shell
npm start
```
8. Build the app for distribution
```bash
npm run package
```
9. Move `Month.app` from `dist/mas-arm64` to Applications folder