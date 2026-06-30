
package com.rehab.system.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import com.rehab.system.entity.User;
import com.rehab.system.repository.UserRepository;

@RestController @RequestMapping("/api/users") @CrossOrigin
public class UserController {
 @Autowired private UserRepository repo;

 @GetMapping public List<User> getAll(){ return repo.findAll(); }
 @PostMapping public User save(@RequestBody User u){ return repo.save(u); }
}
