import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {email, password} = authCredentialsDto;

        const user = new User();
        user.email = email;
        user.password = password;

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
}