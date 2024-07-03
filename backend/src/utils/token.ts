import jwt from "jsonwebtoken";

export const createToken = (id: string, email: string, expiresIn = "7d") => {
  const payload = { id, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn || "7d",
  });
  return token;
};

export const decodeToken = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}
