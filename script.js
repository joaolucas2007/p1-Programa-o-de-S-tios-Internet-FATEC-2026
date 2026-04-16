'use strict'

async function buscarHerois() {
  const nome = document.getElementById("searchInput").value.toLowerCase();
  const container = document.getElementById("container");

  container.innerHTML = "Carregando...";

  try {
    const response = await fetch("https://akabab.github.io/superhero-api/api/all.json");
    const data = await response.json();

    const filtrados = data.filter(hero =>
      hero.name.toLowerCase().includes(nome)
    );

    container.innerHTML = "";

    if (filtrados.length === 0) {
      container.innerHTML = "<p>Nenhum personagem encontrado</p>";
      return;
    }

    filtrados.forEach(hero => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${hero.images.md}" alt="${hero.name}">
        <h3>${hero.name}</h3>
        <p><strong>Nome real:</strong> ${hero.biography.fullName || "Desconhecido"}</p>

        <p><strong>Força:</strong> ${hero.powerstats.strength}</p>
        <p><strong>Inteligência:</strong> ${hero.powerstats.intelligence}</p>
        <p><strong>Velocidade:</strong> ${hero.powerstats.speed}</p>
      `;

      container.appendChild(card);
    });

  } catch (erro) {
    container.innerHTML = "<p>Erro ao carregar dados</p>";
    console.error("Erro:", erro);
  }
}