import { gql } from '@apollo/client';

export const createRequestCertificate = gql(`
    mutation($input: CreateRequestedCertificateInput!) {
        createRequestedCertificate(input: $input) {
            requestedCertificate {
                id
                fullName
                state
                certificateType
                isLegalEntity
                vat
                serviceId
            }
        }
    }
`);
