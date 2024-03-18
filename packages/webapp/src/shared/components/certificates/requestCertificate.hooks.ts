import { useMutation } from '@apollo/client';
import { useApiForm } from '@sb/webapp-api-client/hooks';

import { createRequestCertificate } from './requestCertificate.graphql';
import { CertificateType, RequestCertificateFields } from './requestCertificate.types';

export const useCreateRequestCertificate = (certificateType: CertificateType) => {
  const form = useApiForm<RequestCertificateFields>();

  const [commitMutation] = useMutation(createRequestCertificate, {
    onError: (error) => {
      form.setApolloGraphQLResponseErrors(error.graphQLErrors);
    },
    onCompleted: () => {
      form.form.reset();
    },
  });

  const handleSubmit = form.handleSubmit(async (data: RequestCertificateFields) => {
    const isLegalEntity = form.form.getValues('isLegalEntity') === 'PJ' ? true : false;

    await commitMutation({
      variables: {
        input: {
          fullName: data.fullName,
          state: data.state,
          certificateType: certificateType,
          isLegalEntity: isLegalEntity,
          vat: data.CPF,
          serviceId: 'Id da Api de documentos',
        },
      },
    });
  });

  return { ...form, handleSubmit };
};
