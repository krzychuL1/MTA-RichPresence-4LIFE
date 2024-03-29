const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const DiscordRPC = require('discord-rpc');
const { autoUpdater } = require('electron-updater')
const Gamedig = require('gamedig');
const { log } = require('console');
const sanitizeHtml = require('sanitize-html');
const Store = require('electron-store');
const store = new Store();
const find = require('find-process');
const args = process.argv.slice(1);
const isDev = args.some(arg => arg === '--dev');


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

    if (isDev) {
      // Otwieranie narzędzi deweloperskich tylko w trybie deweloperskim
      win.webContents.openDevTools();
    } else {
      // Usuwanie paska narzędziowego w trybie produkcyjnym
      win.removeMenu();
    }

  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.shift && input.key.toLowerCase() === 'i') {
      event.preventDefault();
    }
  });
  
    win.loadFile('index.html');

    // WERSJA
    ipcMain.on('app-version', (event) => {
      const version = AppVersion();
      event.sender.send('got-app-version', version);
    });
  
    win.logsSent = {};


    return win;
  }

let isRunning = false;
let dziala = false;
let data = null;

async function checkProcess() {
  try {
    const processes = await find('name', 'wow64_helper.exe', true);

    if (processes.length > 0 && !isRunning) {
      //console.log('MTA jest wlaczone');
      win.webContents.send('log', 'MTA jest włączone! ✅');
      data = Date.now();
      isRunning = true;
      dziala = true
      win.logsSent.isRunning = true;
      setRichPresence();
    } else if (processes.length === 0 && isRunning || !dziala) {
      //console.log('MTA jest wylaczone');
      win.webContents.send('log', 'MTA jest wyłączone! ❌');;
      dziala = true
      isRunning = false;
      win.logsSent.isRunning = false;
      clearRichPresence();
    }
  } catch (error) {
    console.error('Error while checking process:', error);
  }
}
  

ipcMain.on('reset-rpc-status', () => {
  currentStatus = null;
  currentStatus2 = null;
  currentStatus3 = null;
  if (win.logsSent.isRunning == true) {
setRichPresence();
win.webContents.send('log', `Status został zresetowany! ✅`);
} else {
  win.webContents.send('log', 'MTA jest wyłączone! ❌');
}
});



