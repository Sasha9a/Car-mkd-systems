package ru.carmkdsystems.repositories;

import org.springframework.data.repository.CrudRepository;
import ru.carmkdsystems.models.FirmCar;

public interface FirmCarRepos extends CrudRepository<FirmCar, Long> {
}
