package logrex.e_commerce.service.impl;


import logrex.e_commerce.DTO.OrderRequest;
import logrex.e_commerce.entity.*;
import logrex.e_commerce.exception.NotFoundException;
import logrex.e_commerce.jpa.OrderItemRepo;
import logrex.e_commerce.jpa.OrderRepo;
import logrex.e_commerce.jpa.ProductRepo;
import logrex.e_commerce.jpa.UserRepository;
import logrex.e_commerce.service.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderItemRepo orderItemRepo;
    @Autowired
    private OrderRepo orderRepo;
    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private ModelMapper modelMapper;
    @Override
    public void createOrder(logrex.e_commerce.entity.OrderRequest orderRequest, Authentication authentication) {



        Order order = new Order();
        order.setShippingInfo(orderRequest.getShippingInfo());
        order.setOrderDate( LocalDate.now() );
       order.setTotalAmount(orderRequest.getTotalAmount());
       order.setTotalItem(orderRequest.getTotalItem());

        List<OrderItem> orderItems = orderRequest.getCartItems().stream().map(cartItemDTO->{

            OrderItem orderItem = new OrderItem();
            Product product =productRepo.findById(cartItemDTO.getId()).orElseThrow(()-> new NotFoundException(""));
            orderItem.setProduct(product);
            orderItem.setAmount(cartItemDTO.getAmount());
            orderItem.setColor(cartItemDTO.getColor());
            orderItem.setImage(orderItem.getImage());
            orderItem.setPrice(BigDecimal.valueOf(cartItemDTO.getPrice()));

            orderItem.setOrder(order);
            return  orderItem;


        }).collect(Collectors.toList());
        String userEmail = authentication.getName();

        Optional<User> user = userRepo.findByEmail(userEmail);

         order.setUser(user.get());
         order.setOrderItems(orderItems);
        orderRepo.save(order);
    }

    @Override
    public List<OrderRequest> getAllOrder(Authentication authentication) {
      String userEmail = authentication.getName();
        User user = userRepo.findByEmail(userEmail).orElseThrow(()->new NotFoundException("User Not Found"));



        List<Order> orders = orderRepo.findByUserId(user.getId());

        List<OrderRequest> orderRequest = orders.stream().map(order->{


            OrderRequest orderRequest1=new OrderRequest();
           orderRequest1.setQuantity(order.getTotalItem());
           orderRequest1.setOrderDate(order.getOrderDate());
           orderRequest1.setTotalPrice(BigDecimal.valueOf(order.getTotalAmount()));
           orderRequest1.setUserName(order.getShippingInfo().getFirstName());
            return  orderRequest1;

        }).collect(Collectors.toList());



       return orderRequest;
    }
}
