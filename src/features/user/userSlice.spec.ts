import IUser from '../../interfaces/user.interface';
import userReducer, {
  UserState,
  setUID,
  setUserData,
  clearUser
} from './userSlice';

describe('counter reducer', () => {
  const initialState: UserState = {
    uid: null,
    userData: null,
  };
  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      uid: null,
      userData: null,
    });
  });

  it('should handle setUID', () => {
    const actual = userReducer(initialState, setUID('test_uid'));
    expect(actual.uid).toEqual('test_uid');
  });

  it('should handle setUserData', () => {
    const userData: IUser = {
      email: 'mail@test.com',
      username: 'test_user',
      photo: null
    }
    const actual = userReducer(initialState, setUserData(userData));
    expect(actual.userData).toEqual(userData);
  });

  it('should handle clearUser', () => {
    const actual = userReducer(initialState, clearUser());
    expect(actual).toEqual({
      uid: null,
      userData: null,
    });
  });
});