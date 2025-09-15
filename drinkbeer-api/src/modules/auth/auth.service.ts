import {
  BadRequestException,
  Dependencies,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginPayloadDto } from './dto/loginPayload.dto';
import { UserService } from '@modules/user/user.service';
import { AppErrors } from 'src/constant/errors/error.message';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/bycrpt.utils';
import { SignupDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validate({ username, password }: LoginPayloadDto) {
    const userExist = await this.userService.getUserByUsername(username);
    const userPassword = await comparePassword(password, userExist.password);

    if (userExist && userPassword) {
      const { password, ...user } = userExist;

      const payload = { sub: user.id, username: user.username };
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException(AppErrors.Login.FAIL);
    }
  }

  async signup(signupDto: SignupDto) {
    try {
      const userCreated = await this.userService.createUser(signupDto);
      return userCreated;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
