import { RoutesConfig as ContentfulRoutesConfig } from '@sb/webapp-contentful/config/routes';
import { RoutesConfig as CoreRoutesConfig } from '@sb/webapp-core/config/routes';
import { getLocalePath } from '@sb/webapp-core/utils/path';
import { RoutesConfig as CrudDemoRoutesConfig } from '@sb/webapp-crud-demo/config/routes';
import { RoutesConfig as FinancesRoutesConfig } from '@sb/webapp-finances/config/routes';
import { RoutesConfig as GenerativeAIRoutesConfig } from '@sb/webapp-generative-ai/config/routes';

import { RoutesConfig as WebAppRoutesConfig } from '../../config/routes';

export const LANG_PREFIX = `/:lang?/*`;

export const RoutesConfig = {
  ...CoreRoutesConfig,
  documents: 'documents',
  ...GenerativeAIRoutesConfig,
  ...ContentfulRoutesConfig,
  ...CrudDemoRoutesConfig,
  ...FinancesRoutesConfig,
  ...WebAppRoutesConfig,
  issuedCertificates: 'issued-certificates',
  //<-- INJECT ROUTE DEFINITION -->
};

export const NO_NAVIGATION_ROUTES = [
  RoutesConfig.login,
  RoutesConfig.logout,
  RoutesConfig.signup,
  RoutesConfig.validateOtp,
  RoutesConfig.confirmEmail,
  RoutesConfig.passwordReset.index,
  RoutesConfig.passwordReset.confirm,
].map(getLocalePath);
