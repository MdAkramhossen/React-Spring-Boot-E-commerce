package logrex.e_commerce.service;

import logrex.e_commerce.DTO.OrderRequest;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface OrderService {
    void createOrder(logrex.e_commerce.entity.OrderRequest orderRequest, Authentication authentication);

    List<OrderRequest> getAllOrder(Authentication authentication);
}
