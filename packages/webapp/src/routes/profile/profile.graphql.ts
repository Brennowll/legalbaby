import { gql } from '@apollo/client';

export const UserProfileQuery = gql(`
    query {
        currentUser {
            certificateCredits
        }
    }
`);
