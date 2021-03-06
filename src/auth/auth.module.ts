import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.startegy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'topSecret51', // it is very weak. needs to be modified later on
      signOptions: {
        expiresIn: 3600
      },
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtStrategy,
    PassportModule
  ]

})
export class AuthModule {}
