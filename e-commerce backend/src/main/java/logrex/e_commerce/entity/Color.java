package logrex.e_commerce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "colors")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter

@ToString
public class Color {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column(name = "color")
    private String color;

    @ManyToMany(mappedBy = "colors")
@JsonIgnore
    private Set<Product> products;



}
