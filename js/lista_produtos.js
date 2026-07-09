import { produtos } from "./produtos.js";

const ProductsSection = document.querySelector(".wrapper__products");

const listarProdutos = () => {
  produtos.forEach((produto) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card__product");

    const productImage = document.createElement("img");
    productImage.src = produto.caminho_da_imagem;
    productImage.alt = produto.descricao_produto;

    const productInfo = document.createElement("div");
    productInfo.classList.add("card__content");

    const productDescription = document.createElement("h4");
    const productPrice = document.createElement("span");
    const productAddToCart = document.createElement("button");
    productAddToCart.textContent = "Adicionar ao Carrinho";

    productDescription.textContent = produto.descricao_produto;
    productPrice.textContent = `R$ ${produto.valor_unitario.toFixed(2).replace(".", ",")}`;
    productAddToCart.addEventListener("click", () =>
      adicionarProdutoAoCarrinho(produto),
    );

    productInfo.appendChild(productDescription);
    productInfo.appendChild(productPrice);
    productInfo.appendChild(productAddToCart);

    productCard.appendChild(productImage);
    productCard.appendChild(productInfo);
    ProductsSection.appendChild(productCard);
  });
};

const adicionarProdutoAoCarrinho = (produto) => {
  console.log(`Produto adicionado ao carrinho: ${produto.descricao_produto}`);
};

listarProdutos();
