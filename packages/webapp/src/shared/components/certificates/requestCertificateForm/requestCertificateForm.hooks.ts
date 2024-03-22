import { useMutation, useQuery } from '@apollo/client';
import { useApiForm } from '@sb/webapp-api-client/hooks';
import { useToast } from '@sb/webapp-core/toast';
import { useEffect, useState } from 'react';

import { UserProfileQuery, certificatesQuery, createRequestCertificate } from './requestCertificateForm.graphql';
import {
  Category,
  Certificate,
  CertificateQueryT,
  RequestCertificate,
  UserProfile,
} from './requestCertificateForm.types';

export const useCreateRequestCertificate = () => {
  const [filteredCertificates, setFilteredCertificates] = useState<Certificate[] | undefined>();
  const [certificateCategories, setCertificateCategories] = useState<Category[] | undefined>();

  const form = useApiForm<RequestCertificate>();
  const { data: UserProfileData } = useQuery<UserProfile>(UserProfileQuery);
  const { loading, data: certificatesQueryData } = useQuery<CertificateQueryT>(certificatesQuery);
  const { toast } = useToast();

  const [commitMutation] = useMutation(createRequestCertificate, {
    onError: (error) => {
      form.setApolloGraphQLResponseErrors(error.graphQLErrors);
    },
    onCompleted: () => {
      form.form.reset();
    },
  });

  const vatValue = form.form.watch('vat');
  const validVat = /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(vatValue);
  const isLegalEntity = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(vatValue);
  const vatTypeForFilter = isLegalEntity ? 'PJ' : 'PF';

  useEffect(() => {
    if (!certificatesQueryData) {
      return;
    }

    const filteredCertificatesTemp = certificatesQueryData.certificates.filter((certificate) =>
      certificate.availablePersonType.includes(vatTypeForFilter)
    );

    const filteredCategoriesTemp: Category[] = [];
    if (filteredCertificatesTemp) {
      for (const certificate of filteredCertificatesTemp) {
        if (filteredCategoriesTemp.some((categorie) => categorie.name === certificate.category.name)) {
          continue;
        }

        filteredCategoriesTemp.push(certificate.category);
      }
      setCertificateCategories(filteredCategoriesTemp);
    }

    setFilteredCertificates(filteredCertificatesTemp);
  }, [validVat]);

  const handleSubmit = form.handleSubmit(async (data: RequestCertificate) => {
    if (!UserProfileData?.currentUser.certificateCredits) {
      return;
    }

    let creditsSum = 0;
    for (const certificateSlug of data.requestedCertificatesSlugs) {
      const certificate = filteredCertificates?.find((certificate) => certificate.slug === certificateSlug);
      if (certificate?.creditsNeeded) creditsSum += certificate?.creditsNeeded;
    }

    if (UserProfileData?.currentUser.certificateCredits < creditsSum) {
      toast({
        title: 'Erro ao fazer pedido!',
        description: 'O usuário não têm créditos suficientes.',
        variant: 'destructive',
      });
    }

    await commitMutation({
      variables: {
        input: {
          vat: data.vat,
          state: data.state,
          rg: data.rg || '',
          sspRg: data.sspRg || '',
          motherName: data.motherName || '',
          fatherName: data.fatherName || '',
          maritalState: data.maritalState || '',
          city: data.city || '',
          requestedCertificatesSlugs: data.requestedCertificatesSlugs,
          creditsToDecrease: creditsSum,
        },
      },
      onCompleted: () => {
        toast({
          description: 'O pedido foi feito com sucesso!',
        });

        form.form.reset();
      },
    });
  });

  return { ...form, handleSubmit, loading, validVat, isLegalEntity, filteredCertificates, certificateCategories };
};
