import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
export const generateToken = (userId: string) => {
  console.log(JWT_SECRET)
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in .env file");
  }

  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "3d" });
};

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
