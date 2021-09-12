<h2 align="center">
  <img src="https://img.shields.io/badge/Next%20Level%20Week-%233-00b8d3?style=for-the-badge" alt="Evento Next Level Week 3" />
  <img src="https://img.shields.io/badge/web%3F-Yes-00b8d3?style=for-the-badge" alt="Sistema web Yes" />
  <img src="https://img.shields.io/badge/server%3F-yes-00b8d3?style=for-the-badge" alt="Server Yes" />
  <img src="https://img.shields.io/badge/app mobile%3F-yes-00b8d3?style=for-the-badge" alt="Aplicativo mobile Yes" />
  <img src="https://img.shields.io/github/license/matheusfelipeog/proffy?color=00b8d3&style=for-the-badge" alt="License" />
</h2>

<h1 align="center">
  <img src="https://i.imgur.com/2UJUZYI.png" alt="Logo Happy" width="1000px" />
</h1>

## 📌 Index

- [Sobre o projeto](#-sobre-o-projeto)
- [Screenshots](#-screenshots)
- [Techs](#-techs)
- [Instalação e Start](#-instalação-e-start)
- [Contribuições](#-contribuições)
- [License](#-license)

## ❔ Sobre o projeto

Plataforma para vizitação de orfanatos com intuito de levar alegria para crianças.

O projeto está em desenvolvimento na [Next Level Week 3](https://nextlevelweek.com/episodios/omnistack/1/edicao/3)

## 📸 Screenshots

<h1 align="center">
  <img src=".github/4.png" alt="Logo Happy" width="1000px" />
</h1>

<h1 align="center">
  <img src=".github/1.png" alt="Logo Happy" width="1000px" />
</h1>

<h1 align="center">
  <img src=".github/2.png" alt="Logo Happy" width="1000px" />
</h1>

<h1 align="center">
  <img src=".github/3.png" alt="Logo Happy" width="1000px" />
</h1>

## 🍃 Rotas do Backend

| METHOD | ROUTE                            | DESCRIPTION                          |
| ------ | -------------------------------- | ------------------------------------ |
| GET    | ${YOUR_API}/orphanages           | index orphanages                     |
| GET    | ${YOUR_API}/orphanages/:id       | show orphanage                       |
| GET    | ${YOUR_API}/pending              | get orphanages waiting for acception |
| GET    | ${YOUR_API}/users                | index users                          |
| GET    | ${YOUR_API}/users/:id            | show user                            |
| POST   | ${YOUR_API}/login                | authentication                       |
| POST   | ${YOUR_API}/forgot               | request new password by email        |
| POST   | ${YOUR_API}/reset                | reset password                       |
| POST   | ${YOUR_API}/orphanages           | create orphanage                     |
| POST   | ${YOUR_API}/register             | create user                          |
| PUT    | ${YOUR_API}/pending/:id          | update orphanage status              |
| PUT    | ${YOUR_API}/orphanage/edit       | update orphanage info                |
| PUT    | ${YOUR_API}/user                 | update user info                     |
| DELETE | ${YOUR_API}/orphanage/delete/:id | delete orphanage                     |
| DELETE | ${YOUR_API}/user/delete/:id      | delete user                          |

## 🛠 Techs

This project was developed using the following technologies:

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://pt-br.reactjs.org/)
- [React Native](https://reactnative.dev/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [SQLite](https://www.sqlite.org/index.html)
- [Expo](https://expo.io/)
- [Framer](https://www.framer.com/motion/)
- [Mapbox](https://www.mapbox.com/)

---

## Versão 2.0

[Desafio Happy 2.0](https://github.com/Olliveer/Happy-2.0)

## :hammer_and_wrench: New Features

- [x] Autenticação JWT.
- [x] Admin area.
- [x] Aceitar ou recusar orfanato cadastro.
- [x] Atualização/remoção de orfanatos.
- [x] Upload/remoção de imagens do orfanto via AWS S3.
- [x] Painel de usuários(CRUD).

## ⚙ Instalação e Start

```bash
# Clone this repository
$ git clone https://github.com/Olliveer/Happy.git
# Go into the repository
$ cd backend

# Install dependencies
$ yarn install

# Run Migrates
$ yarn typeorm migration:run

# Start server
$ yarn dev

# running on port 3333
```

### Install Front-end

```bash
# Clone this repository
$ git clone https://github.com/Olliveer/Happy.git

# Go into the repository
$ cd web

# Install dependencies
$ yarn install

# Run
$ yarn start

# running on port 3333

```

### Install Mobile

```bash
# Clone this repository
$ git clone https://github.com/Olliveer/Happy.git

# Go into the repository
$ mobile

# Install dependencies
$ yarn install

# Run
$ yarn start

```

## 📜 License

O projeto está sobre a licença [MIT](./LICENSE)

---

[![image](https://img.shields.io/badge/😎%20José%20Oliveira,%202021-LinkedIn-29B6D1?style=flat-square)](https://www.linkedin.com/in/joseooliveira/)
