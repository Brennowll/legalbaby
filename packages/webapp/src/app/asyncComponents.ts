import { asyncComponent } from '@sb/webapp-core/utils/asyncComponent';

export const Home = asyncComponent(() => import('../routes/home'));
export const NotFound = asyncComponent(() => import('../routes/notFound'));
export const Signup = asyncComponent(() => import('../routes/auth/signup'));
export const Login = asyncComponent(() => import('../routes/auth/login'));
export const Logout = asyncComponent(() => import('../routes/auth/logout'));
export const Profile = asyncComponent(() => import('../routes/profile'));
export const ConfirmEmail = asyncComponent(() => import('../routes/auth/confirmEmail'));

export const RequestCertificate = asyncComponent(() => import('../routes/request-certificate'));
export const IssuedCertificates = asyncComponent(() => import('../routes/issued-certificates'));
export const MilitaryFormContent = asyncComponent(() => import('./../routes/request-certificate/militaryForm.content'));
export const StateFormContent = asyncComponent(() => import('./../routes/request-certificate/stateForm.content'));
export const LaborFormContent = asyncComponent(() => import('./../routes/request-certificate/laborForm.content'));
export const FederalFormContent = asyncComponent(() => import('./../routes/request-certificate/federalForm.content'));

//<-- IMPORT ROUTE -->
