# API

## Instalação

```sh
$ yarn
```

ou

```sh
$ npm i
```

## Executar

```sh
$ yarn dev
```

ou

```sh
$ npm run dev
```

## Como testar

Atualmente só existe uma rota

é possível chamar ela com um curl

```sh
$ curl localhost:3001/api/_healthz
```

## git branch

-   Escreva o branch em inglês e letra minúscula no formato `<type>/<name>`
    Para o (`<type>`):
    -   **feature**: Desenvolver nova funcionalidade;
    -   **bugfix**: Corrigir um bug;
    -   **chore**: Realizar uma tarefa como: mudanças de configuração; mudança de
        ferramentas; coisas que não entram em produção, etc;
    -   **refactor**: Refatorar código;
    -   **test**: **Apenas** para adicionar ou corrigir testes;
        Para o `<name>`
    -   Use hífens para separar as palavras.
    -   Escreva de forma _curta_ e _descritiva_.

Ex.:

```sh
  git checkout -b feature/add-test-setup
```

## git convetional commits

-   Use o formato `<type>(<scope>): <subject>` para o título
    Tipos (`<type>`):
    -   **feat**: Adicinar uma funcionalidade;
    -   **fix**: Corrigir um bug;
    -   **chore**: Atualizar pacote, adicionar script, configurar CI, etc;
    -   **docs**: Adicionar uma documentação, atualizar README;
    -   **test**: Adicionar novo test, etc;
    -   **style**: Formatar código, indentação, etc;
    -   **refactor**: Renomear váriavel, refatorar função, etc;
        Já o `<scope>` é opcional e depende do contexto do projeto.
        Para o `<subject>` deve conter uma descrição sucinta.

Ex.:

```sh
  git commit -m "docs: add git style guide to README"
```

https://www.digitalocean.com/community/tutorials/como-construir-uma-aplicacao-node-js-com-o-docker-pt
