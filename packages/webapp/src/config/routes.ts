import { nestedPath } from '@sb/webapp-core/utils';

export const RoutesConfig = {
  requestCertificate: nestedPath('pedir-certificado', {
    military: 'militar',
    state: 'estadual',
    labor: 'trabalhista',
    federal: 'federal',
  }),
};
