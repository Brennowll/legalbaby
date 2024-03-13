import { useQuery } from '@apollo/client';
import { PageHeadline } from '@sb/webapp-core/components/pageHeadline';
import { PageLayout } from '@sb/webapp-core/components/pageLayout';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@sb/webapp-core/components/table';
import { Link } from 'lucide-react';
import { FormattedMessage } from 'react-intl';

import { issuedCertificatesQuery, requestedCertificatesQuery } from './issuedCertificates.graphql';
import { IssuedCertificatesQueryT, RequestedCertificatesQueryT } from './issuedCertificates.types';

export const IssuedCertificates = () => {
  const { data: requestData } = useQuery<RequestedCertificatesQueryT>(requestedCertificatesQuery);
  const { loading, data: issuedData } = useQuery<IssuedCertificatesQueryT>(issuedCertificatesQuery);

  return (
    <PageLayout>
      <PageHeadline
        header={<FormattedMessage defaultMessage="Gerenciamento de Certificados" id="Issued Certificates / header" />}
        subheader={
          <FormattedMessage
            defaultMessage="Gerencie os certificados pedidos e emitidos.
            Mantenha-se informado sobre o status de cada certificado
            e agilize o processo de verificação. Por favor, observe que o
            tempo de emissão pode variar de 2 a 5 dias úteis."
            id="Issued Certificates / Sub Header"
          />
        }
      />

      <Table>
        <TableCaption>
          <FormattedMessage defaultMessage="Certificados solicitados." id="Request Certificates Table / Caption" />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <FormattedMessage defaultMessage="Nome" id="Request Certificates Table / Name" />
            </TableHead>
            <TableHead>
              <FormattedMessage defaultMessage="Estado" id="Request Certificates Table / State" />
            </TableHead>
            <TableHead>
              <FormattedMessage defaultMessage="Pessoa jurídica." id="Request Certificates Table / Juridic Person" />
            </TableHead>
            <TableHead className="text-right">
              <FormattedMessage defaultMessage="Tipo" id="Request Certificates Table / Type" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requestData
            ? requestData.requestedCertificates.map((data) => (
                <TableRow>
                  <TableCell>{data.fullName}</TableCell>
                  <TableCell>{data.state}</TableCell>
                  <TableCell>{data.isLegalEntity ? 'Sim' : 'Não'}</TableCell>
                  <TableCell className="text-right">{data.certificateType}</TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>

      <Table>
        <TableCaption>
          <FormattedMessage defaultMessage="Certificados emitidos." id="Issued Certificates Table / Caption" />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>
              <FormattedMessage defaultMessage="Nome" id="Issued Certificates Table / Name" />
            </TableHead>
            <TableHead>
              <FormattedMessage defaultMessage="Estado" id="Issued Certificates Table / State" />
            </TableHead>
            <TableHead>
              <FormattedMessage defaultMessage="Pessoa jurídica." id="Issued Certificates Table / Juridic Person" />
            </TableHead>
            <TableHead>
              <FormattedMessage defaultMessage="Tipo" id="Issued Certificates Table / Type" />
            </TableHead>
            <TableHead className="text-right">
              <FormattedMessage defaultMessage="Link" id="Issued Certificates Table / Link" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!loading && issuedData && issuedData.issuedCertificates.length !== 0
            ? issuedData.issuedCertificates.map((data) => (
                <TableRow>
                  <TableCell>{data.request.fullName}</TableCell>
                  <TableCell>{data.request.state}</TableCell>
                  <TableCell>{data.request.isLegalEntity ? 'Sim' : 'Não'}</TableCell>
                  <TableCell>{data.request.certificateType}</TableCell>
                  <TableCell className="flex justify-end">
                    <a href={`${data.document.link}`}>
                      <Link />
                    </a>
                  </TableCell>
                </TableRow>
              ))
            : null}
        </TableBody>
      </Table>
    </PageLayout>
  );
};
