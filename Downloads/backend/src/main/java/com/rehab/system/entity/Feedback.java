
package com.rehab.system.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter
public class Feedback {
 @Id @GeneratedValue private Long id;
 private String comment;
 @ManyToOne private User user;
}
