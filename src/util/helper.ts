export const otpGenerator = (): string => {
  const otp = (Math.floor(Math.random() * 900000) + 100000).toString();
  return otp;
};
