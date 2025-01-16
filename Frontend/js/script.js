const cardContainer = document.getElementById('cardContainer');

let books = [];

// Carregar os livros do servidor
async function loadCards() {
    try {
        const response = await fetch('http://localhost:8080/api/livros/listarLivros');
        books = await response.json();
        renderCards();
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

// Renderizar os livros na tela
function renderCards() {
    cardContainer.innerHTML = '';
    books.forEach((book) => {
        console.log(book);

        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = book.foto || 'https://via.placeholder.com/150';
        card.appendChild(image);

        const title = document.createElement('h3');
        title.textContent = book.titulo;
        card.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Autor: ${book.autor}`;
        card.appendChild(author);

        const gender = document.createElement('p');
        gender.textContent = `Gênero: ${book.genero}`;
        card.appendChild(gender);

        const yearOfPublication = document.createElement('p');
        yearOfPublication.textContent = `Ano de Publicação: ${book.ano_publicacao}`;
        card.appendChild(yearOfPublication);

        const publisher = document.createElement('p');
        publisher.textContent = `Editora: ${book.editora}`;
        card.appendChild(publisher);

        const isbn = document.createElement('p');
        isbn.textContent = `ISBN: ${book.isbn}`;
        card.appendChild(isbn);
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editBook(book);
        card.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.onclick = () => deleteBook(book.id);
        card.appendChild(deleteButton);

        cardContainer.appendChild(card);
    });
}

// Adicionar um novo livro
async function addBook() {
    const title = document.getElementById('titleInput').value;
    const author = document.getElementById('authorInput').value;
    const gender = document.getElementById('genderInput').value;
    const yearOfPublication = document.getElementById('yearOfPublicationInput').value;
    const publisher = document.getElementById('publisherInput').value;
    const isbn = document.getElementById('isbnInput').value;
    const image = document.getElementById('imageInput').value;

    if (isbn && title && author) {
        const newBook = {
            titulo: title,
            autor: author,
            genero: gender,
            ano_publicacao: yearOfPublication,
            editora: publisher,
            isbn: isbn,
            foto: image
        };

        try {
            const response = await fetch('http://localhost:8080/api/livros/cadastrarLivro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (response.ok) {
                loadCards();
                clearForm();
            } else {
                console.error('Erro ao cadastrar livro:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao cadastrar livro:', error);
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Editar um livro existente
async function editBook(book) {
    document.getElementById('titleInput').value = book.titulo;
    document.getElementById('authorInput').value = book.autor;
    document.getElementById('genderInput').value = book.genero;
    document.getElementById('yearOfPublicationInput').value = book.ano_publicacao;
    document.getElementById('publisherInput').value = book.editora;
    document.getElementById('isbnInput').value = book.isbn;
    document.getElementById('imageInput').value = book.foto;

    // Substituir o botão de "Adicionar" por um de "Salvar"
    const addButton = document.querySelector('.form-section button');
    addButton.textContent = 'Salvar Alterações';
    addButton.onclick = () => saveEdit(book.id);
}

// Salvar as alterações de um livro
async function saveEdit(id) {
    const title = document.getElementById('titleInput').value;
    const author = document.getElementById('authorInput').value;
    const gender = document.getElementById('genderInput').value;
    const yearOfPublication = document.getElementById('yearOfPublicationInput').value;
    const publisher = document.getElementById('publisherInput').value;
    const isbn = document.getElementById('isbnInput').value;
    const image = document.getElementById('imageInput').value;

    const updatedBook = {
        titulo: title,
        autor: author,
        genero: gender,
        ano_publicacao: yearOfPublication,
        editora: publisher,
        isbn: isbn,
        foto: image
    };

    try {
        const response = await fetch(`http://localhost:8080/api/livros/atualizarLivro/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        });

        if (response.ok) {
            loadCards();
            clearForm();
            const addButton = document.querySelector('.form-section button');
            addButton.textContent = 'Adicionar Livro';
            addButton.onclick = addBook;
        } else {
            console.error('Erro ao editar livro:', await response.text());
        }
    } catch (error) {
        console.error('Erro ao editar livro:', error);
    }
}

// Deletar um livro
async function deleteBook(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/livros/deletarLivro/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            loadCards();
        } else {
            console.error('Erro ao deletar livro:', await response.text());
        }
    } catch (error) {
        console.error('Erro ao deletar livro:', error);
    }
}

// Limpar o formulário após adicionar ou editar um livro
function clearForm() {
    document.getElementById('titleInput').value = '';
    document.getElementById('authorInput').value = '';
    document.getElementById('genderInput').value = '';
    document.getElementById('yearOfPublicationInput').value = '';
    document.getElementById('publisherInput').value = '';
    document.getElementById('isbnInput').value = '';
    document.getElementById('imageInput').value = '';
}

// Buscar um livro pelo título
function searchBook() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    if (!searchInput) {
        alert('Por favor, insira um título para buscar.');
        return;
    }

    const filteredBooks = books.filter(book => 
        book.titulo.toLowerCase().includes(searchInput)
    );

    if (filteredBooks.length === 0) {
        alert('Nenhum livro encontrado com este título.');
    } else {
        renderFilteredCards(filteredBooks);
    }
}

// Renderizar apenas os livros filtrados
function renderFilteredCards(filteredBooks) {
    cardContainer.innerHTML = ''; // Limpa os cards existentes
    filteredBooks.forEach((book) => {
        const card = document.createElement('div');
        card.className = 'card';

        const image = document.createElement('img');
        image.src = book.foto || 'https://via.placeholder.com/150';
        card.appendChild(image);

        const title = document.createElement('h3');
        title.textContent = book.titulo;
        card.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Autor: ${book.autor}`;
        card.appendChild(author);

        const gender = document.createElement('p');
        gender.textContent = `Gênero: ${book.genero}`;
        card.appendChild(gender);

        const yearOfPublication = document.createElement('p');
        yearOfPublication.textContent = `Ano de Publicação: ${book.ano_publicacao}`;
        card.appendChild(yearOfPublication);

        const publisher = document.createElement('p');
        publisher.textContent = `Editora: ${book.editora}`;
        card.appendChild(publisher);

        const isbn = document.createElement('p');
        isbn.textContent = `ISBN: ${book.isbn}`;
        card.appendChild(isbn);

        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editBook(book);
        card.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Deletar';
        deleteButton.onclick = () => deleteBook(book.id);
        card.appendChild(deleteButton);

        cardContainer.appendChild(card);
    });
}

// Inicializar com os cards carregados
loadCards();
