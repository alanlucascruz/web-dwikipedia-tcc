const scrollableX = document.querySelector(".scrollable-x");

scrollableX.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollableX.scrollLeft += evt.deltaY;
});
