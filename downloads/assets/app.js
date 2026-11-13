const REPOSITORY = "asjsandro/asjsandro.github.io";
const BRANCH = "main";
const FILES_DIRECTORY = "downloads/arquivos/";
const API_URL = `https://api.github.com/repos/${REPOSITORY}/git/trees/${BRANCH}?recursive=1`;

const entries = document.getElementById("entries");
const breadcrumbs = document.getElementById("breadcrumbs");
const loadStatus = document.getElementById("loadStatus");
const errorMessage = document.getElementById("errorMessage");
const emptyState = document.getElementById("emptyState");
let arquivos = null;

function escapar(valor) {
  return String(valor).replace(/[&<>"']/g, caractere => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[caractere]);
}

function obterCaminhoAtual() {
  try {
    return decodeURIComponent(location.hash.slice(1)).replace(/^\/+|\/+$/g, "");
  } catch {
    return null;
  }
}

function criarBreadcrumbs(caminho) {
  const partes = caminho ? caminho.split("/") : [];
  breadcrumbs.innerHTML = [
    '<a href="#/">Arquivos</a>',
    ...partes.map((parte, indice) => {
      const destino = partes.slice(0, indice + 1).join("/");
      return `<span aria-hidden="true">/</span><a href="#${encodeURIComponent(destino)}">${escapar(parte)}</a>`;
    })
  ].join("");
}

function formatarTamanho(bytes) {
  if (typeof bytes !== "number") return "";
  if (bytes < 1024) return `${bytes} B`;
  const unidades = ["KB", "MB", "GB", "TB"];
  let tamanho = bytes / 1024;
  let unidade = 0;
  while (tamanho >= 1024 && unidade < unidades.length - 1) {
    tamanho /= 1024;
    unidade += 1;
  }
  return `${new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 1 }).format(tamanho)} ${unidades[unidade]}`;
}

function renderizarPasta() {
  if (arquivos === null) return;

  const caminho = obterCaminhoAtual();
  errorMessage.hidden = true;
  emptyState.hidden = true;
  entries.innerHTML = "";

  if (caminho === null) {
    errorMessage.textContent = "O caminho da pasta é inválido.";
    errorMessage.hidden = false;
    return;
  }

  if (caminho && !arquivos.some(item => item.pasta === caminho || item.pasta.startsWith(`${caminho}/`))) {
    criarBreadcrumbs("");
    errorMessage.textContent = "Esta pasta não foi encontrada.";
    errorMessage.hidden = false;
    return;
  }

  criarBreadcrumbs(caminho);
  const prefixo = caminho ? `${caminho}/` : "";
  const subpastas = new Set();
  const arquivosDiretos = [];

  arquivos.forEach(item => {
    if (item.pasta !== caminho && !item.pasta.startsWith(prefixo)) return;
    const restante = item.pasta === caminho ? "" : item.pasta.slice(prefixo.length);
    if (!restante) {
      arquivosDiretos.push(item);
      return;
    }
    subpastas.add(restante.split("/")[0]);
  });

  const itens = [
    ...Array.from(subpastas)
      .sort((a, b) => a.localeCompare(b, "pt-BR"))
      .map(nome => {
        const destino = caminho ? `${caminho}/${nome}` : nome;
        return `<li><a class="entry-link" href="#${encodeURIComponent(destino)}">${escapar(nome)}/</a></li>`;
      }),
    ...arquivosDiretos
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
      .map(item => `
        <li>
          <a class="entry-link" href="${escapar(caminhoRelativo(item.caminho))}" download>${escapar(item.nome)}</a>
          <span class="entry-size">${formatarTamanho(item.tamanho)}</span>
        </li>
      `)
  ];

  entries.innerHTML = itens.join("");
  emptyState.hidden = itens.length > 0;
}

function caminhoRelativo(caminho) {
  return `arquivos/${caminho.slice(FILES_DIRECTORY.length).split("/").map(encodeURIComponent).join("/")}`;
}

async function carregarArquivos() {
  try {
    const response = await fetch(API_URL, {
      headers: { Accept: "application/vnd.github+json" }
    });
    const resultado = await response.json();
    if (!response.ok) {
      throw new Error(resultado.message || `A API do GitHub respondeu com status ${response.status}.`);
    }
    if (resultado.truncated) {
      throw new Error("O repositório é grande demais para ser listado em uma única consulta.");
    }
    if (!Array.isArray(resultado.tree)) {
      throw new Error("A resposta do GitHub não contém a lista de arquivos esperada.");
    }

    arquivos = resultado.tree
      .filter(item => item.type === "blob" && item.path.startsWith(FILES_DIRECTORY))
      .map(item => {
        const caminhoNaBiblioteca = item.path.slice(FILES_DIRECTORY.length);
        const separador = caminhoNaBiblioteca.lastIndexOf("/");
        return {
          caminho: item.path,
          nome: caminhoNaBiblioteca.slice(separador + 1),
          pasta: separador === -1 ? "" : caminhoNaBiblioteca.slice(0, separador),
          tamanho: item.size
        };
      });

    loadStatus.hidden = true;
    renderizarPasta();
  } catch (erro) {
    console.error("Erro ao carregar os arquivos do GitHub:", erro);
    loadStatus.hidden = true;
    errorMessage.textContent = `${erro.message} Verifique a conexão e se o repositório está público.`;
    errorMessage.hidden = false;
  }
}

window.addEventListener("hashchange", renderizarPasta);
document.getElementById("year").textContent = new Date().getFullYear();
carregarArquivos();
