# Central de Downloads — GitHub Pages

Este pacote adiciona uma área de downloads em `/downloads/` dentro de um site GitHub Pages já existente.

## Estrutura

```text
seu-repositorio/
├── (arquivos atuais da homepage)
└── downloads/
    ├── index.html
    ├── assets/
    │   ├── style.css
    │   └── app.js
    └── arquivos/
        └── LEIA-ME.txt
```

## Instalação passo a passo

1. Baixe e extraia `github_pages_downloads.zip`.
2. Entre no GitHub e abra o repositório que publica sua homepage (normalmente `SEUUSUARIO.github.io`).
3. **Não apague nem substitua** os arquivos atuais da homepage.
4. Na raiz do repositório, envie a pasta `downloads` que veio neste pacote. Ela precisa ficar no mesmo nível do `index.html` principal.
5. Confirme que o caminho ficou `downloads/index.html` e que os arquivos `assets/style.css` e `assets/app.js` estão dentro de `downloads/assets/`.
6. Faça o commit das alterações na branch publicada (geralmente `main`).
7. No repositório, abra **Settings → Pages** e confira a configuração de publicação. Se já publica a homepage, normalmente não é necessário mudar nada.
8. Aguarde a publicação terminar em **Actions** (ou no aviso do GitHub Pages em Settings → Pages).
9. Acesse `https://SEUUSUARIO.github.io/downloads/` (substitua `SEUUSUARIO` pelo seu usuário GitHub).

Se seu site usa um domínio personalizado, a página também ficará disponível no domínio, no caminho `/downloads/`.

## Como adicionar arquivos para download

1. Coloque o arquivo real dentro de `downloads/arquivos/` (ou crie subpastas).
2. Abra `downloads/assets/app.js`.
3. No array `arquivos`, copie um objeto de exemplo e altere os campos:

```javascript
{
  nome: "Instalador do Sistema",
  descricao: "Instalador para Windows 10 e 11.",
  categoria: "programas",
  formato: "EXE",
  tamanho: "25 MB",
  versao: "2.4.1",
  atualizado: "13/11/2026",
  arquivo: "arquivos/instalador-sistema.exe"
}
```

4. O caminho em `arquivo` é relativo à pasta `downloads/`. Por exemplo, para `downloads/arquivos/ferramentas/app.zip`, use `arquivos/ferramentas/app.zip`.
5. Salve e publique o `app.js` e o arquivo. O novo item aparecerá na página.

Categorias aceitas: `programas`, `utilitarios`, `documentos` e `atualizacoes`.

## Como atualizar um arquivo

Substitua o arquivo no repositório pelo novo, mantendo o mesmo nome e caminho. Se mudar o nome, atualize também o campo `arquivo` no `app.js`. Atualize versão, tamanho e data exibidos no cadastro.

## Cuidados e limites

- O conteúdo de um repositório público pode ser acessado por qualquer pessoa. Não envie senhas, chaves, dados pessoais ou arquivos confidenciais.
- GitHub Pages é hospedagem estática: não possui login, banco de dados ou painel administrativo para cadastrar arquivos.
- Para arquivos muito grandes, downloads frequentes ou instaladores pesados, considere GitHub Releases ou armazenamento próprio. Consulte os limites atuais do GitHub antes de publicar.
- A página usa Google Fonts como melhoria visual; se a fonte externa não carregar, fontes alternativas serão utilizadas.
- O exemplo `LEIA-ME.txt` é apenas um arquivo de demonstração. Troque-o pelos arquivos reais antes de divulgar a página.

## Solução de problemas

- **404 na página:** confira se o repositório publica a branch/pasta correta e se existe `downloads/index.html`.
- **CSS não carrega:** confira se `downloads/assets/style.css` foi enviado e se o nome está exatamente igual.
- **Download não funciona:** confira o caminho e a grafia do nome do arquivo no campo `arquivo` do `app.js` (maiúsculas/minúsculas importam).
- **Mudanças não aparecem:** aguarde a publicação e atualize o navegador com Ctrl+F5.

## Observação sobre repositório de projeto

O endereço `https://SEUUSUARIO.github.io/` normalmente corresponde ao repositório especial `SEUUSUARIO.github.io`. Se seu site estiver em um repositório de projeto, o endereço pode incluir o nome do repositório antes de `/downloads/`.
