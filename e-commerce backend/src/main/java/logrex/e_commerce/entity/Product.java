package logrex.e_commerce.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "product")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false,name = "name")
    private String name;
    @Column(nullable = false,name = "price")
    private int price;

    @Column(nullable = false,name = "image")
    private String image;

    @Column(nullable = false,name = "company")
    private String company;
    @Lob
    @Column(nullable = false, name = "description",length = 3000)
    private String description;
    @Column(nullable = false,name = "category")
    private String category;
    private boolean shipping;

    @ManyToMany
    @JoinTable(
            name = "product_color",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "color_id")
    )
    private Set<Color> colors;


}
