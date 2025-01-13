CREATE DATABASE db_biblioteca_digital;

USE db_biblioteca_digital;

SELECT * FROM tbl_livro;

CREATE TABLE tbl_livro (
	id int primary key auto_increment,
    titulo varchar(255) NOT NULL,
    autor varchar(255) NOT NULL,
    genero varchar(100),
	ano_publicacao year,
    editora varchar(255),
	isbn varchar(20) unique,
    foto varchar(255)
);

INSERT INTO tbl_livro(	titulo,
                        autor,
                        genero,
                        ano_publicacao,
                        editora,
                        isbn,
                        foto) values (
                        'O Senhor dos Anéis',
                        'J.R.R Tolkien',
                        'Fantasia',
                        1954,
                        'HarperCollins',
                        '978-0261103252',
                        'https://harpercollins.com.br/cdn/shop/products/9786555114355.jpg?v=1691738135'
                        );

INSERT INTO tbl_livro(	titulo,
                        autor,
                        genero,
                        ano_publicacao,
                        editora,
                        isbn,
                        foto) values (
                        '1984',
                        'George Orwell',
                        'Distopia',
                        1949,
                        'Companhia das Letras',
                        '978-0451524935',
                        'https://m.media-amazon.com/images/I/61t0bwt1s3L._AC_UF1000,1000_QL80_.jpg'
                        );

INSERT INTO tbl_livro(	titulo,
                        autor,
                        genero,
                        ano_publicacao,
                        editora,
                        isbn,
                        foto) values (
                        'O Pequeno Príncipe',
                        'Antoine de Saint-Exupéry',
                        'Infantil',
                        1943,
                        'Agir',
                        '978-2210753998',
                        'https://m.media-amazon.com/images/I/71LJ4k-k9hL.jpg'
                        );

INSERT INTO tbl_livro(	titulo,
                        autor,
                        genero,
                        ano_publicacao,
                        editora,
                        isbn,
                        foto) values (
                        'A Revolução dos Bichos',
                        'George Orwell',
                        'Distopia',
                        1945,
                        'Companhia das Letras',
                        '978-0451526342',
                        'https://http2.mlstatic.com/D_NQ_NP_930629-MLU69038319566_042023-O.webp'
                        );

INSERT INTO tbl_livro(	titulo,
                        autor,
                        genero,
                        ano_publicacao,
                        editora,
                        isbn,
                        foto) values (
                        'Cem Anos de Solidão',
                        'Gabriel García Márquez',
                        'Realismo Mágico',
                        1967,
                        'Harper & Row',
                        '978-0060883287',
                        'https://m.media-amazon.com/images/I/816Yy5v+S5L._AC_UF1000,1000_QL80_.jpg'
                        );

INSERT INTO tbl_livro(	titulo,
                        autor,
                        genero,
                        ano_publicacao,
                        editora,
                        isbn,
                        foto) values (
                        'A Montanha Mágica',
                        'Thomas Mann',
                        'Romance/Clássico',
                        1924,
                        'Companhia das Letras',
                        '978-8535914968',
                        'https://images-americanas.b2w.io/produtos/129304937/imagens/livro-a-montanha-magica/129304937_1_xlarge.jpg'
                        );
