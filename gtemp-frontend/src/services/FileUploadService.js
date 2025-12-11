import api from './api'; 
class FileUploadService {
  uploadTemplate(formData) {
    return api.post('/templates', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  updateTemplate(templateId, formData) {
    return api.put(`/templates/${templateId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default new FileUploadService();
