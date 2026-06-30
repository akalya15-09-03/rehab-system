
package com.rehab.system.entity;
import jakarta.persistence.*;
import lombok.*;

@Entity @Getter @Setter
public class Score {
 @Id @GeneratedValue private Long id;
 private int discipline;
 private int participation;
 private int taskCompletion;
 private int attitude;
 @ManyToOne private User user;
 public int getTotal(){ return discipline+participation+taskCompletion+attitude; }
}
