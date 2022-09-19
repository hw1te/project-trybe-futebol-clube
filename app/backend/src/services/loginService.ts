import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/users';
import userPayload from '../interfaces/interfacePayload';

export default class LoginService {
  public login = async (payload: userPayload) => {
    if (!payload.email || !payload.password) {
      return { code: 400, data: { message: 'All fields must be filled' } };
    }
    const user = await User.findOne({
      where: { email: payload.email },
    });
    if (user === null) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }
    const validPassword = bcrypt.compareSync(payload.password, user.password);
    const token = jwt.sign(
      { email: user.email, id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
    );
    if (validPassword) { return { code: 200, data: { token } }; }

    return { code: 400, data: { message: 'All fields must be filled' } };
  };

  public getRole = async (payload: userPayload) => {
    if (!payload.role) {
      return { code: 400, data: { message: 'Role cannot be null' } };
    }
    const user = await User.findOne({
      where: { role: payload.role },
    });
    if (!user) {
      return { code: 401, data: { message: 'Incorrect email or password' } };
    }
    return { code: 200, data: { role: user.role as string } };
  };
}
