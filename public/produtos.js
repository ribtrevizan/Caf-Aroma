document.addEventListener("DOMContentLoaded", () => {

    const containerCards = document.getElementById("container-cards");

    const URL_API = "http://localhost:3000/api/produtos";

    async function carregarProdutos() {

        try {

            const resposta = await fetch(URL_API);

            if (!resposta.ok) {
                throw new Error("Erro ao buscar produtos");
            }

            const produtos = await resposta.json();

            containerCards.innerHTML = "";

            produtos.forEach((produto) => {

                const card = document.createElement("article");

                card.classList.add("card");

                card.innerHTML = `
                    <img src="${produto.imagem}" alt="${produto.nome}">

                    <h3>${produto.nome}</h3>

                    <p>${produto.descricao}</p>

                    <button>Pedir Agora</button>
                `;

                containerCards.appendChild(card);

            });

        } catch (erro) {

            console.error("Erro ao carregar os produtos:", erro);

            containerCards.innerHTML = `
                <p>Não foi possível carregar os produtos no momento.</p>
            `;

        }

    }

    carregarProdutos();

});