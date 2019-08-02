import React from 'react';
import { Link as ReachLink } from '@reach/router';
import { Props, LinkLikeComponent } from '@shopify/polaris/types/components/UnstyledLink';

/**
 * Link component that provides compatiblity between
 * `@shopify/polaris` and `@reach/router`
 * @example
 *   import { Link } from 'polaris-reach-link';
 *   <AppProvider linkComponent={Link}>
 *    {children}
 *   </AppProvider>
 */
const Link: LinkLikeComponent = (props: Props) => {
  const { url, external, children, ref, ...rest } = props;

  const target = external ? '_blank' : undefined;
  const rel = external ? 'noopener noreferrer' : undefined;

  return (
    <ReachLink to={url} target={target} rel={rel} {...rest}>
      {children}
    </ReachLink>
  );
};

export default Link;