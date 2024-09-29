package logrex.e_commerce.DTO;

import jakarta.persistence.Embeddable;
import lombok.*;


@Embeddable
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class CartProductDTO {

    ///this id is product ID
    private Long id;
    private String name;
    private String color;
    private String image;
    private int amount;
    private double price;
}