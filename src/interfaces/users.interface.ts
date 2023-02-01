export interface IUserRequest {
  name: string;
  email: string;
  phoneNumber: string;
  password?: string;
}

export interface IUserResponse extends IUserRequest {
  id: string;
  registrationDate: Date;
}

export interface IUserUpdateRequest {
  name?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}
