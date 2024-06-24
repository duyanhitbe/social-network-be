import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@graphql/graphql.module';
import { ApisModule } from './apis/apis.module';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '@prisma/prisma.module';
import { JwtModule } from '@jwt/jwt.module';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		GraphQLModule,
		CqrsModule.forRoot(),
		PrismaModule,
		JwtModule,
		ApisModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
