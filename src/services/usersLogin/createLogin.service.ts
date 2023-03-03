import { compare } from "bcryptjs";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors/erros";
import { sign } from "jsonwebtoken";
import { tUserLoginSchema } from "../../interfaces/users.types";

export const createLoginService = async (
  payload: tUserLoginSchema
): Promise<any> => {
  const userRepo = AppDataSource.getRepository(User);

  const userRepoResult: User | null = await userRepo.findOneBy({
    email: payload.email,
  });

  if (!userRepoResult || userRepoResult.deletedAt) {
    throw new AppError("Invalid credentials", 401);
  }

  const pwdMatch: boolean = await compare(
    payload.password,
    userRepoResult.password
  );

  if (!pwdMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = sign(
    { email: payload.email, admin: userRepoResult.admin },
    String(process.env.SECRET_KEY),
    {
      expiresIn: "24h",
      subject: String(userRepoResult.id),
    }
  );

  return { token };
};
