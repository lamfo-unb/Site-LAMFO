# Site LAMFO

Este repositório é referente ao site do LAMFO no domínio lamfo.org que está disponível na URL https://lamfo.org. Esse projeto tem como intuito criar um site totalmente personalizado por nós do LAMFO para divulgarmos o laboratório.

## Sobre

Esse projeto roda com Node.js, utilizando Typescript como linguagem de programaçõa e com o Framework Next.js.

## Requisitos

- Node (LTS)

## Configuração

Para rodar o projeto basta seguir os seguintes passos:

1. execute o comando `npm install` para instalar as dependências.
2. Pedir o arquivo com as variáveis de ambiente para os responsáveis do projeto.
2. Inicie a aplicação com o comando `npm run dev`.
3. Acesse o localhost na porta 3000 que você verá o site rodando.

## Contribuições

Para contribuir, a branche main está bloqueada, então será somente habilitado dar merge para ela caso você faça um pull request, então o recomendado é você criar uma branch com o padrão `feat/seunome-descricao` e depois pedir um pull request.

**IMPORTANTE**: TUDO que for para main será automáticamente enviado para produção e caso tenha variáveis de ambiente novas é preciso configura-las manualmente no servidor, então avise os responsáveis para fazerem isso antes de você subir sua alteração ou deixe explicito no pull request que o que é preciso adicionar.   