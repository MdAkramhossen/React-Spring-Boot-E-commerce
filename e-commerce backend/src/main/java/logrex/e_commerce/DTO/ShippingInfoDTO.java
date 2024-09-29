package logrex.e_commerce.DTO;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ShippingInfoDTO {
    private String firstName;
    private String address;
    private String email;
    private String phoneNumber;
}
