export const setupNavigation = () => {
  const navButtons = document.querySelectorAll(
    ".nav-items button[data-screen]",
  );

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      showScreen(btn.dataset.screen);
    });
  });
};

const showScreen = (screenId) => {
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.add("hidden"); // add hidden class to all screens
  });

  document.getElementById(screenId).classList.remove("hidden"); // // remove the hidden class from the current screen

  document.querySelectorAll(".nav-items button[data-screen]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.screen === screenId); // add or remove the active class based on the current screen
  });
};

export const setupExit = () => {
  document.getElementById("exit-btn").addEventListener("click", () => {
    navigator.app.exitApp(); // close the app
  });
};
