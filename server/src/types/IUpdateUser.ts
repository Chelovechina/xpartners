export interface IUpdateUser {
  readonly id: string;
  readonly name: string;
  readonly password: string;
  readonly image: Buffer | undefined;
}
