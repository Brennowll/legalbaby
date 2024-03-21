export type RequestCertificate = {
  vat: string;
  state: string;
  rg?: string;
  sspRg?: string;
  motherName?: string;
  fatherName?: string;
  maritalState?: string;
  city?: string;
  requestedCertificatesIds: string[];
};

type StateNode = {
  node: {
    name: string;
    uf: string;
  };
};

type StateEdge = {
  edges: StateNode[];
};

type Court = {
  name: string;
  states: StateEdge;
};

type SubCategory = {
  name: string;
};

type SubCategoryNode = {
  node: {
    name: string;
  };
};

export type SubCategoryEdges = {
  edges: SubCategoryNode[];
};

export type Category = {
  name: string;
  subCategories: SubCategoryEdges;
};

export type Certificate = {
  id: string;
  name: string;
  court: Court;
  availablePersonType: string;
  category: Category;
  subCategory: SubCategory;
  creditsNeeded: number;
  deadlineDays: number;
};

export type CertificateQueryT = {
  certificates: Certificate[];
};
