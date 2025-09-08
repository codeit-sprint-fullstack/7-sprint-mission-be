import * as userRepo from "../repositories/user.repository";
import bcrypt from "bcrypt";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  img?: string;
}) => {
  const existing = await userRepo.findUserByEmail(data.email);
  if (existing) throw new Error("Email already exists");

  const hashed = await bcrypt.hash(data.password, 10);
  return await userRepo.createUser({ ...data, password: hashed });
};

export const loginUser = async (email: string, password: string) => {
  const user = await userRepo.findUserByEmail(email);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid password");

  return user;
};
