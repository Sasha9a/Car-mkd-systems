package ru.carmkdsystems.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import ru.carmkdsystems.models.Product;

public interface ProductRepos extends CrudRepository<Product, Long> {

    @Query(value = "SELECT * FROM product ORDER BY id DESC", nativeQuery = true)
    Page<Product> findAllDesc(Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE is_public = true ORDER BY id DESC", nativeQuery = true)
    Page<Product> findAllByIsProduct(Pageable pageable);
}
