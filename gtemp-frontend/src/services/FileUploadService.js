import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

class FileUploadService {
  uploadTemplate(formData) {
    return axios.post(`${API_BASE_URL}/templates`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
}

export default new FileUploadService();