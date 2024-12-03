# tsg-10-med-booking-peder-goodman

1. ## Enviroment setup 
- nav to frontend npm i
- setup backend (okta->database->add settings to application.properties or env file)
1. duplicate a application.properties.example and rename it to application.properties



2. ## Okta Setup
## Creating app
Create new app integration with the following settings
- OIDC
- Web application
- Name your app
- change Sign-in redirect URIs to: http://localhost:8080/login/oauth2/code/okta
- Sign-out redirect URIs to include both: http://localhost:8080 & http://localhost:3000
- for controlled access check: "Allow everyone in your organization to access"
- leave everything default
- **adjust a=okta security settings based on your needs but this gives you quick access to test your app with okta
## API Security
- okta api security steps


2. copy your Okta details into your application.properties file

- okta.oauth2.issuer=OKTA_ISSUER_URL/oauth2/default
    - example: https\://dev-11992601.okta.com/oauth2/default
    - found in your okta admin dashboard
- okta.oauth2.client-id=OKTA_APP_CLIENT_ID
- okta.oauth2.client-secret=OKTA_APP_SECRET


