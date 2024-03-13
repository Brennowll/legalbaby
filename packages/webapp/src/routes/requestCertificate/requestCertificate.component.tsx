import { PageHeadline } from '@sb/webapp-core/components/pageHeadline';
import { PageLayout } from '@sb/webapp-core/components/pageLayout';
import { Tabs, TabsList, TabsTrigger } from '@sb/webapp-core/components/tabs';
import { useGenerateLocalePath } from '@sb/webapp-core/hooks/useGenerateLocalePath/useGenerateLocalePath';
import { FormattedMessage } from 'react-intl';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { RoutesConfig } from '../../config/routes';

export const RequestCertificate = () => {
  const location = useLocation();
  const generateLocalePath = useGenerateLocalePath();

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

      <Tabs value={location.pathname}>
        <TabsList className="flex h-full w-full flex-col sm:h-10 sm:w-fit sm:flex-row">
          <Link replace to={generateLocalePath(RoutesConfig.requestCertificate.index)}>
            <TabsTrigger value={generateLocalePath(RoutesConfig.requestCertificate.index)}>
              <FormattedMessage defaultMessage="Militar" id="Request Certificate / Military" />
            </TabsTrigger>
          </Link>
          <Link replace to={generateLocalePath(RoutesConfig.requestCertificate.state)}>
            <TabsTrigger value={generateLocalePath(RoutesConfig.requestCertificate.state)}>
              <FormattedMessage defaultMessage="Estadual" id="Request Certificate / State" />
            </TabsTrigger>
          </Link>
          <Link replace to={generateLocalePath(RoutesConfig.requestCertificate.labor)}>
            <TabsTrigger value={generateLocalePath(RoutesConfig.requestCertificate.labor)}>
              <FormattedMessage defaultMessage="Trabalhista" id="Request Certificate / Labor" />
            </TabsTrigger>
          </Link>
          <Link replace to={generateLocalePath(RoutesConfig.requestCertificate.federal)}>
            <TabsTrigger value={generateLocalePath(RoutesConfig.requestCertificate.federal)}>
              <FormattedMessage defaultMessage="Federal" id="Request Certificate / Federal" />
            </TabsTrigger>
          </Link>
        </TabsList>

        <Outlet />
      </Tabs>
    </PageLayout>
  );
};
