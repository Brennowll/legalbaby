import { PageHeadline } from '@sb/webapp-core/components/pageHeadline';
import { PageLayout } from '@sb/webapp-core/components/pageLayout';
import { FormattedMessage } from 'react-intl';

import { RequestCertificateForm } from '../../shared/components/certificates/requestCertificateForm/requestCertificateForm.component';

export const RequestCertificate = () => {
  return (
    <PageLayout>
      <PageHeadline
        header={<FormattedMessage defaultMessage="Solicitação de Certidões" id="Request Certificate / Header" />}
        subheader={
          <FormattedMessage
            defaultMessage="Obtenha facilmente certidões militares, trabalhistas,
            federais e mais através do preenchimento de um simples formulário.
            Nosso sistema simplifica o processo de solicitação,
            proporcionando conveniência e agilidade para você obter as certidões necessárias sem complicações."
            id="Request Certificate / Sub Header"
          />
        }
      />

      <RequestCertificateForm />
    </PageLayout>
  );
};
