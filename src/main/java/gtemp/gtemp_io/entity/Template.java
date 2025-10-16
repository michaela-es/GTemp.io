package gtemp.gtemp_io.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "templates")
@Data
public class Template {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long templateID;

    @Column(nullable = false)
    private String templateName;

    @Column(length = 1000)
    private String templateDesc;

    private String templateImg;

    private Double templateRating;

    private LocalDate releaseDate;

    private String category;

    private String templateOwner;

    private String genre;
}