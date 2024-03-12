import { gql } from '@apollo/client';

export const createMilitaryCertificate = gql(`
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
