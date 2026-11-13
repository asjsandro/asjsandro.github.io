const REPOSITORY = "asjsandro/asjsandro.github.io";
const BRANCH = "main";
const FILES_DIRECTORY = "downloads/arquivos/";
const API_URL = `https://api.github.com/repos/${REPOSITORY}/git/trees/${BRANCH}?recursive=1`;

const grid = document.getElementById("fileGrid");
const searchInput = document.getElementById("searchInput");
const resultCount = document.getElementById("resultCount");
const loadStatus = document.getElementById("loadStatus");
const emptyState = document.getElementById("emptyState");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");
let arquivos = [];

function renderizarArquivos() {
  const termo = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const filtrados = arquivos.filter(item =>
    `${item.pasta} ${item.nome}`.toLocaleLowerCase("pt-BR").includes(termo)
  );
  const grupos = new Map();

  filtrados.forEach(item => {
    if (!grupos.has(item.pasta)) grupos.set(item.pasta, []);
    grupos.get(item.pasta).push(item);
  });

  const pastas = Array.from(grupos.keys()).sort((a, b) => a.localeCompare(b, "pt-BR"));
  grid.innerHTML = pastas.map(pasta => `
    <section class="folder-group" aria-label="Pasta ${escapar(pasta)}">
      <div class="folder-heading">
        <h3>${escapar(pasta)}</h3>
        <span>${grupos.get(pasta).length} ${grupos.get(pasta).length === 1 ? "arquivo" : "arquivos"}</span>
      </div>
      <ul class="file-list">
        ${grupos.get(pasta).map(item => `
          <li class="file-row">
            <div class="file-info">
              <span class="file-name">${escapar(item.nome)}</span>
              <span class="file-size">${formatarTamanho(item.tamanho)}</span>
            </div>
            <a class="download-link" href="${escapar(caminhoRelativo(item.caminho))}" download aria-label="Baixar ${escapar(item.nome)}">
              Baixar <span aria-hidden="true">↓</span>
            </a>
          </li>
        `).join("")}
      </ul>
    </section>
  `).join("");

  resultCount.textContent = `${filtrados.length} ${filtrados.length === 1 ? "arquivo" : "arquivos"}`;
  emptyState.hidden = filtrados.length !== 0;
}

function escapar(valor) {
  return String(valor).replace(/[&<>"']/g, caractere => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[caractere]);
}

function caminhoRelativo(caminho) {
  return `arquivos/${caminho.slice(FILES_DIRECTORY.length).split("/").map(encodeURIComponent).join("/")}`;
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
          pasta: separador === -1 ? "Arquivos" : caminhoNaBiblioteca.slice(0, separador),
          tamanho: item.size
        };
      })
      .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    loadStatus.hidden = true;
    renderizarArquivos();
  } catch (erro) {
    console.error("Erro ao carregar os arquivos do GitHub:", erro);
    loadStatus.hidden = true;
    grid.hidden = true;
    errorState.hidden = false;
    errorMessage.textContent = `${erro.message} Verifique a conexão e se o repositório está público.`;
  }
}

searchInput.addEventListener("input", renderizarArquivos);
document.getElementById("year").textContent = new Date().getFullYear();
carregarArquivos();
