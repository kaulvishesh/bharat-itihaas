if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol) && !/[?&]nosw=1/.test(location.search)) {
  window.addEventListener("load", function () { navigator.serviceWorker.register("sw.js").catch(function () {}); });
}
