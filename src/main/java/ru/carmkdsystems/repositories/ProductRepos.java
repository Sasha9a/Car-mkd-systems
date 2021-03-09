package ru.carmkdsystems.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import ru.carmkdsystems.models.Product;

public interface ProductRepos extends CrudRepository<Product, Long> {

    @Query(value = "SELECT * FROM product ORDER BY id DESC", nativeQuery = true)
    Page<Product> findAllDesc(Pageable pageable);

    @Query(value = "SELECT * FROM product WHERE is_public = true ORDER BY id DESC", nativeQuery = true)
    Page<Product> findAllByIsProduct(Pageable pageable);

    @Query("SELECT DISTINCT p FROM Product p INNER JOIN p.modelsCars mc INNER JOIN mc.firmCar fc WHERE fc.firm = ?1 ORDER BY p.id DESC")
    Page<Product> findAllByFirm(String firm, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Product p INNER JOIN p.modelsCars mc INNER JOIN mc.firmCar fc WHERE fc.firm = ?1 AND p.isPublic = true ORDER BY p.id DESC")
    Page<Product> findAllByFirmIsProduct(String firm, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Product p INNER JOIN p.modelsCars mc INNER JOIN mc.firmCar fc WHERE fc.firm = ?1 AND mc.model = ?2 ORDER BY p.id DESC")
    Page<Product> findAllByFirmAndModel(String firm, String model, Pageable pageable);

    @Query("SELECT DISTINCT p FROM Product p INNER JOIN p.modelsCars mc INNER JOIN mc.firmCar fc WHERE fc.firm = ?1 AND mc.model = ?2 AND p.isPublic = true ORDER BY p.id DESC")
    Page<Product> findAllByFirmAndModelIsProduct(String firm, String model, Pageable pageable);
}
