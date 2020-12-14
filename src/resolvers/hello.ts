import { NEW_NOTI } from "../utils/triggers";
import { Noti } from "../utils/types";
import { PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";

@Resolver( HelloResolver )
export class HelloResolver
{
    @Query( () => String )
    hello (): string
    {
        return 'worlds';
    }

    @Subscription( () => String, {
        topics: NEW_NOTI
    } )
    sub (
        @Root()
        payload: Noti
    )
    {
        console.log( 'payload', payload );
        return payload.sub;
    }

    @Query( () => String )
    pub (
        @PubSub()
        pubsub: PubSubEngine
    )
    {
        setInterval( () =>
        {
            pubsub.publish( NEW_NOTI, { sub: 'ok' } );
        }, 1000 );
        return 'published';
    }
}