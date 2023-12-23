export interface IRegistrationDto {
  name: string;
  email: string;
  password: string;
  birthDate: string;
  gender: "male" | "female";
  image: File | undefined;
}
