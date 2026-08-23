import { setupNavigation, setupExit } from "./navigation.js";

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  console.log(`Running Cordova - ${cordova.platfromId} @${cordova.version}`);
  initApp();
}

const initApp = () => {
  setupNavigation();
  setupExit();
};
