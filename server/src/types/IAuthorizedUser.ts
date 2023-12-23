import { UserDto } from "../dtos/user-dto";
import { ITokens } from "./ITokens";

export type IAuthorizedUser = ITokens & { user: UserDto };
