const imagePreviewEl = document.querySelector("#image-preview");
const inputFileEl = document.querySelector("#input-file");

const imagePreview = (event) => {
  if (event.target.files.length > 0) {
    const src = URL.createObjectURL(event.target.files[0]);

    imagePreviewEl.src = src;
  }
};

imagePreviewEl.addEventListener("click", () => {
  inputFileEl.click();
});

inputFileEl.addEventListener("change", imagePreview);
