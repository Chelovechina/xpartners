export interface ICreateUser {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly day: string;
  readonly month: string;
  readonly year: number;
  readonly gender: "male" | "female";
  readonly image: Buffer | undefined;
}
