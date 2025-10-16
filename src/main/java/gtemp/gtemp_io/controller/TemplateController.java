package gtemp.gtemp_io.controller;

import gtemp.gtemp_io.entity.Template;
import gtemp.gtemp_io.service.TemplateService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/templates")
@CrossOrigin(origins = "http://localhost:5173") // Your React port
public class TemplateController {

    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @GetMapping
    public List<Template> getAllTemplates() {
        return templateService.getAllTemplates();
    }

    @GetMapping("/{id}")
    public Template getTemplateById(@PathVariable Long id) {
        return templateService.getTemplateById(id);
    }

    @GetMapping("/search")
    public List<Template> searchTemplates(@RequestParam String q) {
        return templateService.searchTemplates(q);
    }

    @GetMapping("/category/{category}")
    public List<Template> getTemplatesByCategory(@PathVariable String category) {
        return templateService.getTemplatesByCategory(category);
    }
}