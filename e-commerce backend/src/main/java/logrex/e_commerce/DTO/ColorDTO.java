package logrex.e_commerce.DTO;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import logrex.e_commerce.entity.Product;
import lombok.*;

import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ColorDTO {
 private Long id;
    private String color;
    private Set<Product> products;



}
