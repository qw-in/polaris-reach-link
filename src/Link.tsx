import React from 'react';
import { Link as ReachLink } from '@reach/router';
import { AppProviderProps } from '@shopify/polaris';

/**
 * Link component that provides compatiblity between
 * `@shopify/polaris` and `@reach/router`
 * @example
 *   import { Link } from 'polaris-reach-link';
 *   <AppProvider linkComponent={Link}>
 *    {children}
 *   </AppProvider>
 */
const Link: AppProviderProps['linkComponent'] = ({
  url,
  external,
  children,
  ...props
}: any) => {
  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;

  if (external) {
    return (
      <a href={url} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <ReachLink to={url} {...props}>
      {children}
    </ReachLink>
  );
};

export default Link;
