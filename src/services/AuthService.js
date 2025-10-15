import ApiService from './ApiService';
// import ToastService from '../services/ToastService';

class AuthService {

  constructor(router) {
    this.router = router; // Store the router instance
  }

  async login(email, password) {
    try {
      const response = await ApiService.request({
        method: 'POST',
        url: 'system-users/auth/login',
        data: { email, password },
      });

      return response.data;
    } catch (error) {
      // Handle the error, you might want to show a toast notification or similar
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('admin');
    localStorage.removeItem('permissions');
    window.location.href = '/legal-platform-portal/login';
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('admin'));
  }
}

const authServiceInstance = new AuthService(/* pass your router instance here */);
export default authServiceInstance;
