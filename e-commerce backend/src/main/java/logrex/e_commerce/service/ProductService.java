package logrex.e_commerce.service;

import logrex.e_commerce.DTO.ProductDTO;
import logrex.e_commerce.DTO.ProductResponse;
import logrex.e_commerce.entity.Product;

import java.math.BigDecimal;
import java.util.List;


public interface ProductService {
    ProductDTO uploadProduct(ProductDTO productDTO);

    List<ProductDTO> saveAllProducct(List<ProductDTO> productDTO);

    ProductResponse getAllProducts(int pageNo, int pageSize, String sortBy, String sortDir, String company, String category, BigDecimal minPrice, BigDecimal maxPrice, boolean shipping);

    List<String> getAllUniqueCompanies();

    List<String> getAllUniqueCategories();


    ProductDTO getById(Long id);


    List<ProductDTO> searchProductsByName(String name);

    ProductDTO createProduct(ProductDTO productDTO);
}
