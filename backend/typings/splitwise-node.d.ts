

export = splitwise_node;

declare class splitwise_node {
    constructor(consumerKey: any, consumerSecret: any);

    getOAuthAccessToken(oAuthToken: any, oAuthTokenSecret: any, oAuthVerifier: any): any;

    getOAuthRequestToken(): any;

    getSplitwiseApi(oAuthToken: any, oAuthSecret: any): any;

    getUserAuthorisationUrl(oAuthToken: any): any;

}

