import { gql } from '@apollo/client';

export const createRequestCertificate = gql(`
    mutation($input: CreateRequestInput!) {
        createRequest(input: $input) {
            request {
                status
            }
        }
    }
`);

export const certificatesQuery = gql(`
    query {
        certificates {
            id
            name
            slug
            court {
                name
                states {
                    pageInfo {
                      hasNextPage
                      hasPreviousPage
                    }
                    edges {
                      node {
                        name
                        uf
                      }
                      cursor
                    }
                }
            }
            availablePersonType
            category {
                name
                subCategories {
                  edges {
                    node {
                      name
                    }
                  }
                }
            }
            subCategory {
                name
            }
            creditsNeeded
            deadlineDays
        }
    }
`);

export const UserProfileQuery = gql(`
    query {
        currentUser {
            certificateCredits
        }
    }
`);
