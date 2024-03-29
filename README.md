# DEPRECATED - Use [OIDC SPA React Client](https://github.com/BrandwatchLtd/auth-monorepo/tree/main/packages/oidc-spa-client-react) instead

---
# brandwatch-react-auth
BrandwatchReactAuth component for seamless application authentication.

BrandwatchReactAuth is a wrapper around [donny-auth](https://github.com/BrandwatchLtd/donny-auth). It adds a reusable abstraction over the donny-auth token API. BrandwatchReactAuth also adds some helpful options such as adding the ability to add a back-up domain.

### Usage

The basic concept is to wrap an entire React application with the `<BrandwatchwatchReactAuth />` component, which will only render the application if the user is authenticated. When unauthenticated the user will be redirected to the authentication service, and redirected back on a successful login.

```js
render((
  <BrandwatchReactAuth
      audience="TOKEN_BUCKET_ID"
      domain="TOKEN_STORE_URL"
      onCreateStore={ (store) => {/* viziaauth store */} }>
    <Application />
  </BrandwatchReactAuth>
), document.getElementById('root'))

```

### Demo

To run the demo application you will need to set the domain to point at your auth domain e.g `https://auth-gateway.platform-stage.gcp0.bwcom.net/store`.
It seems it was once possible and maybe still so to instead set the `BW_REACT_AUTH_DOMAIN` environment variable however I couldn't get this to work locally.

```
yarn install
yarn demo
```

Open up [http://localhost:4000/](http://localhost:4000/)
