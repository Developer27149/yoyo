"use strict";
import "./styles/options.sass";
import strSet from "./city";

function handlerClickSetLocation() {
  $("#set_location").on("click", (e) => {
    $("header nav+nav").removeClass("orange_bottom");
    $(e.target).addClass("orange_bottom");
    $("section").css("border", "none");
    $("section[name=location]").css("border", "1px solid purple");
  });
}

function checkIsUseLocation() {
  const priority = localStorage.getItem("priority");
  $("#use_location").on("change", (e) => {
    localStorage.setItem("priority", e.target.checked);
  });
  if (priority === "true") {
    $("#use_location")[0].checked = "checked";
  }
}

(function () {
  handlerClickSetLocation();
  checkIsUseLocation();
  let location = localStorage.getItem("location");
  if (location) {
    $("#location_input").attr("placeholder", location);
  }

  // init all options
  for (const keyword of strSet) {
    const optionItem = $(`<option value="${keyword}"></option>`);
    $("#location_datalist").append(optionItem);
  }
  $("#location_input").on("change", (e) => {
    location = e.target.value;
    if (strSet.has(location)) {
      $("#location_form button").removeClass("disabled");
      $("#location_form button").removeAttr("disabled");
    } else {
      $("#location_form button").addClass("disabled");
      $("#location_form button").attr("disabled", "true");
    }
  });
  $("#location_form").on("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("location", location);
    // 然后通知tab页面重新渲染天气信息
    // 获取位置id
    const url = `https://geoapi.qweather.com/v2/city/lookup?location=${location}&key=31ea099458ef44709d9d142e54ab4e0e&number=1`;
    $.ajax({
      url,
    }).done((data) => {
      localStorage.setItem("locationId", data["location"][0]["id"]);
    });
  });
})();
