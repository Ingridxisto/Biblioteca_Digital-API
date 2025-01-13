package br.com.fecaf.services;


import br.com.fecaf.model.Livro;
import br.com.fecaf.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    // Metodo para listar Livros
    public List<Livro> listarLivros() {
        return livroRepository.findAll();
    }

    public Livro salvarLivro(Livro livro) {
        return livroRepository.save(livro);
    }

    public Livro atualizarLivro(Integer id, Livro livro) {
        Optional<Livro> livroExistente = livroRepository.findById(id);

        if (livroExistente.isPresent()) {
            Livro livroAtualizado = livroExistente.get();
            livroAtualizado.setTitulo(livro.getTitulo());
            livroAtualizado.setAutor(livro.getAutor());
            livroAtualizado.setGenero(livro.getGenero());
            livroAtualizado.setAno_publicacao(livro.getAno_publicacao());
            livroAtualizado.setEditora(livro.getEditora());
            livroAtualizado.setIsbn(livro.getIsbn());
            livroAtualizado.setFoto(livro.getFoto());
            return livroRepository.save(livroAtualizado);
        } else {
            return null;
        }
    }

    public void deletarLivro(int id) {
        livroRepository.deleteById(id);
    }
}
