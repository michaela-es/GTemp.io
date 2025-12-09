import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

class TemplateService {
  getUserTemplates(userId) {
    return axios.get(`${API_BASE_URL}/templates/user/${userId}/my-templates`);
  }

  getTemplateFiles(templateId) {
    return axios.get(`templates/${templateId}/files`);
  }
}

export default new TemplateService();