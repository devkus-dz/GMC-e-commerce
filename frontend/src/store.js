import { create } from 'zustand';

const useAuthStore = create((set) => ({
  // 1. Initial State (Check localStorage immediately)
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,

  // 2. Action: Login
  setCredentials: (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data));
    set({ userInfo: data });
  },

  // 3. Action: Logout
  logout: () => {
    localStorage.removeItem('userInfo');
    set({ userInfo: null });
  },
}));

export default useAuthStore;