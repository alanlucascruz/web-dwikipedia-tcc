const LOCAL_STORAGE_KEY = "usuario",
  btnEditarEl = document.querySelector("#btn-editar"),
  cardContainer = document.querySelector("#card-container");

const LISTA_NOTICIAS = [
  {
    titulo: "Tema da redação Enem 2023",
    descricao:
      '<p>O tema da redação do Exame Nacional do Ensino Médio (Enem) 2023 é: "Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil". </p> <p>A redação faz parte do primeiro dia de prova do exame. Na avaliação de professores ouvidos pelo g1, o tema é a "cara" do Enem por tratar de um problema social relevante e exigir uma boa proposta de intervenção.</p>',
    linkImagem: "../assets/img/noticias/enem.webp",
    linkNoticia:
      "https://g1.globo.com/educacao/enem/2023/noticia/2023/11/05/tema-da-redacao-do-enem-2023-e-desafios-para-o-enfrentamento-da-invisibilidade-do-trabalho-de-cuidado-realizado-pela-mulher-no-brasil.ghtml",
  },
  {
    titulo: "Governo de SP confirma sétima morte no estado",
    descricao:
      "<p>O governo de São Paulo confirmou, na manhã deste domingo (5), a sétima morte em decorrência das chuvas fortes que caíram em boa parte do estado na tarde de sexta-feira.</p> <p>De acordo com a gestão estadual, o sétimo caso ocorreu em Ilhabela. Uma embarcação naufragou e um dos tripulantes não resistiu. Outros dois foram socorridos e encaminhados ao serviço de saúde.</p>",
    linkImagem: "../assets/img/noticias/chuvas_sao_paulo.webp",
    linkNoticia:
      "https://g1.globo.com/sp/sao-paulo/noticia/2023/11/05/governo-de-sp-confirma-setima-morte-no-estado-em-decorrencia-das-chuvas-de-sexta.ghtml",
  },
  {
    titulo: "Corpo é encontrado em Bertioga (SP)",
    descricao:
      "<p>O corpo de Aluísio Paes de Barros, que desapareceu ao cair no mar, em Bertioga, no litoral norte de São Paulo, durante um voo de asa-delta, foi encontrado pelo Corpo de Bombeiros na manhã deste domingo.</p> <p>O homem, de 52 anos, estava desaparecido desde quinta-feira (2). As buscas por ele iniciaram no mesmo dia. Na manhã deste domingo, a família foi chamada para reconhecê-lo</p>",
    linkImagem: "../assets/img/noticias/corpo_desaparecido.jpeg",
    linkNoticia:
      "https://noticias.r7.com/sao-paulo/corpo-de-homem-que-desapareceu-ao-cair-no-mar-durante-voo-de-asa-delta-e-encontrado-em-bertioga-sp-05112023",
  },
  {
    titulo: "Verstappen vence prova em SP e supera recorde de 71 anos",
    descricao:
      "<p>Max Verstappen venceu sua 17ª corrida em 20 disputadas na atual temporada da Fórmula 1 e quebrou mais um recorde na carreira. Foi na tarde de hoje em Interlagos.</p> <p>Com a vitória, Verstappen chegou a 85% de aproveitamento na temporada, superando a marca de Alberto Ascari.</p>",
    linkImagem: "../assets/img/noticias/formula1.webp",
    linkNoticia:
      "https://www.uol.com.br/esporte/ultimas-noticias/2023/11/05/corrida-gp-brasil-formula-1.htm",
  },
  {
    titulo:
      'Filha mais velha esclarece sumiço de Silvio Santos da TV: "Não é a mesma pessoa"',
    descricao:
      "<p>Em entrevista a Christina Rocha no 'Christina PodTudo', Cintia Abravanel abriu o jogo a respeito da cobrança do público e da imprensa para que seu pai, Silvio Santos, volte a gravar no SBT.</p> <p>\"Ele tem 93 anos. O Silvio Santos que vocês querem está no YouTube. Ele não é mais aquela pessoa.\".</p>",
    linkImagem: "../assets/img/noticias/silvio_santos.webp",
    linkNoticia:
      "https://www.terra.com.br/diversao/gente/filha-mais-velha-esclarece-sumico-de-silvio-santos-da-tv-nao-e-a-mesma-pessoa,211f80441e83a9143f056368c9207e36vw0n502d.html#",
  },
  {
    titulo: "Lorem Ipsum",
    descricao:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a neque luctus, pharetra felis eu, semper mauris. Sed vel iaculis arcu. Nunc tellus ex, maximus id ex aliquet, facilisis ullamcorper massa. Cras consectetur tincidunt dui, quis tincidunt ipsum fermentum ac. Mauris risus mi, sagittis at lectus a, interdum sollicitudin nisi. Nunc gravida, quam non finibus malesuada, risus felis ornare mi, et viverra lorem leo eu lacus. Donec et tempor ex. Vivamus ac sem in est pretium pulvinar eu sit amet turpis.",
    linkImagem: "../assets/img/empty-image.png",
    linkNoticia: "",
  },
];

const onLoad = async () => {
  prepararPaginaParaEdicao();
  await inserirListaNoticias();
};

const prepararPaginaParaEdicao = () => {
  const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

  if (!data) {
    return;
  }

  btnEditarEl.classList.remove("d-none");
};

const inserirListaNoticias = async () => {
  cardContainer.innerHTML = "";

  LISTA_NOTICIAS.forEach((noticia) => {
    const html = htmlCardNoticia(noticia);

    cardContainer.innerHTML += html;
  });
};

const htmlCardNoticia = (noticia) => {
  const { titulo, descricao, linkImagem, linkNoticia } = noticia;

  return `
    <div class="card">
      <div class="col-left">
        <img src="${linkImagem}" alt="Example Image" />
      </div>

      <div class="col-right">
        <h4 class="title">${titulo}</h4>
        <div class="description">${descricao}</div>
        <div class="btn btn-primary" onclick='openNewTab("${linkNoticia}")'>Acessar matéria</div>
      </div>
    </div>
  `;
};

window.addEventListener("load", onLoad);
