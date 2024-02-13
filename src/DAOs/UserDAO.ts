import { PrismaClient, User } from "@prisma/client";

export default class UserDAO {
  private readonly prisma = new PrismaClient();

  // TODO: test method should be deleted
  public async getAllUsers(): Promise<User[]> | null {
    return await this.prisma.user.findMany();
  }

  public async getUserById(id: string): Promise<User> | null {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async getUserByEmail(email: string): Promise<User> | null {
    return await this.prisma.user.findUnique({
      where: {
        email
      },
    });
  }

  public async createUser({ first_name, last_name, email, password }): Promise<User> | null {
    return await this.prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password
      }
    });
  }
}