export class Config {
    public static readonly AUTHORIZATION_URL: string = "https://ratemyimage.brentedwardsonline.com";
    //public static readonly AUTHORIZATION_URL: string = "http://localhost:5000";
    public static readonly TOKEN_ENDPOINT: string = "/connect/token";
    public static readonly REGISTER_ENDPOINT: string = "/account/register";
    public static readonly REVOCATION_ENDPOINT: string = "/connect/revocation";
    public static readonly USERINFO_ENDPOINT: string = "/connect/userinfo";
    public static readonly CLIENT_ID: string = "careerHubApi";
    public static readonly CLIENT_SECRET: string = "secret";
    public static readonly GRANT_TYPE: string = "password";
    public static readonly SCOPE: string = "openid api";
}