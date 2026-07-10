import { produtos } from "./produtos.js";

const productsSection = document.querySelector(".wrapper__products");
const categoriesList = document.querySelector(".categories");

const buscarCategorias = () => {
  const categoriasMap = new Map();

  produtos.map((produto) => {
    categoriasMap.set(produto.id_secao, produto.nome_secao);
  });

  return Array.from(categoriasMap);
};

const listarCategorias = () => {
  const categorias = [[null, "Tudo"], ...buscarCategorias()];

  categorias.forEach((categoria) => {
    const categoriaLi = document.createElement("li");
    const categoriaBtn = document.createElement("button");

    categoriaBtn.textContent = categoria[1];

    categoriaBtn.addEventListener("click", () => {
      filtrarProdutosPorCategoria(categoria[0]);
    });

    categoriaLi.appendChild(categoriaBtn);
    categoriesList.appendChild(categoriaLi);
  });
};

function filtrarProdutosPorCategoria(idCategoria) {
  if (idCategoria === null) {
    listarProdutos(produtos);
    return;
  }

  const produtosFiltrados = produtos.filter((produto) => {
    return produto.id_secao == idCategoria;
  });

  listarProdutos(produtosFiltrados);
}

const listarProdutos = (produtos) => {
  productsSection.innerHTML = "";

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
    productsSection.appendChild(productCard);
  });
};

const adicionarProdutoAoCarrinho = (produto) => {
  console.log(`Produto adicionado ao carrinho: ${produto.descricao_produto}`);
};

listarProdutos(produtos);
listarCategorias();
