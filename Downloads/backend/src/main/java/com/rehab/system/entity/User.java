
package com.rehab.system.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter
public class User {
 @Id @GeneratedValue private Long id;
 private String name;
 private String email;
 private String password;
 private String role;
}
