# brandwatch-react-auth

BrandwatchReactAuth component for seamless application authentication

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

A demo application can be run...

```
yarn install
yarn demo
```

Open up [http://localhost:4000/](http://localhost:4000/)
