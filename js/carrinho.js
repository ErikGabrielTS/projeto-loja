import { produtos } from "./produtos.js";

const sectionProdutos = document.querySelector("#produtos");

const listarItensCarrinho = (itensCarrinho) => {
  sectionProdutos.innerHTML = "";

  itensCarrinho.forEach((item) => {
    const produto = buscarProdutoById(item.id_produto);

    const divImage = document.createElement("div");
    divImage.classList.add("container__image");
    const image = document.createElement("img");
    image.classList.add("product__image");
    image.src = produto.caminho_da_imagem;
    image.alt = produto.descricao_produto;
    divImage.appendChild(image);

    const divInfo = document.createElement("div");
    divInfo.classList.add("product__info");
    const titleInfo = document.createElement("h4");
    titleInfo.textContent = produto.descricao_produto;
    const priceInfo = document.createElement("span");
    priceInfo.textContent = `R$ ${produto.valor_unitario.toFixed(2).replace(".", ",")}`;
    const inputAmount = document.createElement("input");
    inputAmount.type = "number";
    inputAmount.value = item.quantidade;
    inputAmount.min = 1;
    const totalInfo = document.createElement("span");
    totalInfo.textContent = `Total: R$ ${(produto.valor_unitario * item.quantidade).toFixed(2).replace(".", ",")}`;
    inputAmount.addEventListener("input", (event) => {
      item.quantidade = event.target.value;
      totalInfo.textContent = `Total: R$ ${(produto.valor_unitario * item.quantidade).toFixed(2).replace(".", ",")}`;
    });
    divInfo.appendChild(titleInfo);
    divInfo.appendChild(priceInfo);
    divInfo.appendChild(inputAmount);
    divInfo.appendChild(totalInfo);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => {
      removerProdutoDoCarrinho(item.id_produto);
      listarItensCarrinho(JSON.parse(localStorage.getItem("carrinho")));
    });

    const divCard = document.createElement("div");
    divCard.classList.add("product__card");
    divCard.appendChild(divImage);
    divCard.appendChild(divInfo);
    divCard.appendChild(deleteBtn);

    sectionProdutos.appendChild(divCard);
  });
};

const buscarProdutoById = (idProduto) => {
  return produtos.find((produto) => produto.id_produto === idProduto);
};

const removerProdutoDoCarrinho = (idProdutoRemover) => {
  const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

  const carrinhoAtualizado = carrinhoAtual.filter(
    (item) => item.id_produto !== idProdutoRemover,
  );

  localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));

  console.log(`Produto com ID ${idProdutoRemover} removido do carrinho!`);
};

listarItensCarrinho(JSON.parse(localStorage.getItem("carrinho")));
