"use strict";

function getCurrentTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  // const seconds = date.getSeconds();

  let time = "";
  time += hours;
  time += ":";
  time += minutes < 10 ? "0" + minutes : minutes;
  // time += `:${seconds < 10 ? `0${seconds}` : seconds}`;

  return time;
}

export default getCurrentTime;
