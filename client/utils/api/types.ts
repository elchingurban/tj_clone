export type LoginDto = {
  email: string;
  password: string;
};

export type CreateUserDto = {
  fullName: string;
} & LoginDto;

export type ResponseUser = {
  email: string;
  fullName: string;
  id: number;
  token: string;
  createdAt: string;
  updatedAt: string;
};
