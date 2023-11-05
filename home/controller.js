const LOCAL_STORAGE_KEY = "usuario",
  btnEditarEl = document.querySelector("#btn-editar");

const onLoad = () => {
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (!data) {
    return;
  }

  btnEditarEl.classList.remove("d-none");
};

window.addEventListener("load", onLoad);
