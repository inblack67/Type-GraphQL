import { NEW_NOTI } from "../utils/triggers";
import { Noti } from "../utils/types";
import { PubSub, PubSubEngine, Query, Resolver, Root, Subscription } from "type-graphql";

@Resolver()
export class HelloResolver
{
    @Query()
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
        return payload;
    }

    @Query( () => String )
    pub (
        @PubSub()
        pubsub: PubSubEngine
    )
    {
        setInterval( () =>
        {
            pubsub.publish( NEW_NOTI, { message: 'ok' } );
        }, 1000 );
        return 'published';
    }
}