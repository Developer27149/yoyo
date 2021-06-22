"use strict";

function renderWeather() {
  const settingPriority = localStorage.getItem("priority");
  // 没有城市id就要读取本地位置然后获取天气，否则用城市id构建请求获取天气
  if (settingPriority === "true") {
    const locationId = localStorage.getItem("locationId");
    const url = `https://devapi.qweather.com/v7/weather/now?key=31ea099458ef44709d9d142e54ab4e0e&location=${locationId}`;
    // 获取天气
    getWeatherDataAndRender(url);
  } else {
    // 通过浏览器定位
    console.log("浏览器定位");
    navigator.geolocation.getCurrentPosition(successed, failed, {
      enableHighAccuracy: true,
      maximumAge: 0,
    });
  }
}

function successed(pos) {
  // 纬度 、经度
  const { latitude, longitude } = pos.coords;
  const url = `https://devapi.qweather.com/v7/weather/now?key=31ea099458ef44709d9d142e54ab4e0e&location=${longitude},${latitude}`;
  getWeatherDataAndRender(url);
}
function failed(err) {
  console.log(err);
}

function addTip(text) {
  let tipElem = $("#tip");
  if (tipElem.length === 0) {
    tipElem = $(
      `<div id='tip'><section>${text}</section><section id="clear_tip">x</section></div>`
    );
    $("#container").append(tipElem);
    $("#clear_tip").on("click", (e) => {
      $("div").remove("#tip");
    });
  }
}

function getWeatherDataAndRender(url) {
  console.log(url);
  $.ajax({
    url,
    method: "GET",
  })
    .done((data) => {
      console.log(data);
      const { code, now, fxLink } = data;
      if (code !== "200") {
        // code error
        addTip("定位异常，建议通过选项设置手动指定地理位置");
        console.log(now, code);
      } else {
        // 渲染天气
        const { text, temp, icon } = now;
        console.log(text, temp, icon);
        $("#weather").append(
          $(`<a href="${fxLink}"><img src="./weather_icons/${icon}.png" /></a>`)
        );
        $("#weather").append(`<div>${text}&nbsp;&nbsp;${temp}°C</div>`);
      }
    })
    .fail((err) => {
      console.log(err);
    });
}

export default renderWeather;
