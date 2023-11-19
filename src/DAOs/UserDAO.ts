import { Prisma, PrismaClient, User } from "@prisma/client";

export default class UserDAO {
  private readonly prisma = new PrismaClient()

  public async getUserById(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
  
      return user;
    }
    catch(error) {
      throw error;
    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
  
      return user;
    }
    catch(error) {
      throw error;
    }
  }

  public async createUser({ first_name, last_name, email, password }): Promise<User> {
    try {
      const user = await this.prisma.user.create({
        data: {
          first_name,
          last_name,
          email,
          password
        }
      });

      return user;
    }
    catch(error) {
      throw error;
    }
  }
}