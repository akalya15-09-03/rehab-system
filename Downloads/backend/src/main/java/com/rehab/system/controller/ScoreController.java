
package com.rehab.system.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.rehab.system.repository.ScoreRepository;
import com.rehab.system.entity.Score;

@RestController @RequestMapping("/api/score") @CrossOrigin
public class ScoreController {
 @Autowired private ScoreRepository repo;

 @PostMapping public Score save(@RequestBody Score s){ return repo.save(s); }
}
