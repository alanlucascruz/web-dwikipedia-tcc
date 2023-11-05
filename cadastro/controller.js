const API = "https://www.nyckel.com/v0.9/functions/kbkxm8nbibnu2437/locate",
  LOCAL_STORAGE_KEY = "usuario",
  imagePreviewEl = document.querySelector("#image-preview"),
  inputFileEl = document.querySelector("#input-file"),
  inputNomeEl = document.querySelector("#nome"),
  inputEmailEl = document.querySelector("#email"),
  inputSenhaEl = document.querySelector("#senha"),
  inputNacionalidadeEl = document.querySelector("#nacionalidade"),
  invalidFormTextEl = document.querySelector("#invalid-form-text"),
  btnConfirmarEl = document.querySelector("#btn-confirmar"),
  btnDeslogarEl = document.querySelector("#btn-deslogar"),
  loaderEl = document.querySelector("#loader");

var isLogged = false;
var isCertificadoValido = false;

const onLoad = () => {
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (!data) {
    return;
  }

  const { nome, email, senha, nacionalidade, fileBase64 } = data;

  inputNomeEl.value = nome;
  inputEmailEl.value = email;
  inputSenhaEl.value = senha;
  inputNacionalidadeEl.value = nacionalidade;
  imagePreviewEl.src = fileBase64;

  isLogged = true;
  isCertificadoValido = true;

  btnDeslogarEl.classList.remove("d-none");
};

const onChangeInputFile = async (event) => {
  const files = event.target.files;

  preVisualizarImagem(files[0]);

  try {
    showLoader();

    await validarCertificado(files);

    hideLoader();
  } catch (error) {
    console.log("Ocorreu um erro inesperado: ", error);
    hideLoader();
  }
};

const preVisualizarImagem = (file) => {
  const src = URL.createObjectURL(file);

  imagePreviewEl.src = src;
};

const validarCertificado = async (files) => {
  const form = new FormData(),
    imageFile = new File(files, "image.png");

  form.append("data", imageFile);

  const response = await fetch(API, {
    method: "POST",
    body: form,
  });

  const data = await response.json();

  isCertificadoValido = data[0].points.length > 0;
};

const showInvalidFormText = (text) => {
  invalidFormTextEl.classList.remove("d-none");
  invalidFormTextEl.textContent = text;
};

const onClickConfirmar = async () => {
  const nome = inputNomeEl.value,
    email = inputEmailEl.value,
    senha = inputSenhaEl.value,
    nacionalidade = inputNacionalidadeEl.value,
    files = inputFileEl.files;

  if (!nome) {
    return showInvalidFormText('Preencha o campo "Nome"');
  }

  if (!email) {
    return showInvalidFormText('Preencha o campo "E-mail"');
  }

  if (!senha) {
    return showInvalidFormText('Preencha o campo "Senha"');
  }

  if (!nacionalidade) {
    return showInvalidFormText('Preencha o campo "Nacionalidade"');
  }

  if (!isLogged && !files.length) {
    return showInvalidFormText("Faça o Upload de um certificado");
  }

  if (!isCertificadoValido) {
    return showInvalidFormText("É necessário inserir um certificado válido");
  }

  const data = {
    nome,
    email,
    senha,
    nacionalidade,
  };

  if (files.length) {
    data.fileBase64 = await fileToBase64(files[0]);
  } else {
    data.fileBase64 = imagePreviewEl.src;
  }

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));

  navegarParaInicio();
};

const onClickDeslogar = () => {
  localStorage.clear();
  navegarParaInicio();
};

const navegarParaInicio = () => {
  window.location.href = "../home/view.html";
};

const fileToBase64 = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
  });
};

const showLoader = () => {
  loaderEl.classList.remove("d-none");
};

const hideLoader = () => {
  loaderEl.classList.add("d-none");
};

window.addEventListener("load", onLoad);

imagePreviewEl.addEventListener("click", () => {
  inputFileEl.click();
});

inputFileEl.addEventListener("change", onChangeInputFile);

btnConfirmarEl.addEventListener("click", onClickConfirmar);

btnDeslogarEl.addEventListener("click", onClickDeslogar);
