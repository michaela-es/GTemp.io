package gtemp.gtemp_io.service;

import gtemp.gtemp_io.entity.Template;
import gtemp.gtemp_io.repository.TemplateRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class TemplateService {

    private final TemplateRepository templateRepository;

    public TemplateService(TemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    public List<Template> getAllTemplates() {
        return templateRepository.findAll();
    }

    public Template getTemplateById(Long id) {
        return templateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Template not found"));
    }

    public List<Template> searchTemplates(String query) {
        return templateRepository.searchTemplates(query);
    }

    public List<Template> getTemplatesByCategory(String category) {
        return templateRepository.findByCategory(category);
    }
}