package ru.carmkdsystems.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import ru.carmkdsystems.models.ModelCar;

import java.util.Set;

public interface ModelCarRepos extends CrudRepository<ModelCar, Long> {
    ModelCar findByModelAndFirm(String model, String firm);
    Set<ModelCar> findByFirm(String firm);
    @Transactional
    void deleteByFirm(String firm);
}
