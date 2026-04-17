'use strict'

async function buscarHerois() {
  const nome = document.getElementById("searchInput").value.toLowerCase();  //tolowerCase serve para deixar tudo em minúsculo evitando não achar o personagem bsucado
  const container = document.getElementById("container");

  container.innerHTML = "Carregando..."; 

  try {
    const response = await fetch("https://akabab.github.io/superhero-api/api/all.json");//api do github de personagens é de um projeto open souce do git hub
    const data = await response.json();

    const filtrados = data.filter(hero =>
      hero.name.toLowerCase().includes(nome)   //serve para filtrar os heróis vai buscar em toda a api mas só vai trazer os que correspondem com o nome digitado
    );

    container.innerHTML = "";

    if (filtrados.length === 0) {
      container.innerHTML = "<p>Nenhum personagem encontrado</p>";  //esse se serve para caso não encontre nada o personagem buscado não esteja na api e não encontrou ai mostra essa mensagem
      return;
    }

    filtrados.forEach(hero => {
      const card = document.createElement("div"); //para cada herói encontrada cria uma div e aplica o css
      card.classList.add("card");

      card.innerHTML = `
        <img src="${hero.images.md}" alt="${hero.name}">  
        <h3>${hero.name}</h3>                                                                  
        <p><strong>Nome real:</strong> ${hero.biography.fullName || "Desconhecido"}</p>  

        <p><strong>Força:</strong> ${hero.powerstats.strength}</p>
        <p><strong>Inteligência:</strong> ${hero.powerstats.intelligence}</p>
        <p><strong>Velocidade:</strong> ${hero.powerstats.speed}</p>
      `;                                                                      //dados que estão na API 

      container.appendChild(card);
    });

  } catch (erro) {
    container.innerHTML = "<p>Erro ao carregar dados</p>";
    console.error("Erro:", erro);
  }
}