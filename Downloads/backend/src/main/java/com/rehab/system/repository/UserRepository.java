
package com.rehab.system.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.rehab.system.entity.User;
public interface UserRepository extends JpaRepository<User,Long>{}
