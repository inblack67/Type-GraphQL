import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { devLogger } from './utils/constants';
import { createServer } from 'http';
import { getSchema } from './utils/schema';

const main = async () =>
{
    const app = express();
    const ws = createServer( app );
    const apolloServer = new ApolloServer( {
        schema: await getSchema(),

    } );
    apolloServer.applyMiddleware( { app } );
    apolloServer.installSubscriptionHandlers( ws );

    const PORT = process.env.PORT || 5000;
    ws.listen( PORT, async () =>
    {
        devLogger( `Server started on port ${ PORT }` );
    } );
};

main().catch( err => devLogger( err ) );