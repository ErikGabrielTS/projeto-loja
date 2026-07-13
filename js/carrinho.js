import { produtos } from "./produtos.js";

const produtosSection = document.querySelector("#produtos");
const valorTotalSpan = document.querySelector("#valor-total");
const valorFreteSpan = document.querySelector("#valor-frete");
const valorAPagarSpan = document.querySelector("#valor-a-pagar");
const valorFrete = 10;

const listarItensCarrinho = (itensCarrinho) => {
  produtosSection.innerHTML = "";

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
      atualizarProdutoDoCarrinho(item.id_produto, item.quantidade);
      atualizarResumoCarrinho();
    });
    divInfo.appendChild(titleInfo);
    divInfo.appendChild(priceInfo);
    divInfo.appendChild(inputAmount);
    divInfo.appendChild(totalInfo);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.addEventListener("click", () => {
      removerProdutoDoCarrinho(item.id_produto);
      listarItensCarrinho(buscarProdutosCarrinho());
    });

    const divCard = document.createElement("div");
    divCard.classList.add("product__card");
    divCard.appendChild(divImage);
    divCard.appendChild(divInfo);
    divCard.appendChild(deleteBtn);

    produtosSection.appendChild(divCard);
  });
};

const buscarProdutoById = (idProduto) => {
  return produtos.find((produto) => produto.id_produto === idProduto);
};

const buscarProdutosCarrinho = () => {
  return JSON.parse(localStorage.getItem("carrinho"));
};

const atualizarProdutoDoCarrinho = (idProduto, novaQtd) => {
  const carrinhoAtual = buscarProdutosCarrinho() || [];
  if (carrinhoAtual.length < 1) {
    return;
  }

  const carrinhoAtualizado = carrinhoAtual.map((item) => {
    if (item.id_produto === idProduto) {
      return { ...item, quantidade: novaQtd };
    }

    return item;
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));
};

const removerProdutoDoCarrinho = (idProdutoRemover) => {
  const carrinhoAtual = buscarProdutosCarrinho() || [];

  if (carrinhoAtual.length < 1) {
    return;
  }

  const carrinhoAtualizado = carrinhoAtual.filter(
    (item) => item.id_produto !== idProdutoRemover,
  );

  localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));

  atualizarResumoCarrinho();
};

const atualizarResumoCarrinho = () => {
  const carrinho = buscarProdutosCarrinho() || [];

  if (carrinho.length > 0) {
    const somaTotal = carrinho.reduce((acc, item) => {
      const produto = buscarProdutoById(item.id_produto);
      return (acc += produto.valor_unitario * item.quantidade);
    }, 0);

    valorTotalSpan.textContent = `R$ ${somaTotal.toFixed(2).replace(".", ",")}`;
    valorFreteSpan.textContent = `R$ ${valorFrete.toFixed(2).replace(".", ",")}`;
    valorAPagarSpan.textContent = `R$ ${(somaTotal + valorFrete).toFixed(2).replace(".", ",")}`;
  } else {
    valorTotalSpan.textContent = `R$ ${(0).toFixed(2).replace(".", ",")}`;
    valorFreteSpan.textContent = `R$ ${(0).toFixed(2).replace(".", ",")}`;
    valorAPagarSpan.textContent = `R$ ${(0).toFixed(2).replace(".", ",")}`;
  }
};

listarItensCarrinho(buscarProdutosCarrinho());

atualizarResumoCarrinho();
