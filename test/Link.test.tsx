/* eslint-env jest */
import React, { ReactNode } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AppProvider, Link as PolarisLink, Page } from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';
import {
  installMockStorage,
  ensureMocksReset,
  matchMedia,
} from '@shopify/jest-dom-mocks';

import {
  Router,
  RouteComponentProps,
  createHistory,
  createMemorySource,
  LocationProvider,
} from '@reach/router';
import { Link } from '../src';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home = (_: RouteComponentProps) => (
  <>
    <nav>
      <PolarisLink url="/about">about</PolarisLink>
    </nav>
    <div title="home">You are home</div>
  </>
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const About = (_: RouteComponentProps) => (
  <div title="about">You are on the about page</div>
);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Polaris = (_: RouteComponentProps) => (
  <Page
    title="Polaris fixture"
    breadcrumbs={[
      {
        content: 'breadcrumb',
        url: '/',
      },
    ]}
  >
    todo
  </Page>
);

function App() {
  return (
    <AppProvider linkComponent={Link} i18n={en}>
      <Router>
        <Home path="/" />
        <About path="/about" />
        <Polaris path="/polaris" />
      </Router>
    </AppProvider>
  );
}

function renderWithRouter(
  ui: ReactNode,
  { route = '/', history = createHistory(createMemorySource(route)) } = {},
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  };
}

beforeAll(installMockStorage);
beforeEach(() => {
  ensureMocksReset();
  matchMedia.mock();
});
afterEach(() => {
  matchMedia.restore();
  cleanup();
});

describe('<Link />', () => {
  it('renders without crashing', async () => {
    const { findByTitle } = renderWithRouter(<App />);

    const component = await findByTitle('home');
    expect(component.innerHTML).toEqual('You are home');
  });

  it('can navigate with polaris link', async () => {
    const { findByText, findByTitle } = renderWithRouter(<App />);
    const link = await findByText('about');

    await fireEvent.click(link);

    const component = await findByTitle('about');
    expect(component.innerHTML).toEqual('You are on the about page');
  });

  it('can navigate with polaris link', async () => {
    const { findByText, findByTitle } = renderWithRouter(<App />);
    const link = await findByText('about');

    await fireEvent.click(link);

    const component = await findByTitle('about');
    expect(component.innerHTML).toEqual('You are on the about page');
  });

  it('can navigate with page breadcrumb', async () => {
    const { findByText, findByTitle } = renderWithRouter(<App />, {
      route: '/polaris',
    });
    const link = await findByText('breadcrumb');

    await fireEvent.click(link);

    const component = await findByTitle('home');
    expect(component.innerHTML).toEqual('You are home');
  });
});
