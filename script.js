// Lista de arquivos. No caso do GitHub Pages, é estática.
// Caso estivesse em um servidor, poderia ser gerada dinamicamente.
const files = [
    "arquivo1.pdf",
    "arquivo2.txt"
    // Adicione outros arquivos conforme necessário
];

const filesListDiv = document.getElementById('filesList');

files.forEach(file => {
    const link = document.createElement('a');
    link.href = `./files/${file}`;
    link.download = file;
    link.textContent = file;
    link.classList.add('download-link');

    const listItem = document.createElement('div');
    listItem.appendChild(link);

    filesListDiv.appendChild(listItem);
});
