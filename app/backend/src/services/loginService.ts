import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import User from '../database/models/users';
import userPayload from '../interfaces/interfacePayload';

export default class LoginService {
  public login = async (payload: userPayload) => {
    console.log(payload);
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
    const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET as string);
    if (validPassword) { return { code: 200, data: { token } }; }

    return { code: 400, data: { message: 'All fields must be filled' } };
  };
}
