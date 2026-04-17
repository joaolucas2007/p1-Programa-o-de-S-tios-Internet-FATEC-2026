'use strict'

async function buscarHerois() {
  const nome = document.getElementById("input-pesquisa").value.toLowerCase(); //pega o input, pega o valor que foi digitado e deixa tudo em minusculo
  const container = document.getElementById("container");

  container.replaceChildren(Object.assign(document.createElement("p"), { textContent: "Carregando..." })); //esse object.assign serve para deixar essa função mais rapido, para encontrar a  buscar na api, enquanto não encontra fica essa mensagem 'carreegando...'

  try {
    const response = await fetch("https://akabab.github.io/superhero-api/api/all.json");
    const data = await response.json();   //pega o conteúdo da API e transforma e json

    const filtrados = data.filter(hero =>
      hero.name.toLowerCase().includes(nome)          //filtrar os hérois e ve se está com o nome da busca 
    );

    if (filtrados.length === 0) {
      return container.replaceChildren(Object.assign(document.createElement("p"), {
        textContent: "Nenhum personagem encontrado"                                             // esse if serve para caso o personagem procurado não esteja na api ele manda essa mensagem 
      }));                                   
    }

    const cards = filtrados.map(hero => {
      const card = document.createElement("div");
      card.classList.add("card");                                                 //você cria o card e adiciona a class do css

      const img = Object.assign(document.createElement("img"), {
        src: hero.images.md,
        alt: hero.name
      });

      const nomeHeroi = Object.assign(document.createElement("h3"), {
        textContent: hero.name
      });
                                                                                      //ta pegando os conteúdos da api, como a imagem de os detalhes dos personagens, nome, força, inteligencia e velocidade
      const real = document.createElement("p");
      real.innerHTML = `<strong>Nome real:</strong> ${hero.biography.fullName || "Desconhecido"}`;

      const forca = Object.assign(document.createElement("p"), {
        textContent: `Força: ${hero.powerstats.strength}`
      });

      const inteligencia = Object.assign(document.createElement("p"), {
        textContent: `Inteligência: ${hero.powerstats.intelligence}`
      });

      const velocidade = Object.assign(document.createElement("p"), {
        textContent: `Velocidade: ${hero.powerstats.speed}`
      });

      card.append(img, nomeHeroi, real, forca, inteligencia, velocidade);
      return card;                                                                //coloca os dados procurados dentro do card
    });

    container.replaceChildren(...cards);    //esses ... serve para separar em card 1 card 2 card 3 etc etc                                   //adiciona o conteudo do card na api

  } catch {
    container.replaceChildren(Object.assign(document.createElement("p"), {
      textContent: "Erro ao carregar dados"
    }));                                                                                                //serve para tratar erros, caso a api não carregue ou a net caia
  }
}