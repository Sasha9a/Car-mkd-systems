package ru.carmkdsystems.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;
import ru.carmkdsystems.models.FirmCar;
import ru.carmkdsystems.models.ModelCar;

public interface ModelCarRepos extends CrudRepository<ModelCar, Long> {
    ModelCar findByModelAndFirmCar(String model, FirmCar id);

    @Transactional
    void deleteByFirmCar(FirmCar id);
}
