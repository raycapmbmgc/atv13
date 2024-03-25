const express = require('express');
const app = express();
const PORT = 3001;

// Configuração do EJS como mecanismo de visualização
app.set('view engine', 'ejs');

// Middleware para lidar com solicitações JSON
app.use(express.json());
// Middleware para lidar com solicitações de URL codificadas
app.use(express.urlencoded({ extended: true }));

// Array simulando o banco de dados de livros
const livrosDB = [
    { id: 1, titulo: 'O Senhor dos Anéis', autor: 'J.R.R. Tolkien', ano: 1954 },
    { id: 2, titulo: 'Harry Potter e a Pedra Filosofal', autor: 'J.K. Rowling', ano: 1997 },
    { id: 3, titulo: '1984', autor: 'George Orwell', ano: 1949 },
    { id: 4, titulo: 'Dom Quixote', autor: 'Miguel de Cervantes', ano: 1605 },
    { id: 5, titulo: 'Cem Anos de Solidão', autor: 'Gabriel García Márquez', ano: 1967 },
    { id: 6, titulo: 'A Revolução dos Bichos', autor: 'George Orwell', ano: 1945 },
    { id: 7, titulo: 'Orgulho e Preconceito', autor: 'Jane Austen', ano: 1813 },
    { id: 8, titulo: 'Crime e Castigo', autor: 'Fiódor Dostoiévski', ano: 1866 },
    { id: 9, titulo: 'A Montanha Mágica', autor: 'Thomas Mann', ano: 1924 },
    { id: 10, titulo: 'Moby Dick', autor: 'Herman Melville', ano: 1851 }
];

// Rota principal
app.get('/', (req, res) => {
    res.render('index', { livrosDB });
}); //Define uma rota para a raiz do aplicativo. Quando um cliente faz uma solicitação GET para /, o servidor renderiza o template index.ejs, passando o array livrosDB como contexto.


// Rota para a busca de livros
app.get('/busca', (req, res) => {
    const { titulo, ano } = req.query; //Define uma rota para /busca. Quando um cliente faz uma solicitação GET para /busca, o servidor executa uma lógica para buscar livros com base nos parâmetros de consulta fornecidos na URL.
    let resultado = [];

    if (titulo) {
        resultado = livrosDB.filter(livro => livro.titulo.toLowerCase().includes(titulo.toLowerCase()));
    } else if (ano) {
        resultado = livrosDB.filter(livro => livro.ano == ano);
    }

    res.render('index', { livrosDB, resultado });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
