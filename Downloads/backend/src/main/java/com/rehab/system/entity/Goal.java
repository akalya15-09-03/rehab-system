
package com.rehab.system.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter
public class Goal {
 @Id @GeneratedValue private Long id;
 private String description;
 private String status;
 @ManyToOne private User user;
}
