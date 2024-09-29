package logrex.e_commerce.jpa;

import logrex.e_commerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product, Long> {
    Page<Product> findByCompanyAndCategory(String company, String category, Pageable pageable);
    Page<Product> findByCompany(String company, Pageable pageable);
    Page<Product> findByCategory(String category, Pageable pageable);

    @Query("SELECT DISTINCT p.company FROM Product p")
    List<String> findAllUniqueCompanies();

    @Query("SELECT DISTINCT p.category FROM Product p")
    List<String> findAllUniqueCategories();

    @Query("SELECT MAX(p.price) FROM Product p")
    BigDecimal findMaxPrice();

    Page<Product> findByCompanyAndCategoryAndPriceBetweenAndShipping(String company, String category, BigDecimal minPrice, BigDecimal maxPrice, boolean shipping, Pageable pageable);

    Page<Product> findByCompanyAndPriceBetweenAndShipping(String company, BigDecimal minPrice, BigDecimal maxPrice, boolean shipping, Pageable pageable);

    Page<Product> findByCategoryAndPriceBetweenAndShipping(String category, BigDecimal minPrice, BigDecimal maxPrice, boolean shipping, Pageable pageable);

    Page<Product> findByPriceBetweenAndShipping(BigDecimal minPrice, BigDecimal maxPrice, boolean shipping, Pageable pageable);

    Page<Product> findByCompanyAndCategoryAndPriceBetween(String company, String category, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);

    Page<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);

    Page<Product> findByCompanyAndPriceBetween(String company, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);

    Optional<Product> findById(Integer id); // Changed to Optional
    List<Product> findByNameContainingIgnoreCase(String name);
}
