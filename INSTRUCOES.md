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
        ├── ferramentas/
        │   └── instalador.exe
        └── manuais/
            └── guia.pdf
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

1. Crie uma pasta dentro de `downloads/arquivos/` para organizar seus arquivos.
2. Coloque os arquivos para download dentro da pasta. Você também pode criar subpastas.
3. Faça o commit e publique as alterações na branch `main`.
4. A página mostra links para as subpastas. Ao abrir uma pasta, aparecem as subpastas e os arquivos daquele nível; cada arquivo tem um link de download. Não é necessário editar o JavaScript nem cadastrar os arquivos manualmente.

Exemplo:

```text
downloads/
└── arquivos/
    ├── ferramentas/
    │   └── instalador.exe
    └── manuais/
        └── guia.pdf
```

Arquivos diretamente em `downloads/arquivos/` aparecem agrupados em **Arquivos**. O Git não publica pastas vazias: cada pasta precisa conter pelo menos um arquivo versionado para aparecer na página.

## Cuidados e limites

- O conteúdo de um repositório público pode ser acessado por qualquer pessoa. Não envie senhas, chaves, dados pessoais ou arquivos confidenciais.
- GitHub Pages é hospedagem estática: não possui login, banco de dados ou painel administrativo para cadastrar arquivos.
- A listagem consulta a API pública do GitHub e, por isso, o repositório precisa ser público. Se mudar o nome do repositório ou a branch publicada, atualize as constantes no início de `downloads/assets/app.js`.
- A API pública tem limite de consultas; se a lista não carregar, aguarde alguns minutos e tente novamente.
- Para arquivos muito grandes, downloads frequentes ou instaladores pesados, considere GitHub Releases ou armazenamento próprio. Consulte os limites atuais do GitHub antes de publicar.
- A página usa Google Fonts como melhoria visual; se a fonte externa não carregar, fontes alternativas serão utilizadas.
- O exemplo `LEIA-ME.txt` é apenas um arquivo de demonstração. Troque-o pelos arquivos reais antes de divulgar a página.

## Solução de problemas

- **404 na página:** confira se o repositório publica a branch/pasta correta e se existe `downloads/index.html`.
- **CSS não carrega:** confira se `downloads/assets/style.css` foi enviado e se o nome está exatamente igual.
- **Um arquivo não aparece:** confira se ele está dentro de `downloads/arquivos/`, se foi enviado ao GitHub e se a publicação foi concluída.
- **A lista não carrega:** confira se o repositório está público e se `REPOSITORY` e `BRANCH` em `downloads/assets/app.js` correspondem ao repositório publicado.
- **Mudanças não aparecem:** aguarde a publicação e atualize o navegador com Ctrl+F5.

## Observação sobre repositório de projeto

O endereço `https://SEUUSUARIO.github.io/` normalmente corresponde ao repositório especial `SEUUSUARIO.github.io`. Se seu site estiver em um repositório de projeto, o endereço pode incluir o nome do repositório antes de `/downloads/`.
