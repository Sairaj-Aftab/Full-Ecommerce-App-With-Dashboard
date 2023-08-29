// Email validation
export const isEmail = (email) => {
  return /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
    email
  );
};

// Mobile Number Validation
export const isPhoneNumber = (number) => {
  return /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/.test(number);
};
