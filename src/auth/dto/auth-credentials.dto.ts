import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    email: string;
    
    @IsString()
    @MinLength(8)
    @MaxLength(50)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password is too weak' }   
    )
    password: string;
}