type Certificate = {
  name: string;
  court: {
    name: string;
  };
  category: {
    name: string;
  };
  subCategory: {
    name: string;
  };
  deadlineDays: number;
};

type RequestedCertificateNode = {
  node: {
    url: string;
    issued: boolean;
    certificate: Certificate;
  };
};

type CertificateRequest = {
  status: string;
  document: {
    docId: string;
    docIdState: string;
  };
  requestedCertificates: {
    edges: RequestedCertificateNode[];
  };
};

export type RequestQueryT = {
  requests: CertificateRequest[];
};
