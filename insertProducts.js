const db = require('./db');

const produtos = [
  { nome: 'Cappuccino', preco: 8.0, imagem: 'images/Cappuccino-1.png', descricao: 'Cappuccino com canela e cacau.' },
  { nome: 'Latte', preco: 8.0, imagem: 'images/Latte-Coffe.jpg', descricao: 'Latte com caramelo.' },
  { nome: 'Americano', preco: 5.0, imagem: 'images/Americano-coffe.jpg', descricao: 'Café Americano forte.' },
  { nome: 'Expresso', preco: 4.0, imagem: 'images/Espresso.jpg', descricao: 'Expresso intenso.' },
  { nome: 'Flat White', preco: 10.0, imagem: 'images/Flat-White-Coffee.jpg', descricao: 'Flat White cremoso.' },
  { nome: 'Café Preto', preco: 3.0, imagem: 'images/Black-coffe_1_.jpg', descricao: 'Café preto puro.' },
  { nome: 'Macchiato', preco: 6.0, imagem: 'images/Machiatto-coffe.jpg', descricao: 'Macchiato clássico.' },
  { nome: 'Mocha', preco: 10.0, imagem: 'images/Mocha-coffe.png', descricao: 'Mocha com chocolate.' },
  { nome: 'Café Gelado', preco: 8.0, imagem: 'images/cafe-gelado-3.jpeg', descricao: 'Café gelado refrescante.' }
];

produtos.forEach(produto => {
    // Verifique se o produto já existe
    db.get('SELECT * FROM produtos WHERE nome = ?', [produto.nome], (err, row) => {
        if (err) {
            console.error('Erro ao verificar produto:', err.message);
        } else if (!row) {
            // Se o produto não existe, insira-o
            db.run('INSERT INTO produtos (nome, preco, imagem, descricao) VALUES (?, ?, ?, ?)', 
                [produto.nome, produto.preco, produto.imagem, produto.descricao], (err) => {
                if (err) {
                    console.error('Erro ao inserir produto:', err.message);
                } else {
                    console.log(`Produto ${produto.nome} inserido com sucesso!`);
                }
            });
        } else {
            console.log(`Produto ${produto.nome} já existe no banco de dados.`);
        }
    });
});