// 4LIFE
let buttons = null;
let currentStatus = null;
let currentStatus2 = null;
let currentStatus3 = null;

    // Biznesy
    ipcMain.on('set-status2', (event, status2) => {
      if (currentStatus2 === status2) {
        win.webContents.send('log', `Status "${status2}"\njest już ustawiony! ❌`);
        return;
      }
      switch (status2) {
          case 'Buildings4you':
            if (win.logsSent.isRunning == true) {
              const activity = {
                details: `• Biznes`,
                state: `• ${status2}`,
                largeImageKey: 'mta',
                instance: false,
                startTimestamp: data,
              };
              if (buttons) {
              activity.buttons = buttons;
              }
            rpc.setActivity(activity)
              currentStatus = null;
              currentStatus2 = status2;
              currentStatus3 = null;
              win.webContents.send('log', `Status "${status2}"\nzostał ustawiony! ✅`);
            } else {
              win.webContents.send('log', 'MTA jest wyłączone! ❌');
            }
              break;
              case '4Music':
            if (win.logsSent.isRunning == true) {
              const activity = {
                details: `• Biznes`,
                state: `• ${status2}`,
                largeImageKey: 'mta',
                instance: false,
                startTimestamp: data,
              };
              if (buttons) {
              activity.buttons = buttons;
              }
            rpc.setActivity(activity)
              currentStatus = null;
              currentStatus2 = status2;
              currentStatus3 = null;
              win.webContents.send('log', `Status "${status2}"\nzostał ustawiony! ✅`);
            } else {
              win.webContents.send('log', 'MTA jest wyłączone! ❌');
            }
              break;
              case 'Redakcja 4Life News':
            if (win.logsSent.isRunning == true) {
              const activity = {
                details: `• Biznes`,
                state: `• ${status2}`,
                largeImageKey: 'mta',
                instance: false,
                startTimestamp: data,
              };
              if (buttons) {
              activity.buttons = buttons;
              }
            rpc.setActivity(activity)
              currentStatus = null;
              currentStatus2 = status2;
              currentStatus3 = null;
              win.webContents.send('log', `Status "${status2}"\nzostał ustawiony! ✅`);
            } else {
              win.webContents.send('log', 'MTA jest wyłączone! ❌');
            }
              break;
          case 'San Andreas Armed Forces':
            if (win.logsSent.isRunning == true) {
              const activity = {
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            };
            if (buttons) {
            activity.buttons = buttons;
            }
          rpc.setActivity(activity)
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"\nzostał ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
            case 'Studio Filmowe 4Life':
            if (win.logsSent.isRunning == true) {
              const activity = {
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            };
            if (buttons) {
            activity.buttons = buttons;
            }
          rpc.setActivity(activity)
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"\nzostał ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
            case '4FIGHT':
            if (win.logsSent.isRunning == true) {
              const activity = {
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            };
            if (buttons) {
            activity.buttons = buttons;
            }
          rpc.setActivity(activity)
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"\nzostał ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
            case 'YourCrazyWheel':
            if (win.logsSent.isRunning == true) {
              const activity = {
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            };
            if (buttons) {
            activity.buttons = buttons;
            }
          rpc.setActivity(activity)
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"\nzostał ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
            break;
            case 'Gold Car Leasing':
            if (win.logsSent.isRunning == true) {
              const activity = {
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            };
            if (buttons) {
            activity.buttons = buttons;
            }
          rpc.setActivity(activity)
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"\nzostał ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
            break;
            case '4Wars':
            if (win.logsSent.isRunning == true) {
              const activity = {
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            };
            if (buttons) {
            activity.buttons = buttons;
            }
          rpc.setActivity(activity)
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"\nzostał ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
            break;
            case '4Life Cinema Center':
            if (win.logsSent.isRunning == true) {
              const activity = {
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            };
            if (buttons) {
            activity.buttons = buttons;
            }
          rpc.setActivity(activity)
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"\nzostał ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
            break;
            case 'Crime N’ Shine':
            if (win.logsSent.isRunning == true) {
              const activity = {
              details: `• Biznes`,
              state: `• ${status2}`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            };
            if (buttons) {
            activity.buttons = buttons;
            }
          rpc.setActivity(activity)
            currentStatus = null;
            currentStatus2 = status2;
            currentStatus3 = null;
            win.webContents.send('log', `Status "${status2}"\nzostał ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
            break;
          default:
              console.error(`Nieznany status: ${status2}`);
      }
  });

  // Frakcje
ipcMain.on('set-status', (event, status) => {
  if (currentStatus === status) {
    win.webContents.send('log', `Status "${status}"\njest już ustawiony! ❌`);
    return;
  }
  switch (status) {
      case 'San Andreas Police Department':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Frakcja`,
          state: `• ${status}`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus = status;
        currentStatus2 = null;
        currentStatus3 = null;
        win.webContents.send('log', `Status "${status}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
      case 'San Andreas Road Assistance':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Frakcja`,
          state: `• ${status}`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus = status;
        currentStatus2 = null;
        currentStatus3 = null;
        win.webContents.send('log', `Status "${status}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
      case 'Transport of San Andreas':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Frakcja`,
          state: `• ${status}`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus = status;
        currentStatus2 = null;
        currentStatus3 = null;
        win.webContents.send('log', `Status "${status}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'San Andreas Fire Department':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Frakcja`,
          state: `• ${status}`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus = status;
        currentStatus2 = null;
        currentStatus3 = null;
        win.webContents.send('log', `Status "${status}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'San Andreas Medical Department':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Frakcja`,
          state: `• ${status}`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus = status;
        currentStatus2 = null;
        currentStatus3 = null;
        win.webContents.send('log', `Status "${status}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
      default:
          console.error(`Nieznany status: ${status}`);
  }
});

  // Prace
ipcMain.on('set-status3', (event, status3) => {
  if (currentStatus3 === status3) {
    win.webContents.send('log', `Status "${status3}"\njest już ustawiony! ❌`);
    return;
  }
  switch (status3) {
      case 'Kopalnia':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Praca: ${status3}`,
          state: `• Kopie węgiel`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
      case 'Kurier':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Praca: ${status3}`,
          state: `• Roznosi paczki`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'Lawety':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Praca: ${status3}`,
          state: `• Przewozi kontenery`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'Magazynier':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Praca: ${status3}`,
          state: `• Przenosi paczki`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
        case 'Trans-Max nie legalna':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Praca: ${status3}`,
          state: `• Przewozi nie legalne towary`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
        case 'Sweeper':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Praca: ${status3}`,
          state: `• Sprząta ulice`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'Kosiarki':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Praca: ${status3}`,
          state: `• Kosi trawę`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'Air Post':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Praca: ${status3}`,
          state: `• Zrzuca paczki`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'Śmieciarki':
        if (win.logsSent.isRunning == true) {
          const activity = {
          details: `• Praca: ${status3}`,
          state: `• Zbiera śmieci`,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
        if (buttons) {
        activity.buttons = buttons;
        }
      rpc.setActivity(activity)
        currentStatus3 = status3;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
          break;
          case 'eTransporter':
            if (win.logsSent.isRunning == true) {
              const activity = {
              details: `• Praca: ${status3}`,
              state: `• Przewozi pasażerów`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            };
            if (buttons) {
            activity.buttons = buttons;
            }
          rpc.setActivity(activity)
            currentStatus3 = status3;
            currentStatus2 = null;
            currentStatus = null;
            win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
              case 'Odśnieżarki':
            if (win.logsSent.isRunning == true) {
              const activity = {
              details: `• Praca: ${status3}`,
              state: `• Odśnieża drogi`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            };
            if (buttons) {
            activity.buttons = buttons;
            }
          rpc.setActivity(activity)
            currentStatus3 = status3;
            currentStatus2 = null;
            currentStatus = null;
            win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
            case 'Nurek':
            if (win.logsSent.isRunning == true) {
              const activity = {
              details: `• Praca: ${status3}`,
              state: `• Zbiera śmieci z wody`,
              largeImageKey: 'mta',
              instance: false,
              startTimestamp: data,
            };
            if (buttons) {
            activity.buttons = buttons;
            }
          rpc.setActivity(activity)
            currentStatus3 = status3;
            currentStatus2 = null;
            currentStatus = null;
            win.webContents.send('log', `Status "${status3}"\nzostał ustawiony! ✅`);
          } else {
            win.webContents.send('log', 'MTA jest wyłączone! ❌');
          }
              break;
      default:
          console.error(`Nieznany status: ${status3}`);
  }
});

  // Własny status
ipcMain.on('set-status4', (event, statusDetails, statusState) => {
        if (win.logsSent.isRunning == true) {
      const activity = {
          details: statusDetails,
          state: statusState,
          largeImageKey: 'mta',
          instance: false,
          startTimestamp: data,
        };
          if (buttons) {
          activity.buttons = buttons;
          }
        rpc.setActivity(activity)
        currentStatus3 = null;
        currentStatus2 = null;
        currentStatus = null;
        win.webContents.send('log', `Status został ustawiony! ✅`);
      } else {
        win.webContents.send('log', 'MTA jest wyłączone! ❌');
      }
});

// Przyciski

// 1 Przycisk

ipcMain.on('set-button1', (event, Nazwa1, Link1) => {
  if(win.logsSent.isRunning == true){
    buttons = [
      { label: Nazwa1, url: Link1 },
    ];
    currentStatus = null;
    currentStatus2 = null;
    currentStatus3 = null;
    win.webContents.send('log', 'Przyciski zostały ustawione! ✅\nTeraz wybierz swój status!');
  } else {
    win.webContents.send('log', 'MTA jest wyłączone! ❌');
  }
});

// 2 Przyciski
ipcMain.on('set-button2', (event, Nazwa1, Link1, Nazwa2, Link2) => {
  if(win.logsSent.isRunning == true){
    buttons = [
      { label: Nazwa1, url: Link1 },
      { label: Nazwa2, url: Link2 },
    ];
    currentStatus = null;
    currentStatus2 = null;
    currentStatus3 = null;
    win.webContents.send('log', 'Przyciski zostały ustawione! ✅\nTeraz wybierz swój status!');
  } else {
    win.webContents.send('log', 'MTA jest wyłączone! ❌');
  }
});

// Reset statusu
ipcMain.on('reset-button', (event) => {
  buttons = null
  if(win.logsSent.isRunning == true){
    currentStatus = null;
    currentStatus2 = null;
    currentStatus3 = null;
    win.webContents.send('log', 'Przyciski zostały usunięte! ✅\nTeraz wybierz swój status!');
  } else {
    win.webContents.send('log', 'MTA jest wyłączone! ❌');
  }
});


async function setRichPresence() {
  const activity = {
    largeImageKey: 'mta',
    instance: false,
    startTimestamp: data,
  };
  if (buttons) {
    activity.buttons = buttons;
  }
  rpc.setActivity(activity)
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
  });

  rpc.login({ clientId: '1081236894689538058' }).catch(console.error)


  createWindow();

          if(!isDev){
        // Sprawdź update
        setTimeout(sprawdzupdate, 1000)
        setInterval(autoupdate20min, 1200000);


        // Sprawdzanie aktualizacji
        function sprawdzupdate() {
          autoUpdater.checkForUpdates();
          win.webContents.send('log', 'Sprawdzanie aktualizacji');
        }

        function autoupdate20min() {
          autoUpdater.checkForUpdates();
          win.webContents.send('log', 'Sprawdzanie aktualizacji');
        }
      
        autoUpdater.on('update-available', () => {
          win.webContents.send('update_available');
        });
      
      autoUpdater.on('download-progress', (progressObj) => {
        const percent = progressObj.percent.toFixed(2);
        win.webContents.send('update_progress', percent);
      });
      
      autoUpdater.on('update-downloaded', (info) => {
        store.set('newVersion', info.version);
        store.set('releaseNotes', info.releaseNotes);
        autoUpdater.quitAndInstall()
      });
    }


  win.webContents.on('did-finish-load', () => {
    if (!win.logsSent.windowLoaded) {
    win.webContents.send('log', 'Program załadowany! ✅');
    win.logsSent.windowLoaded = true;
    }
    });
    });

    app.on('ready', () => {
      
      // Sprawdź MTA
      setTimeout(checkProcess, 1000);
      setInterval(checkProcess, 5000);
    
      const newVersion = store.get('newVersion');
      const currentVersion = app.getVersion();
      const releaseNotes = store.get('releaseNotes');
    
      if (newVersion === currentVersion) {
        //if (store.get(`releaseNotes`)) {
        const releaseNote = sanitizeHtml(releaseNotes, {
          allowedTags: ['li'],
          allowedAttributes: {},
        });
        
        let nowosci = releaseNote.replace(/<li>/g, "-").replace(/<\/li>/g, "");

        setTimeout(() => {
        dialog.showMessageBox({
          type: 'info',
          title: 'Nowa wersja zainstalowana!',
          message: `Zmiany w wersji: ${newVersion}.`,
          detail: nowosci,
          buttons: ['OK'],
        });
      }, 800);
    
        store.delete('newVersion');
        store.delete('releaseNotes');
      }
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
