package logrex.e_commerce.DTO;

import logrex.e_commerce.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private List<ProductDTO> productList;
    private int pageNo;
    private int pageSize;
    private  Long totalProducts;
    private int totalPages;
    private BigDecimal maxPrice;
    private boolean hasMore;



}
