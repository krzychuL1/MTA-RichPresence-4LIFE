const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const ps = require('ps-node');
const DiscordRPC = require('discord-rpc');
const { autoUpdater } = require('electron-updater')
const Gamedig = require('gamedig');
const { log } = require('console');

autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = false;

Object.defineProperty(app, 'isPackaged', {
    get() {
      return true;
    }
  });
  
  // Handle creating/removing shortcuts on Windows when installing/uninstalling.
  if (require('electron-squirrel-startup')) {
    app.quit();
  }


  function AppVersion() {
    const packagePath = path.join(app.getAppPath(), 'package.json');
    const packageContent = fs.readFileSync(packagePath);
    const packageJson = JSON.parse(packageContent);
    return packageJson.version;
  }



let rpc;

function sendStatusToWindow(text) {
  win.webContents.send('message', text);
}

function createWindow() {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      frame: true,
      resizable: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,    
      },
    });

   win.removeMenu();
  win.webContents.on('devtools-opened', () => {
   win.webContents.closeDevTools();
  });

  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'i') {
      event.preventDefault();
    }
  });
  
    win.loadFile('index.html');

    ipcMain.on('app-version', (event) => {
      const version = AppVersion();
      // Wysyłanie odpowiedzi na zapytanie o wersję do procesu renderera
      event.sender.send('got-app-version', version);
    });
  
    // Dodaj właściwość logsSent do obiektu win
    win.logsSent = {};
    return win;
  }

  function updatelog(text) {
    win.webContents.send('update', text);
  }

function checkProcess() {
  ps.lookup({ command: 'wow64_helper.exe' }, (err, resultList) => {
    if (err) {
      throw new Error(err);
    }

    if (resultList.length > 0 && !win.logsSent.isRunning) {
      win.webContents.send('log', 'MTA jest włączone! ✅');
      win.logsSent.isRunning = true;
      setRichPresence();
    } else if (resultList.length === 0 && win.logsSent.isRunning) {
      win.webContents.send('log', 'MTA jest wyłączone! ❌');
      win.logsSent.isRunning = false;
      clearRichPresence();
    }
  });
}

ipcMain.on('reset-rpc-status', () => {
  currentStatus = null;
  currentStatus2 = null;
  if (win.logsSent.isRunning == true) {
setRichPresence();
win.webContents.send('log', `Status został zresetowany! ✅`);
} else {
  win.webContents.send('log', 'MTA jest wyłączone! ❌');
}
});

