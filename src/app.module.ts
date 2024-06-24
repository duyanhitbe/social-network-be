import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from './modules/graphql/graphql.module';
import { ApisModule } from './apis/apis.module';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from './modules/database/prisma.module';

@Module({
	imports: [GraphQLModule, CqrsModule.forRoot(), PrismaModule, ApisModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
