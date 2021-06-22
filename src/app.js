"use strict";

import getCurrentTime from "./clock";
import getDay from "./day";
import "./styles/app.sass";
import renderWeather from "./weather";
import setWallpaper, { changeWallpaper } from "./wallpaper";

(function () {
  function setTime() {
    const time = getCurrentTime();
    document.getElementById("clock").innerHTML = time;
  }

  function setDay() {
    const day = getDay();
    document.getElementById("day").innerHTML = day;
  }

  function handleChangeWallpaper() {
    let deg = 360;
    $("#flash").on("click", (e) => {
      const elem = e.target;
      elem.style.transform = `rotate(${deg}deg)`;
      deg += 360;
      changeWallpaper();
    });
  }

  function setupDashboard() {
    setWallpaper();
    setDay();
    setTime();
    renderWeather();
    handleChangeWallpaper();
    setInterval(setTime, 1000);
  }

  setupDashboard();
})();
