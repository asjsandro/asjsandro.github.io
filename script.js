const repoOwner = "asjsandro";
const repoName = "asjsandro.github.io;
const folderPath = "files"; // Nome da pasta onde estão os arquivos

const filesListDiv = document.getElementById('filesList');

// Busca a lista de arquivos diretamente da API do GitHub
fetch(`https://github.com{repoOwner}/${repoName}/contents/${folderPath}`)
  .then(response => response.json())
  .then(data => {
    // Filtra para garantir que estamos pegando apenas arquivos
    const files = data.filter(item => item.type === 'file');

    files.forEach(file => {
      const link = document.createElement('a');
      // Usa o caminho relativo correto para o download no GitHub Pages
      link.href = `./${folderPath}/${file.name}`; 
      link.download = file.name;
      link.textContent = file.name;
      link.classList.add('download-link');

      const listItem = document.createElement('div');
      listItem.appendChild(link);
      filesListDiv.appendChild(listItem);
    });
  })
  .catch(error => console.error('Erro ao listar arquivos:', error));
