import { prisma } from "@/prisma/db";
import { AdminEdit } from "@prisma/client";
import bcrypt from "bcryptjs";

class AdminService {
  //Create Admin
  static async create(
    email: string,
    password: string
  ): Promise<{ id: string; email: string }> {
    const existEmail = await prisma.adminEdit.findUnique({ where: { email } });

    if (existEmail) throw new Error("El correo electronico esta en uso");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.adminEdit.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...onLySecData } = newUser;

    return onLySecData;
  }

  // Login of Admin
  static async signin(
    email: string,
    password: string
  ): Promise<{ id: string; email: string }> {
    const user = await prisma.adminEdit.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Credenciales invalidas");
    }

    const { password: _, ...ResUser } = user;

    return ResUser;
  }
}

export default AdminService;
