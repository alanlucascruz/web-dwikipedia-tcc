const LOCAL_STORAGE_KEY = "usuario",
  editItemEl = document.querySelectorAll(".edit-item"),
  articleTitleEl = document.querySelector("#article-title");

const onLoad = () => {
  recuperarTituloDoArtigo();
  prepararPaginaParaEdicao();
};

const recuperarTituloDoArtigo = () => {
  var categoria = getParamFromURL("categoria");

  if (!categoria) {
    categoria = "Título do seu artigo";
  }

  document.title = categoria;
  articleTitleEl.textContent = categoria;
};

const prepararPaginaParaEdicao = () => {
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (!data) {
    return;
  }

  editItemEl.forEach((item) => {
    item.classList.remove("d-none");
  });
};

const getParamFromURL = (param) => {
  const urlParams = window.location.search,
    searchParams = new URLSearchParams(urlParams);

  return searchParams.get(param);
};

window.addEventListener("load", onLoad);
