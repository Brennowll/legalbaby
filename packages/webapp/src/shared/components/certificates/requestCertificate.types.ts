export type CertificateType = 'Military' | 'State' | 'Labor' | 'Federal';

export type RequestCertificateFields = {
  fullName: string;
  CPF: string;
  state: string;
  isLegalEntity: 'PJ' | 'PF';
};
