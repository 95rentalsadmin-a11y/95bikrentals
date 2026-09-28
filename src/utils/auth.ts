export const getCustomerToken = () => localStorage.getItem('customerToken');
export const getCustomerMobile = () => localStorage.getItem('customerMobile');
export const isLoggedIn = () => !!getCustomerToken();

export const logout = () => {
  localStorage.removeItem('customerToken');
  localStorage.removeItem('customerMobile');
};