let currentStatus = null;
let currentStatus2 = null;
let currentStatus3 = null;


    ipcMain.on('set-status2', (event, status2) => {
      if (currentStatus2 === status2) {
        win.webContents.send('log', `Status "${status2}"
        jest już ustawiony! ❌`);
        return;
      }
      const data = Date.now()
      switch (status2) {
          case 'Buildings4you':
            if (win.logsSent.isRunning == true) {
              rpc.setActivity({
                details: `• Biznes`,
                state: `• ${status2}`,
                largeImageKey: 'mta',
                instance: false,
                startTimestamp: data,
              });
              currentStatus = null;
              currentStatus2 = status2;
              currentStatus3 = null;
              win.webContents.send('log', `Status "${status2}"
              został ustawiony! ✅`);
            } else {
              win.webContents.send('log', 'MTA jest wyłączone! ❌');
            }
              break;
          case '41.St Mechanized Infantry Division':
            if (win.logsSent.isRunning == true) {
            rpc.setActivity({
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            });
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"
            został ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
            case 'Studio Filmowe 4Life':
            if (win.logsSent.isRunning == true) {
            rpc.setActivity({
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            });
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"
            został ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
            case '4FIGHT':
            if (win.logsSent.isRunning == true) {
            rpc.setActivity({
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            });
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"
            został ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
            case 'YourCrazyWheel':
            if (win.logsSent.isRunning == true) {
            rpc.setActivity({
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            });
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"
            został ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
            break;
            case 'Gold Car Leasing':
            if (win.logsSent.isRunning == true) {
            rpc.setActivity({
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            });
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"
            został ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
            break;
            case '4Wars':
            if (win.logsSent.isRunning == true) {
            rpc.setActivity({
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            });
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"
            został ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
            break;
            case '4Life Cinema Center':
            if (win.logsSent.isRunning == true) {
            rpc.setActivity({
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            });
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"
            został ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
            break;
            case 'Crime N’ Shine':
            if (win.logsSent.isRunning == true) {
            rpc.setActivity({
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            });
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"
            został ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
            break;
          default:
              console.error(`Nieznany status: ${status2}`);
      }
  });

ipcMain.on('set-status', (event, status) => {
  if (currentStatus === status) {
    win.webContents.send('log', `Status "${status}" 
    jest już ustawiony! ❌`);
    return;
  }
  const data = Date.now()
  switch (status) {
      case 'San Andreas Police Department':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Frakcja`,
          state: `• ${status}`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus = status;
        currentStatus2 = null;
        currentStatus3 = null;
        win.webContents.send('log', `Status "${status}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
      case 'San Andreas Road Assistance':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Frakcja`,
          state: `• ${status}`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus = status;
        currentStatus2 = null;
        currentStatus3 = null;
        win.webContents.send('log', `Status "${status}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
      case 'Transport of San Andreas':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Frakcja`,
          state: `• ${status}`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus = status;
        currentStatus2 = null;
        currentStatus3 = null;
        win.webContents.send('log', `Status "${status}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'San Andreas Fire Department':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Frakcja`,
          state: `• ${status}`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus = status;
        currentStatus2 = null;
        currentStatus3 = null;
        win.webContents.send('log', `Status "${status}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'San Andreas Medical Department':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Frakcja`,
          state: `• ${status}`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus = status;
        currentStatus2 = null;
        currentStatus3 = null;
        win.webContents.send('log', `Status "${status}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
      default:
          console.error(`Nieznany status: ${status}`);
  }
});

ipcMain.on('set-status3', (event, status3) => {
  if (currentStatus3 === status3) {
    win.webContents.send('log', `Status "${status3}" 
    jest już ustawiony! ❌`);
    return;
  }
  const data = Date.now()
  switch (status3) {
      case 'Kopalnia':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Praca: ${status3}`,
          state: `• Kopie węgiel`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
      case 'Kurier':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Praca: ${status3}`,
          state: `• Roznosi paczki`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'Lawety':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Praca: ${status3}`,
          state: `• Przewozi kontenery`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'Magazynier':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Praca: ${status3}`,
          state: `• Przenosi paczki`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
        case 'Trans-Max nie legalna':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Praca: ${status3}`,
          state: `• Przewozi nie legalne towary`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
        case 'Sweeper':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Praca: ${status3}`,
          state: `• Sprząta ulice`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'Kosiarki':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Praca: ${status3}`,
          state: `• Kosi trawę`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'Dodo':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Praca: ${status3}`,
          state: `• Zrzuca paczki`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'Śmieciarki':
        if (win.logsSent.isRunning == true) {
        rpc.setActivity({
          details: `• Praca: ${status3}`,
          state: `• Zbiera śmieci`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        });
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"
        został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'eTransporter':
            if (win.logsSent.isRunning == true) {
            rpc.setActivity({
              details: `• Praca: ${status3}`,
              state: `• Przewozi pasażerów`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            });
            currentStatus3 = status3;
            currentStatus2 = null;
            currentStatus = null;
            win.webContents.send('log', `Status "${status3}"
            został ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
              case 'Odśnieżarki':
            if (win.logsSent.isRunning == true) {
            rpc.setActivity({
              details: `• Praca: ${status3}`,
              state: `• Odśnieża drogi`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            });
            currentStatus3 = status3;
            currentStatus2 = null;
            currentStatus = null;
            win.webContents.send('log', `Status "${status3}"
            został ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
            case 'Nurek':
            if (win.logsSent.isRunning == true) {
            rpc.setActivity({
              details: `• Praca: ${status3}`,
              state: `• Zbiera śmieci z wody`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            });
            currentStatus3 = status3;
            currentStatus2 = null;
            currentStatus = null;
            win.webContents.send('log', `Status "${status3}"
            został ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
      default:
          console.error(`Nieznany status: ${status3}`);
  }
});


async function setRichPresence() {
  const data = Date.now()
  rpc.setActivity({
    largeImageKey: 'mta',
    instance: false,
    startTimestamp: data,
  })
    .then(() => {
      if (!win.logsSent.richPresenceSet) {
        win.webContents.send('log', 'Status Discord ustawiony! ✅');
        win.logsSent.richPresenceSet = true;
      }
    })
    .catch(console.error);
}

function clearRichPresence() {
  rpc.clearActivity()
    .then(() => {
      if (!win.logsSent.richPresenceCleared) {
        win.webContents.send('log', 'Status Discord usunięty! ❌');
        win.logsSent.richPresenceCleared = true;
      }
    })
    .catch(console.error);
}

app.whenReady().then(() => {
  rpc = new DiscordRPC.Client({ transport: 'ipc' });
  rpc.on('ready', () => {
    if (!win.logsSent.richPresenceReady) {
      win.webContents.send('log', 'Status Discord jest gotowy! ✅');
      win.logsSent.richPresenceReady = true;
    }
    checkProcess();
    setInterval(checkProcess, 5000);
  });

  rpc.login({ clientId: '1081236894689538058' }).catch(console.error)


  createWindow();

  // Sprawdzanie aktualizacji
  autoUpdater.checkForUpdates();

  autoUpdater.on('update-downloaded', (info) => {
    autoUpdater.quitAndInstall();  
  })

  win.webContents.on('did-finish-load', () => {
    if (!win.logsSent.windowLoaded) {
    win.webContents.send('log', 'Program załadowany! ✅');
    win.logsSent.windowLoaded = true;
    }
    });
    });
    
    // Obsługa zdarzenia zamykania aplikacji
    app.on('window-all-closed', () => {
    // Na systemach macOS aplikacja działa w tle po zamknięciu okna
    if (process.platform !== 'darwin') {
    app.quit();
    }
    });
    
    app.on('activate', () => {
    // Na systemach macOS aplikacja powinna utworzyć nowe okno po kliknięciu na ikonę w dock'u,
    // gdy nie ma żadnych aktywnych okien
    if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
    }
    });
