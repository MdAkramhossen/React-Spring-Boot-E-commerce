package logrex.e_commerce.DTO;

import jakarta.persistence.*;
import logrex.e_commerce.entity.Color;
import lombok.*;

import java.util.Set;
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class ProductDTO {

    private Long id;
private String name;

    private int price;
    private String image;
    private String company;
    private String description;
    private String category;
    private boolean shipping;
    private Set<Color> colors;

}
