package ru.carmkdsystems.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.carmkdsystems.models.Params;

import java.util.List;

public interface ParamsRepos extends CrudRepository<Params, Long> {
    Params findByName(String name);
    List<Params> findAll();
}
