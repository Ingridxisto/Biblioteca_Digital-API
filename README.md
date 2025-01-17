# Sistema de Gerenciamento de Biblioteca Digital  

#### Este é um sistema completo de gerenciamento de livros para uma biblioteca digital, desenvolvido utilizando Spring Boot em Java com conexão a banco de dados e frontend. Este projeto foi realizado para um estudo de caso acadêmico.  

## Funcionalidades  
O sistema possui um CRUD (Create, Read, Update, Delete) para gerenciar os livros na biblioteca digital. Através da interface, é possível adicionar, visualizar, editar e remover livros da base de dados.  

# Funcionalidades principais:
- Cadastrar livro: Permite o cadastro de novos livros com informações como título, autor, ano de publicação, e quantidade disponível.
- Visualizar livros: Lista todos os livros cadastrados na biblioteca.
- Atualizar livro: Possibilita a edição de dados de um livro já cadastrado.
- Remover livro: Remove um livro do sistema.  
  
# Tecnologias utilizadas:  
- Backend: Spring Boot (Java)
- Banco de Dados: MySQL ou H2 (conforme configuração)
- Frontend: HTML, CSS, JavaScript (com ou sem framework como Angular/React dependendo da implementação)
- API: RESTful API para comunicação entre o frontend e o backend  

# Requisitos
- Java 11 ou superior
- Spring Boot
- MySQL (ou H2 para testes locais)
- IDE de sua preferência (Ex: IntelliJ IDEA, Eclipse)
- Navegador de internet para visualizar o frontend  

# Como rodar o projeto
### 1. Clonar o repositório
Clone este repositório em sua máquina local:

| `git clone https://github.com/seu-usuario/biblioteca_digital-API.git` |
|-----------------------------------------------------------------|  
  
### 2. Configurar o banco de dados
Caso utilize MySQL, crie um banco de dados com o nome biblioteca_digital.  
Caso use H2, configure a aplicação para utilizar o banco em memória (já configurado por padrão no application.properties).  

| Criação do banco de dados:          |
|-------------------------------------|
| CREATE DATABASE db_biblioteca_digital; | 
|                                        |
| USE db_biblioteca_digital;             |
|                                        |
| CREATE TABLE tbl_livro (               |
|   id int primary key auto_increment,   |
|   titulo varchar(255) NOT NULL,        |
|   autor varchar(255) NOT NULL,         |
|   genero varchar(100),                 |
|   ano_publicacao year,                 |
|   editora varchar(255),                |
|   isbn varchar(20) unique,             |
|   foto varchar(255)                    |
| );                                     |

### 3. Configurar variáveis de ambiente (para MySQL)  
No arquivo *application.properties*, configure a conexão com o banco de dados:  

| Propriedades                                      |
|--------------------------------------------------|
| # Configurações do DataSource (MySQL)  |
| `spring.datasource.url=jdbc:mysql://localhost:3306/db_biblioteca_digital`  |
| `spring.datasource.username=seu_usuario`  |
| `spring.datasource.password=sua_senha`  |
| `spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver`  |  
|                                                                 |
| # Configuração do JPA  |
| `spring.jpa.hibernate.ddl-auto=update`  |
| `spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect`  |  
|                                                                    |
| # Configuração para mostrar as queries SQL  |
| `spring.jpa.show-sql=true`  |
| `spring.jpa.properties.hibernate.format_sql=true`  |
  

### 4. Build do projeto  
Utilize o Maven ou Gradle para rodar o build do projeto:  

| `mvn clean install` |
|-------------------|  

5. Rodar a aplicação
Para iniciar o servidor, basta rodar a aplicação Spring Boot:  

| `Run App.py` |
|-------------|

### Frontend  
Basta instalar a extensão `Live Server`, usei o VSCODE para o front.  
Ao instalar, irá ter o `Go Live` no canto direito da tela, só clicar e irá abrir a porta 5500.  

# Estrutura do Projeto  

Biblioteca_Digital-API/    
├── src/   
│      ├── main/   
│      │      ├── java/   
│      │      │      └── br/   
│      │      │          └── com/   
│      │      │              └── fecaf/   
│      │      │                  ├── controller/   
│      │      │                  │   └── LivroController   
│      │      │                  ├── database/   
│      │      │                  │   └── model.sql   
│      │      │                  ├── model/   
│      │      │                  │   └── Livro   
│      │      │                  ├── repository/   
│      │      │                  │   └── LivroRepository   
│      │      │                  ├── service/   
│      │      │                  │   └── LivroService   
│      │      │                  └── App   
│      │      └── resources/   
│      │          └── application.properties   
├── pom.xml   
└── README.md   
  

## Licença  
Este projeto está sob a licença MIT.
