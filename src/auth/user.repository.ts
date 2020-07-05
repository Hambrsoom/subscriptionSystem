import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {email, password} = authCredentialsDto;

        // Will generate a unique salt for each user
        const salt = await bcrypt.genSalt();

        const user = new User();
        user.email = email;
        user.password = await this.hashPassword(password, salt);
        user.salt = salt;

        try{
            await this.save(user);
        } catch(error) {
            if (error.code === '23505') { // duplicate Email
                throw new ConflictException('Email already exists')
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const {email, password} = authCredentialsDto;
        const user = this.findOne({email});

        if((await (await user)?.validatePassword(password)).valueOf()) { return (await user).email; }
        else { return null; }
    }


    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}