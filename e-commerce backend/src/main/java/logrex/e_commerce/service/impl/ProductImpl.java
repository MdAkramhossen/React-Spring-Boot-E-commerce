package logrex.e_commerce.service.impl;

import jakarta.transaction.Transactional;
import logrex.e_commerce.DTO.ProductDTO;
import logrex.e_commerce.DTO.ProductResponse;
import logrex.e_commerce.entity.Color;
import logrex.e_commerce.entity.Product;
import logrex.e_commerce.exception.NotFoundException;
import logrex.e_commerce.jpa.ColorRepo;
import logrex.e_commerce.jpa.ProductRepo;
import logrex.e_commerce.service.ProductService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.math.BigDecimal;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductImpl implements ProductService {

    @Autowired
     private ProductRepo productRepo;

    @Autowired
    private ColorRepo colorRepo;



    @Autowired
    private ModelMapper modelMapper ;

    @Override
    @Transactional
    public ProductDTO uploadProduct(ProductDTO productDTO) {

     Product product = modelMapper.map(productDTO, Product.class);

       Set<Color> color= product.getColors();
       if(color != null){
           colorRepo.saveAll(color);
       }
        productRepo.save(product);

        return modelMapper.map(product, ProductDTO.class) ;

    }

    @Override
    @Transactional
    public List<ProductDTO> saveAllProducct(List<ProductDTO> productDTO) {
        List<Product> products = productDTO.stream()
                .map(dto -> modelMapper.map(dto, Product.class))
                .collect(Collectors.toList());

 for (Product product : products) {
     Set<Color> color= product.getColors();

     if(color != null){
         colorRepo.saveAll(color);
     }
             productRepo.save(product);
 }

 //productRepo.saveAll(products);
        return List.of();
    }

    @Override
    public ProductResponse getAllProducts(int pageNo, int pageSize, String sortBy, String sortDir, String company, String category, BigDecimal minPrice, BigDecimal maxPrice, boolean shipping) {

        // Find max price if not provided
        if (maxPrice == null) {
            maxPrice = productRepo.findMaxPrice();
        }

        // Sorting and pagination setup
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortBy).ascending() :
                Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<Product> products;

        // Filter based on company, category, price range, and shipping
        if (company != null && !company.isEmpty() && category != null && !category.isEmpty()) {
            products = shipping ?
                    productRepo.findByCompanyAndCategoryAndPriceBetweenAndShipping(company, category, minPrice, maxPrice, true, pageable) :
                    productRepo.findByCompanyAndCategoryAndPriceBetween(company, category, minPrice, maxPrice, pageable);
        } else if (company != null && !company.isEmpty()) {
            products = shipping ?
                    productRepo.findByCompanyAndPriceBetweenAndShipping(company, minPrice, maxPrice, true, pageable) :
                    productRepo.findByCompanyAndPriceBetween(company, minPrice, maxPrice, pageable);
        } else if (category != null && !category.isEmpty()) {
            products = shipping ?
                    productRepo.findByCategoryAndPriceBetweenAndShipping(category, minPrice, maxPrice, true, pageable) :
                    productRepo.findByCategory(category, pageable);
        } else {
            products = shipping ?
                    productRepo.findByPriceBetweenAndShipping(minPrice, maxPrice, true, pageable) :
                    productRepo.findByPriceBetween(minPrice, maxPrice, pageable);
        }

        // Mapping and preparing response
        List<Product> allProducts = products.getContent();
        List<ProductDTO> productDTOs = allProducts.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());

        ProductResponse productResponse = new ProductResponse();
        productResponse.setProductList(productDTOs);
        productResponse.setPageNo(products.getNumber());
        productResponse.setPageSize(products.getSize());
        productResponse.setTotalProducts(products.getTotalElements());
        productResponse.setTotalPages(products.getTotalPages());
        productResponse.setMaxPrice(maxPrice);
        productResponse.setHasMore(products.isLast());

        return productResponse;
    }


    @Override
    @Transactional
    public List<String> getAllUniqueCompanies() {
        List<String> companies = productRepo.findAllUniqueCompanies();
        return companies;
    }

    @Override
    @Transactional
    public List<String> getAllUniqueCategories() {
        List<String> categories = productRepo.findAllUniqueCategories();
        return categories;
    }

    @Override
    public ProductDTO getById(Long id) {
        Product product= productRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Product not found with id: " + id));

        return modelMapper.map(product, ProductDTO.class);
    }

    @Override
    public List<ProductDTO> searchProductsByName(String name) {
        List <Product> products= productRepo.findByNameContainingIgnoreCase(name);
        return products.stream().map(product -> modelMapper.map(product, ProductDTO.class)).collect(Collectors.toList());
    }

    @Override
    public ProductDTO createProduct(ProductDTO productDTO) {

        Set<Color> color= productDTO.getColors();
        if(color != null){
            colorRepo.saveAll(color);
        }
        Product product = modelMapper.map(productDTO, Product.class);
        productRepo.save(product);

        return modelMapper.map(product, ProductDTO.class);
    }


}
