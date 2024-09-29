package logrex.e_commerce.entity;

import logrex.e_commerce.DTO.CartProductDTO;
import logrex.e_commerce.DTO.ShippingInfoDTO;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class OrderRequest {
    private List<CartProductDTO> cartItems;
    private int totalItem;
    private double totalAmount;
    private LocalDate orderDate;
    private ShippingInfoDTO shippingInfo;

}
