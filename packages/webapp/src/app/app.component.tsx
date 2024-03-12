import { PrivacyPolicy, TermsAndConditions } from '@sb/webapp-contentful/routes';
import { DEFAULT_LOCALE, translationMessages } from '@sb/webapp-core/config/i18n';
import { PaymentConfirm, TransactionHistory } from '@sb/webapp-finances/routes';
import { IntlProvider } from 'react-intl';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Role } from '../modules/auth/auth.types';
import { Admin } from '../routes/admin';
import { PasswordReset } from '../routes/auth/passwordReset';
import ValidateOtp from '../routes/auth/validateOtp';
import { AnonymousRoute, AuthRoute } from '../shared/components/routes';
import {
  ConfirmEmail,
  FederalFormContent,
  Home,
  IssuedCertificates,
  LaborFormContent,
  Login,
  Logout,
  MilitaryFormContent,
  NotFound,
  Profile,
  RequestCertificate,
  Signup,
  StateFormContent,
} from './asyncComponents';
import { LANG_PREFIX, RoutesConfig } from './config/routes';
import { ValidRoutesProviders } from './providers';

export const App = () => {
  const { pathname, search } = useLocation();

  return (
    <Routes>
      <Route element={<ValidRoutesProviders />}>
        <Route path={LANG_PREFIX}>
          <Route path={RoutesConfig.logout} element={<Logout />} />
        </Route>
        <Route path={LANG_PREFIX} element={<AnonymousRoute />}>
          <Route path={RoutesConfig.signup} element={<Signup />} />
          <Route path={RoutesConfig.login} element={<Login />} />
          <Route path={RoutesConfig.validateOtp} element={<ValidateOtp />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path={LANG_PREFIX} element={<AuthRoute />}>
          <Route index element={<Home />} />
          <Route path={RoutesConfig.profile} element={<Profile />} />
          <Route path={RoutesConfig.finances.paymentConfirm} element={<PaymentConfirm />} />
          <Route path={RoutesConfig.subscriptions.transactionHistory.history} element={<TransactionHistory />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<RequestCertificate />}>
            <Route path={RoutesConfig.requestCertificate.index} element={<MilitaryFormContent />} />
            <Route path={RoutesConfig.requestCertificate.state} element={<StateFormContent />} />
            <Route path={RoutesConfig.requestCertificate.labor} element={<LaborFormContent />} />
            <Route path={RoutesConfig.requestCertificate.federal} element={<FederalFormContent />} />
          </Route>

          <Route path={RoutesConfig.issuedCertificates} element={<IssuedCertificates />} />
        </Route>
        <Route path={LANG_PREFIX} element={<AuthRoute allowedRoles={Role.ADMIN} />}>
          <Route path={RoutesConfig.admin} element={<Admin />} />
        </Route>

        <Route path={LANG_PREFIX}>
          <Route path={RoutesConfig.confirmEmail} element={<ConfirmEmail />} />
          <Route path={RoutesConfig.privacyPolicy} element={<PrivacyPolicy />} />
          <Route path={RoutesConfig.termsAndConditions} element={<TermsAndConditions />} />
          <Route path={RoutesConfig.passwordReset.index} element={<PasswordReset />} />
        </Route>

        <Route
          path="*"
          element={
            <IntlProvider key={DEFAULT_LOCALE} locale={DEFAULT_LOCALE} messages={translationMessages[DEFAULT_LOCALE]}>
              <NotFound />
            </IntlProvider>
          }
        />
      </Route>

      <Route path="/" element={<Navigate to={`/${DEFAULT_LOCALE}${pathname}${search}`} />} />
    </Routes>
  );
};

export default App;
