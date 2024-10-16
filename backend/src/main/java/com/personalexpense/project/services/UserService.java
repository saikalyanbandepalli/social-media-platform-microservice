package com.personalexpense.project.services;



import com.personalexpense.project.model.User;
import com.personalexpense.project.repositories.ExpenseRepository;
import com.personalexpense.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ExpenseRepository       expenseRepository;

    public User registerUser(User user) {
        // Perform validation and encryption (if necessary)
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User authenticateUser(String username, String password) {

        User user = userRepository.findByUsername(username);
        if(user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        if(user.getUsername() == username && user.getPassword() == password) {
            return user;
        }


        return null;
    }


}

