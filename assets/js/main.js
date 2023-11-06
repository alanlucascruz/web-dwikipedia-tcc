const scrollableX = document.querySelector(".scrollable-x");

scrollableX?.addEventListener("wheel", (event) => {
  event.preventDefault();
  scrollableX.scrollLeft += event.deltaY;
});

const openNewTab = (url) => {
  window.open(url, "_blank").focus();
};
