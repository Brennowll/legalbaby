type Certificate = {
  fullName: string;
  state: string;
  isLegalEntity: boolean;
  certificateType: string;
};

export type RequestedCertificatesQueryT = {
  requestedCertificates: Certificate[];
};

type RequestedCertificate = {
  fullName: string;
  state: string;
  isLegalEntity: boolean;
  certificateType: string;
};

type Document = {
  link: string;
};

type IssuedCertificate = {
  request: RequestedCertificate;
  document: Document;
};

export type IssuedCertificatesQueryT = {
  issuedCertificates: IssuedCertificate[];
};
