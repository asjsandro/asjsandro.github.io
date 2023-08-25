// Lista de arquivos. No caso do GitHub Pages, é estática.
// Caso estivesse em um servidor, poderia ser gerada dinamicamente.
const files = [
    "the.chemistry.of.death.s01e02.multi.1080p.web.x264-amb3r[eztv.re].mkv.torrent",
    "the.chemistry.of.death.s01e03.multi.1080p.web.x264-amb3r[eztv.re].mkv.torrent",
    "The.Chemistry.Of.Death.S01.1080p.AMZN.WEBRip.DDP5.1.x264-NTb[eztv.re].torrent"
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
