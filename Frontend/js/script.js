const cardContainer = document.getElementById('cardContainer');
let books = [];


// Carregar os livros do servidor
async function loadCards() {
    try {
        const response = await fetch('http://localhost:8080/api/livros/listarLivros');
        books = await response.json();
        renderCards();
    } catch (error) {
        showMessage('Erro ao carregar livros:', 'error');
    }
}


// Renderizar os livros gerais e por gênero
function renderCards() {
    cardContainer.innerHTML = '';
    renderGeneralBooks(); // Renderizar livros gerais
    renderBooksByGender(); // Renderizar livros agrupados por gênero
}

// Mostrar mensagens de sucesso ou erro
function showMessage(message, type = 'success') {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = message;
    messageContainer.className = `message ${type}`;
    messageContainer.style.display = 'block';

    setTimeout(() => {
        messageContainer.style.display = 'none';
    }, 3000);
}

async function addBook() {
    const title = document.getElementById('titleInput').value;
    const author = document.getElementById('authorInput').value;
    const gender = document.getElementById('genderInput').value;
    const yearOfPublication = document.getElementById('yearOfPublicationInput').value;
    const publisher = document.getElementById('publisherInput').value;
    const isbn = document.getElementById('isbnInput').value;
    const image = document.getElementById('imageInput').value;

    if (!title || !author || !isbn) {
        showMessage('Por favor, preencha os campos obrigatórios: Título, Autor e ISBN.', 'error');
        return;
    }

    if (title && author && gender && yearOfPublication && publisher && isbn && image) {
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
                showMessage('Livro adicionado com sucesso!');
            } else {
                showMessage('Erro ao cadastrar livro:', 'error');
            }
        } catch (error) {
            showMessage('Erro ao conectar ao servidor.', 'error');
        }
    }
}

// Editar um contato existente
async function editBook(book) {
    document.getElementById('titleInput').value = book.titulo;
    document.getElementById('authorInput').value = book.autor;
    document.getElementById('genderInput').value = book.genero;
    document.getElementById('yearOfPublicationInput').value = book.ano_publicacao;
    document.getElementById('publisherInput').value = book.editora;
    document.getElementById('isbnInput').value = book.isbn;
    document.getElementById('imageInput').value = book.foto;

    window.scrollTo(0, 0);

    // Substituir o botão de "Adicionar" por um de "Salvar"
    const addButton = document.querySelector('.form-section button');
    addButton.textContent = 'Salvar Alterações';
    addButton.onclick = () => saveEdit(book.id);
}

// Salvar as alterações de um contato
async function saveEdit(id) {
    const title = document.getElementById('titleInput').value;
    const author = document.getElementById('authorInput').value;
    const gender = document.getElementById('genderInput').value;
    const yearOfPublication = document.getElementById('yearOfPublicationInput').value;
    const publisher = document.getElementById('publisherInput').value;
    const isbn = document.getElementById('isbnInput').value;
    const image = document.getElementById('imageInput').value;

    if (!title || !author || !isbn) {
        showMessage('Por favor, preencha os campos obrigatórios: Título, Autor e ISBN.', 'error');
        return;
    }

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
            showMessage('Livro atualizado com sucesso!');
        } else {
            showMessage('Erro ao atualizar livro.', 'error');
        }
    } catch (error) {
        showMessage('Erro ao conectar ao servidor.', 'error');
    }
}

