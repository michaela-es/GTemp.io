package gtemp.gtemp_io.repository;

import gtemp.gtemp_io.entity.Template;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {

    @Query("SELECT t FROM Template t WHERE " +
            "LOWER(t.templateName) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(t.templateDesc) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
            "LOWER(t.category) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Template> searchTemplates(@Param("query") String query);

    List<Template> findByCategory(String category);
    List<Template> findByTemplateOwner(String owner);
}