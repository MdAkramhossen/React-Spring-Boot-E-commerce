package logrex.e_commerce.service;

import logrex.e_commerce.DTO.JwtAuthResponse;
import logrex.e_commerce.DTO.LoginDto;
import logrex.e_commerce.DTO.RegisterDto;

public interface AuthService {

    String register(RegisterDto registerDto);

    JwtAuthResponse login(LoginDto loginDto);
}
