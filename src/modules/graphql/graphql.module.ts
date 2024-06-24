import { Module } from '@nestjs/common';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
	imports: [
		NestGraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
			playground: false,
			plugins: [ApolloServerPluginLandingPageLocalDefault()],
			formatError: (error) => {
				const originalError = error.extensions?.originalError as any;
				if (!originalError) {
					return {
						message: error.message,
						code: error.extensions?.code
					};
				}
				return {
					...originalError,
					code: error.extensions.code
				};
			}
		})
	]
})
export class GraphQLModule {}
