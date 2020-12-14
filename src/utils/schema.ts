import { HelloResolver } from "../resolvers/hello";
import { buildSchema } from "type-graphql";

export const getSchema = async () =>
{
    const schema = await buildSchema( {
        resolvers: [ HelloResolver ],
        // validate: false
    } );
    return schema;
};