// Deletar um contato
async function deleteBook(id) {
    try {
        const response = await fetch(`http://localhost:8080/api/livros/deletarLivro/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            loadCards();
            showMessage('Livro deletado com sucesso!');
        } else {
            showMessage('Erro ao deletar livro.', 'error');
        }
    } catch (error) {
        showMessage('Erro ao conectar ao servidor.', 'error');
    }
}

// Limpar o formulário após adicionar ou editar um contato
function clearForm() {
    document.getElementById('titleInput').value = '';
    document.getElementById('authorInput').value = '';
    document.getElementById('genderInput').value = '';
    document.getElementById('yearOfPublicationInput').value = '';
    document.getElementById('publisherInput').value = '';
    document.getElementById('isbnInput').value = '';
    document.getElementById('imageInput').value = ''
}

function renderGeneralBooks() {
    const generalBooksSection = document.createElement('div');
    generalBooksSection.className = 'general-books-section';

    let visibleBooks = 0;
    const booksPerPage = 5;

    // Botões de "Ver Mais" e "Ver Menos"
    const seeMoreButton = document.createElement('button');
    seeMoreButton.textContent = 'Ver Mais';
    seeMoreButton.className = 'view-more-button';

    const seeLessButton = document.createElement('button');
    seeLessButton.textContent = 'Ver Menos';
    seeLessButton.className = 'view-less-button';
    seeLessButton.style.display = 'none'; // Inicialmente oculto

    // Criar linha para livros
    const row = document.createElement('div');
    row.className = 'card-row';

    function showBooks() {
        row.innerHTML = ''; // Limpar a linha antes de adicionar os livros

        // Exibir livros visíveis
        books.slice(0, visibleBooks + booksPerPage).forEach(book => {
            const card = createBookCard(book);
            row.appendChild(card);
        });

        // Atualizar visibilidade dos botões
        if (visibleBooks + booksPerPage >= books.length) {
            seeMoreButton.style.display = 'none'; // Esconder "Ver Mais"
            seeLessButton.style.display = 'block'; // Mostrar "Ver Menos"
        } else {
            seeMoreButton.style.display = 'block'; // Mostrar "Ver Mais"
            seeLessButton.style.display = 'block'; // Mostrar "Ver Menos"
        }
    }

    // Ações dos botões
    seeMoreButton.onclick = () => {
        visibleBooks += booksPerPage;
        showBooks();
    };

    seeLessButton.onclick = () => {
        visibleBooks = 0;
        showBooks();
        seeLessButton.style.display = 'none';
        seeMoreButton.style.display = 'block';
    };

    // Inicializa a visualização dos livros
    showBooks();

    // Adicionar livros e botões
    generalBooksSection.appendChild(row);
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'buttons-container';
    buttonsContainer.appendChild(seeMoreButton);
    buttonsContainer.appendChild(seeLessButton);

    generalBooksSection.appendChild(buttonsContainer);
    cardContainer.appendChild(generalBooksSection);
}

function renderBooksByGender() {
    const groupedBooks = groupBooksByGender(books);
    const sortedGenres = Object.keys(groupedBooks).sort();

    // Limpar conteúdo de livros por gênero
    const bookListContainer = document.getElementById('book-list');
    if (!bookListContainer) {
        showMessage('Elemento com id "book-list" não encontrado!', 'error');
        return;
    }
    bookListContainer.innerHTML = '';

    sortedGenres.forEach(gender => {
        const genderSection = document.createElement('div');
        genderSection.className = 'gender-section';

        const genderTitle = document.createElement('h3');
        genderTitle.textContent = `Gênero: ${gender}`;
        genderSection.appendChild(genderTitle);

        const row = document.createElement('div');
        row.className = 'card-row';

        groupedBooks[gender].forEach(book => {
            const card = createBookCard(book);
            row.appendChild(card);
        });

        genderSection.appendChild(row);
        bookListContainer.appendChild(genderSection);
    });
}

// Função para criar o card de cada livro
function createBookCard(book) {
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

    return card;
}

// Função para agrupar os livros por gênero
function groupBooksByGender(books) {
    return books.reduce((acc, book) => {
        const gender = book.genero || 'Sem Gênero';
        if (!acc[gender]) {
            acc[gender] = [];
        }
        acc[gender].push(book);
        return acc;
    }, {});
}

// Buscar um livro pelo título
function searchBook() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();

    if (!searchInput) {
        showMessage('Por favor, insira um título ou um gênero para buscar.', 'error');
        return;
    }

    const filteredBooks = books.filter(book => 
        book.titulo.toLowerCase().includes(searchInput) || book.genero.toLowerCase().includes(searchInput)
    );

    if (filteredBooks.length === 0) {
        showMessage('Nenhum livro encontrado.', 'error');
    } else {
        renderFilteredCards(filteredBooks);
    }
}


// Renderizar apenas os livros filtrados
function renderFilteredCards(filteredBooks) {
    cardContainer.innerHTML = '';

    const groupedBooks = groupBooksByGender(filteredBooks);
    const sortedGenres = Object.keys(groupedBooks).sort();

    sortedGenres.forEach(gender => {
        const genderSection = document.createElement('div');
        genderSection.className = 'gender-section';

        const genderTitle = document.createElement('h2');
        genderTitle.textContent = `Gênero: ${gender}`;
        genderSection.appendChild(genderTitle);

        let row = document.createElement('div');
        row.className = 'card-row';

        groupedBooks[gender].forEach((book, index) => {
            const card = createBookCard(book);
            row.appendChild(card);

            if ((index + 1) % 4 === 0 || index === groupedBooks[gender].length - 1) {
                genderSection.appendChild(row);
                row = document.createElement('div');
                row.className = 'card-row';
            }
        });

        cardContainer.appendChild(genderSection);
    });
}

// Inicializar os livros
loadCards();
