package logrex.e_commerce.controller;

import logrex.e_commerce.DTO.OrderRequest;
import logrex.e_commerce.DTO.ProductDTO;
import logrex.e_commerce.DTO.ProductResponse;

import logrex.e_commerce.service.FileService;
import logrex.e_commerce.service.OrderService;
import logrex.e_commerce.service.ProductService;
import logrex.e_commerce.utils.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api")
public class RestProduct {


    @Autowired
    private ProductService productService;
    @Autowired
    private FileService fileService;
    @Value("${project.image}")
    private String path;

    @Value("${image.upload.dir}")
    private String uploadDir;

    @Autowired
    private OrderService orderService;



    /// this section for dev testing here i have post in database lot many product
   @PreAuthorize("hasRole('ADIMIN')")
    @PostMapping("/save")
    public ResponseEntity<ProductDTO> saveProduct(@RequestBody ProductDTO productDTO){
        productDTO.setId(0L);

        ProductDTO  saveProduct= productService.uploadProduct(productDTO);
        return new ResponseEntity<>(saveProduct, HttpStatus.CREATED);
    }
 /// this section for dev testing here i have post in database lot many product
 @PreAuthorize("hasRole('ADIMIN')")
    @PostMapping("/saveAll")
    public ResponseEntity<String> saveAllProducct(@RequestBody List<ProductDTO> productDTO){

        List<ProductDTO>  saveProduct= productService.saveAllProducct(productDTO);
        return new ResponseEntity<>("Sucessfully saved all products!", HttpStatus.CREATED);
    }

    @PreAuthorize("hasRole('ADIMIN')")
  @PostMapping("/create")
  public String createProduct(
          @RequestPart MultipartFile image,
          @RequestPart("productDTO") ProductDTO productDTO
  ) throws IOException {

      String imageUrl = saveImage(image);
      System.out.println(imageUrl);
      productDTO.setImage(imageUrl);
      productService.uploadProduct(productDTO);
      return "uploaded";
  }
    private String saveImage(MultipartFile image) {
        try {
            // Define the file path
            String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
            Path path = Paths.get("src/main/resources/static/images", fileName);
            Files.copy(image.getInputStream(), path);

            // Step 3: Generate the image URL
            return "/images/" + fileName; // URL path for accessing the image
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to save image");
        }
    }


    /// getAll products
    @GetMapping("/getproduct")
    public ResponseEntity<ProductResponse> getProduct(
            @RequestParam (value = "pageNo" ,defaultValue = AppConstants.DEAFULT_PAGE_NUMBER, required = false) int pageNo,
            @RequestParam (value = "pageSize" ,defaultValue = AppConstants.DEAFULT_PAGE_SIZE, required = false) int pageSize,
            @RequestParam(value = "sortBy",defaultValue =AppConstants.DEAFULT_SORT_BY,required = false) String sortBy ,
            @RequestParam (value = "sortDir",defaultValue = AppConstants.DEAFULT_SORT_DIRECTION,required = false)String sortDir,
            @RequestParam(value = "company", required = false) String company,
            @RequestParam (value = "category", required = false) String category,
            @RequestParam (value = "minPrice",defaultValue = "1" ,required = false) BigDecimal minPrice,
            @RequestParam (value = "maxPrice",required = false) BigDecimal maxPrice,
            @RequestParam(value = "shipping" ,required = false) boolean shipping) {



        ProductResponse getAll= productService.getAllProducts(pageNo,pageSize,sortBy,sortDir,company,category,minPrice,maxPrice,shipping );
        return new ResponseEntity<>(getAll, HttpStatus.OK);
    }



    @GetMapping("/filters")
    public  ResponseEntity<Map<String,List<String>>> getFilters(){

        List<String> companies= productService.getAllUniqueCompanies();
        List <String> category=productService.getAllUniqueCategories();

        Map<String,List<String>> filters= new HashMap<>();
        filters.put("companies",companies);
        filters.put("categories",category);


        return new ResponseEntity<>(filters, HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<ProductDTO> getById(@PathVariable Long id){

        ProductDTO productDTO= productService.getById(id);
         return  new ResponseEntity<>(productDTO, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam String name) {
        List<ProductDTO> products = productService.searchProductsByName(name);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADIMIN','USER')")
    @PostMapping("/order")
    public ResponseEntity<String> placeOrder(@RequestBody logrex.e_commerce.entity.OrderRequest orderRequest, Authentication authentication) {
        System.out.println(orderRequest.getCartItems().toString());



        orderService.createOrder(orderRequest,authentication);


        return ResponseEntity.ok("Order placed successfully");
    }

    @PreAuthorize("hasAnyRole('ADIMIN','USER')")
    @GetMapping("/order")
    public ResponseEntity<List<OrderRequest>> getAllOrder(Authentication authentication) {

       List<OrderRequest> orders= orderService.getAllOrder(authentication);
       return new ResponseEntity<>(orders,HttpStatus.OK);

    }

}

