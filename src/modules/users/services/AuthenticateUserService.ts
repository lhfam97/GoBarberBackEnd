import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;

  password: string;
}
interface Response {
  user: User;
  token: string;
}
@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    // user.password - senha criptografada
    // password - Senha não criptografada

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    // Usuario autenticado
    // experiencia / seguranca
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
export default AuthenticateUserService;
