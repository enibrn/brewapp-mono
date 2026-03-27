type UserName = {
  username: string;
}

type UserEmail = {
  email: string;
}

type UserPassword = {
  password: string;
}

export type UserLogin = UserEmail & UserPassword;
export type UserSignup = UserLogin & UserName;
export type UserProfile = UserName & UserEmail;