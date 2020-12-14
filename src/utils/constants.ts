import colors from 'colors/safe';

export const isProd = () => process.env.NODE_ENV === 'production';

export const devLogger = ( data: any, _: string = 'gray' ) =>
{
    if ( isProd() )
    {
        return;
    }
    console.log( colors.gray( data ) );
};