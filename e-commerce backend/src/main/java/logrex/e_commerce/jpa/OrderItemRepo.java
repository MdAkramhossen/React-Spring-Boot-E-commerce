package logrex.e_commerce.jpa;

import logrex.e_commerce.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {}

