const repoOwner = "asjsandro";
const repoName = "asjsandro.github.io";
const folderPath = "files";

const filesListDiv = document.getElementById("filesList");

fetch("https://github.com" + repoOwner + "/" + repoName + "/contents/" + folderPath)
  .then(response => response.json())
  .then(data => {
    const files = data.filter(item => item.type === "file");

    files.forEach(file => {
      const link = document.createElement("a");
      link.href = "./" + folderPath + "/" + file.name; 
      link.download = file.name;
      link.textContent = file.name;
      link.classList.add("download-link");

      const listItem = document.createElement("div");
      listItem.appendChild(link);
      filesListDiv.appendChild(listItem);
    });
  })
  .catch(error => console.error(error));
