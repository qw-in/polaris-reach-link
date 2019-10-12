# polaris-reach-link
A &lt;Link /> between @reach/router and @shopify/polaris

## TL;DR

```js
import { AppProvider } from '@shopify/polaris';
import { Link } from 'polaris-reach-link';
import en from '@shopify/polaris/locales/en.json';


function App() {
  return (
    <AppProvider linkComponent={Link} i18n={en}>
      <MyApp />
    </AppProvider>
  );
}
```

## About

This package provides a compatiblity layer between `@shopify/polaris` and `@reach/router`. It should basically be set and forget. For all other linking needs just use the `Link` component from `@reach/router` directly

## Installation

```
npm install polaris-reach-link

or

yarn add polaris-reach-link
```

You will also need to have `@shopify/polaris` and `@reach/router` installed seperately

## Setup

Pass the `Link` from this package to your `AppProvider` component on the `linkComponent` prop (see above)

## Further considerations

If you are using this in an embedded app, consider also using `@shopify/react-shopify-app-route-propagator` to keep the parent windows url in sync with your app

## Contributing

PRs are welcome

## Licence

MIT - See `./LICENCE`