/*
 * CADASTRO DE ARQUIVOS
 * Adicione ou edite os itens abaixo. O campo "arquivo" é relativo à pasta downloads/.
 * Exemplo: arquivos/meu-programa.zip
 */
const arquivos = [
  {
    nome: "Exemplo de programa",
    descricao: "Substitua este exemplo pelos dados do programa que deseja disponibilizar.",
    categoria: "programas",
    formato: "ZIP",
    tamanho: "A informar",
    versao: "1.0.0",
    atualizado: "13/11/2026",
    arquivo: "arquivos/LEIA-ME.txt"
  },
  {
    nome: "Manual de utilização",
    descricao: "Exemplo de documentação. Troque o caminho pelo PDF correspondente.",
    categoria: "documentos",
    formato: "TXT",
    tamanho: "A informar",
    versao: "1.0",
    atualizado: "13/11/2026",
    arquivo: "arquivos/LEIA-ME.txt"
  }
];

const grid = document.getElementById("fileGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("filters");
const resultCount = document.getElementById("resultCount");
const emptyState = document.getElementById("emptyState");
let categoriaAtual = "todos";

const nomesCategorias = {
  programas: "Programas",
  utilitarios: "Utilitários",
  documentos: "Documentos",
  atualizacoes: "Atualizações"
};

function renderizarArquivos() {
  const termo = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const filtrados = arquivos.filter(item => {
    const correspondeCategoria = categoriaAtual === "todos" || item.categoria === categoriaAtual;
    const texto = `${item.nome} ${item.descricao} ${item.formato} ${item.versao}`.toLocaleLowerCase("pt-BR");
    return correspondeCategoria && texto.includes(termo);
  });

  grid.innerHTML = filtrados.map(item => `
    <article class="file-card">
      <div class="file-top">
        <span class="file-type">${escapar(item.formato)}</span>
        <span class="file-category">${escapar(nomesCategorias[item.categoria] || item.categoria)}</span>
      </div>
      <h3>${escapar(item.nome)}</h3>
      <p>${escapar(item.descricao)}</p>
      <div class="file-meta">
        <span>Versão ${escapar(item.versao)}</span>
        <span>${escapar(item.tamanho)}</span>
        <span>${escapar(item.atualizado)}</span>
      </div>
      <a class="download-link" href="${escapar(item.arquivo)}" download>
        Baixar arquivo <span aria-hidden="true">↓</span>
      </a>
    </article>
  `).join("");

  resultCount.textContent = `${filtrados.length} ${filtrados.length === 1 ? "arquivo" : "arquivos"}`;
  emptyState.hidden = filtrados.length !== 0;
}

function escapar(valor) {
  return String(valor).replace(/[&<>"']/g, caractere => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[caractere]);
}

searchInput.addEventListener("input", renderizarArquivos);
filters.addEventListener("click", evento => {
  const botao = evento.target.closest("button[data-filter]");
  if (!botao) return;
  categoriaAtual = botao.dataset.filter;
  filters.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === botao));
  renderizarArquivos();
});
document.getElementById("year").textContent = new Date().getFullYear();
renderizarArquivos();
