import { gql } from '@apollo/client';

export const requestQuery = gql(`
    query {
        requests {
            status
            document {
                docId
                docIdState
            }
            requestedCertificates {
                edges {
                    node {
                        url
                        issued
                        certificate {
                            name
                            court {
                                name
                            }
                            category {
                                name
                            }
                            subCategory {
                                name
                            }
                            deadlineDays
                        }
                    }
                }
            }
        }
    }
`);
