# Projeto-Web

Projeto de web feito com intuito de divulgar uma loja virtual, promovendo um estabelecimento físico localizado na Rua do Lazer.

A loja é especializada em manufatura e venda de produtos cosméticos caseiros, como perfumes, essências, velas e body splash. 

Para o site, fizemos uma página inicial (Home) com navegações no topo que levam para a seção de contato, informações sobre a loja, seção de compras e uma parte interativa que calcula o frete.

Ao clicar em botões ao longo do site, o usuário é redirecionado para uma seção onde são mostradas ofertas de kits de vela, home-spray e perfume.

Através do JavaScript, adicionamos a funcionalidade do carrinho, onde o usuário poderá escolher os kits que deseja, a quantidade, e adicionar ao carrinho. Ao clicar no kit, é possível escolher a quantidade. No carrinho, é possível remover ou comprar.

No entanto, caso o item esteja indisponível, será recebido um prompt alertando que ele está indisponível, e pedirá um e-mail válido
para que o usuário seja notificado quando chegar o produto. Caso seja digitado algo fora do normal no campo de e-mail, ele acusa "inválido".

Também foi implementado um sistema de calcular o frete, que o usuário colocará o CEP dele, e vai calcular de acordo com a distância para a loja. Porém, não serão aceitos CEPs que não são de Recife, pois a loja ainda não pode arcar com entregas que não sejam locais. Ele também acusará quando o 
CEP for inválido.


Neste projeto, foi utilizado HTML e CSS para a estruturação e estilização do site. Para interações dinâmicas, foi utilizado JavaScript, sem a ajuda de frameworks. 

## Figma: 

https://www.figma.com/design/i4D1KMnnf9hZ0QgiN4e6zG/Aromata-Vitae?node-id=0-1&t=vzAn6n0bGQM6xTzi-1


# Funcionalidades:
## Home - Index.html:
#### Botões no header:
Home - Volta para a página home (index.html)

Produtos - Vai para a página de compra (index2.html)

Sobre Nós - Vai para a seção de "sobre" (seção que seria o id #about)

Contato - Vai para a seção de "contatos" e mostra a localização (seção que seria o id #contato)

Frete - Vai para a seção de calcular o frete.

#### Botão no Banner Principal:

"Encomende Já"- Vai para a seção de compra (index2.html)

#### Botão de Principais Produtos:

"Ver mais Produtos" - Vai para a seção de compra (index2.html)

#### Seção Contatos:

API do Google que, por meio do link do endereço, coloca um "quadro" com a localização de forma interativa, como o aplicativo do Maps.

## Seção Compras - Index2.html:

#### Botões no Banner Principal:

"Compre Já" - Adiciona a quantidade desejada no carrinho.

"Esgotado!" - Avisa que não está disponível e pede um prompt para o usuário digitar seu e-mail, para notificá-lo quando o produto chegar.

#### Carrinho:

Mostra a quantidade de itens no carrinho, e o valor somado dos produtos nele.

"Finalizar Compra" - Mostra um aviso de que a compra foi concluída. 

## Frete - Index3.html

CEP - Pede o CEP do usuário, e calcula quanto ficará o frete de acordo com a localização.

<hr>

### Histórias:

Descrição: Como cliente da loja virtual Aromata Vitae, quero navegar facilmente entre as páginas, visualizar os produtos disponíveis e indisponíveis, calcular o preço do frete e conhecer mais sobre a loja, para que eu possa decidir sobre uma possível compra, e saber sobre produtos em re-estoque.

Critérios de Aceitação:

O menu de navegação deve estar disponível no topo do site, com links claros para as seções "Home", "Produtos", "Sobre Nós", "Contato" e "Frete".

A página inicial deve exibir um banner com um botão de chamada para ação, levando o cliente diretamente para a página de produtos.

A página "Produtos" deve exibir uma lista de kits com informações detalhadas, como descrição, preço e itens inclusos.

A seção "Contato" deve incluir um mapa interativo e informações de contato claras (endereço, telefone e e-mail), junto com outra seção de  "Frete", que deve incluir um sistema que calcule quanto ficará a taxa de entrega.

O carrinho deve ter funções de adicionar, remover e comprar, e os itens disponíveis devem ter a função de selecionar a quantidade do item.

Quando o usuário quiser comprar um item esgotado, deve ser pedido o e-mail dele, para que assim possamos avisá-lo quando o item chegar.


<hr>

### Integrantes: 

Guilherme Melo

Marina Cantarelli

Rennan Carneiro

Vinicius Romariz
