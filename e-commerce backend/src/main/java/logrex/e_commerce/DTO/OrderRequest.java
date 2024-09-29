package logrex.e_commerce.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

       private LocalDate orderDate;
     //  private String orderStatus;
       private String userName;

    private int quantity;
    private BigDecimal totalPrice;
}
