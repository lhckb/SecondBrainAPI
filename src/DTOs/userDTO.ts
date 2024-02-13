import { User } from "@prisma/client";

export default class UserDTO {
  private readonly first_name: string;
  private readonly last_name: string;
  private readonly email: string;
  private readonly created_at: Date;
  private readonly updated_at: Date;

  constructor(first_name: string, last_name: string, email: string, created_at: Date, updated_at: Date) {
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  public static modelToDTO(user: User): UserDTO {
    const userDTO = new UserDTO(
        user.first_name, 
        user.last_name, 
        user.email, 
        user.created_at,
        user.updated_at
      );
      
    return userDTO;
  }
}
