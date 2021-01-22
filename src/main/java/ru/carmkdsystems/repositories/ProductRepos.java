package ru.carmkdsystems.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.carmkdsystems.models.Product;

public interface ProductRepos extends CrudRepository<Product, Long> {

}
