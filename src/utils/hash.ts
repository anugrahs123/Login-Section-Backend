import bcrypt from "bcryptjs";

export const generatePasswordHash = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  candidatePassword: string,
  storedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(candidatePassword, storedPassword);
};
