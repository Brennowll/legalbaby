import { gql } from '@apollo/client';

export const requestedCertificatesQuery = gql(`
    query {
        requestedCertificates {
            fullName
            state
            isLegalEntity
            certificateType
        }
    }
`);

export const issuedCertificatesQuery = gql(`
    query {
        issuedCertificates {
            request {
                fullName
                state
                certificateType
                isLegalEntity
            }
            document {
                link
            }
        }
    }
`);
