import { gql } from '@apollo/client';

export const userCreditsQuery = gql(`
    query {
        currentUser {
        certificateCredits
        }
    }
`);

export const userCreditsMutation = gql(`
    mutation($input: UpdateCurrentUserMutationInput!)  {
      updateCurrentUser(input: $input) {
        userProfile {
            user {
            certificateCredits
          }
        }
      }
    }
`);
