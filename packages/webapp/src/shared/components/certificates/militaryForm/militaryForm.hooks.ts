import { useMutation } from '@apollo/client';
import { useApiForm } from '@sb/webapp-api-client/hooks';

import { createMilitaryCertificate } from './militaryForm.graphql';
import { MilitaryFormFields } from './militaryForm.types';

export const useCreateMilitaryCertificate = () => {
  const form = useApiForm<MilitaryFormFields>();

  const [commitMutation] = useMutation(createMilitaryCertificate, {
    onError: (error) => {
      form.setApolloGraphQLResponseErrors(error.graphQLErrors);
    },
    onCompleted: () => {
      form.form.reset();
    },
  });

  const handleSubmit = form.handleSubmit(async (data: MilitaryFormFields) => {
    await commitMutation({
      variables: {
        input: {
          fullName: data.fullName,
          state: data.state,
          certificateType: 'Federal',
          isLegalEntity: false,
          vat: data.CPF,
          serviceId: 'id fictício',
        },
      },
    });
  });

  return { ...form, handleSubmit };
};
