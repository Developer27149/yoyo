"use strict";

function saveUrlInfoToLocal(url, copyright, end_date) {
  url && localStorage.setItem("url", url);
  copyright && localStorage.setItem("copyright", copyright);
  end_date && localStorage.setItem("end_date", end_date);
}

export function renderNewWallpaper(url, copyright) {
  // 从缓存中读取此url的数据
  caches.open("wallpaper").then((data) => {
    data.match(url).then((imgCache) => {
      console.log(imgCache);
    });
  });
  // const imgElem = $(`<img src="${url}" alt="wallpaper" id="wallpaper"/>`);
  const imgElem = $("#wallpaper");
  imgElem.attr("src", url);
  imgElem.on("load", (e) => {
    console.log("wallpaper loaded.");
    e.target.style.display = "block";
    $("#intro").empty();
    $("#intro").append(copyright);
  });
  $("#container").append(imgElem);
}

export function getWallpaperData() {
  return {
    url: localStorage.getItem("url"),
    end_date: localStorage.getItem("end_date"),
    copyright: localStorage.getItem("copyright"),
  };
}

function getCurrentDateStr() {
  const _d = new Date();
  const year = _d.getFullYear();
  let month = _d.getMonth() + 1;
  let day = _d.getDate();
  return `${year}${month < 10 ? `0${month}` : month}${
    day < 10 ? `0${day}` : day
  }`;
}

function setWallpaper() {
  const { url, copyright } = getWallpaperData();
  const current_end_date = getCurrentDateStr();
  const randomDate = localStorage.getItem("date");
  console.log(url, randomDate);
  // 如果存在图片资源信息，并且今天没有点击过刷新替换壁纸按钮，则直接渲染本地缓存的壁纸，否则获取今日壁纸进行渲染
  if (url && copyright && current_end_date === randomDate) {
    console.log("直接渲染");
    renderNewWallpaper(url, copyright);
  } else {
    console.log("获取每日壁纸渲染");
    $.ajax({
      url: "https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN",
      cache: true,
      headers: {
        "cache-control": "max-age=691200",
      },
    }).done(({ images }) => {
      const { url, copyright, enddate } = images[0];
      saveUrlInfoToLocal(url, copyright, enddate);
      renderNewWallpaper(url, copyright);
    });
  }
}

function saveImgToLocalstorage(url) {}
async function setImgCache(url) {
  const wallpaperCache = await caches.open("wallpaper");
  wallpaperCache.delete(localStorage.getItem("url"));
  wallpaperCache.add(url);
}

export function changeWallpaper() {
  $.ajax({
    url: "http://bing.creepersan.com/api/v1/random",
  })
    .done(async (resp) => {
      const { flag, data } = JSON.parse(resp);
      if (flag === 200) {
        const { title, img_url } = data[0];
        const url = `https://bing.creepersan.com${img_url}`;
        // 创建缓存
        setImgCache(url);
        // saveImgToLocalstorage(url);
        saveUrlInfoToLocal(url, title);
        // 获取新的壁纸，则更新使用随机壁纸的时间
        localStorage.setItem("date", getCurrentDateStr());
        // 渲染壁纸
        setWallpaper();
      } else {
        console.log("随机壁纸 api 请求异常");
      }
    })
    .fail((err) => {
      console.log(err);
    });
}

export default setWallpaper;
