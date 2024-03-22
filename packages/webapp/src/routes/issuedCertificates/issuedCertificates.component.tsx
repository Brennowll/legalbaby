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

import { requestQuery } from './issuedCertificates.graphql';
import { RequestQueryT } from './issuedCertificates.types';

export const IssuedCertificates = () => {
  const { data: requestData } = useQuery<RequestQueryT>(requestQuery);

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
              <FormattedMessage defaultMessage="CPF/CNPJ" id="Request Certificates Table / CPF/CNPJ" />
            </TableHead>
            <TableHead>
              <FormattedMessage defaultMessage="Estado" id="Request Certificates Table / State" />
            </TableHead>
            <TableHead>
              <FormattedMessage defaultMessage="Certidão" id="Request Certificates Table / Certificate" />
            </TableHead>
            <TableHead>
              <FormattedMessage defaultMessage="Link" id="Request Certificates Table / Link" />
            </TableHead>
            <TableHead className="text-right">
              <FormattedMessage defaultMessage="Status" id="Request Certificates Table / Status" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requestData
            ? requestData.requests.map((request) => (
                <>
                  {request.requestedCertificates.edges.map((requestedCertificate, index) => (
                    <TableRow key={index}>
                      <TableCell>{request.document.docId}</TableCell>
                      <TableCell>{request.document.docIdState}</TableCell>
                      <TableCell>{requestedCertificate.node.certificate.name}</TableCell>
                      <TableCell>
                        {requestedCertificate.node.url && requestedCertificate.node.url !== '' ? (
                          <a href={requestedCertificate.node.url} target="_blank" rel="noreferrer">
                            <Link className="h-4 w-4" />
                          </a>
                        ) : (
                          <Link className="h-4 w-4 opacity-40" />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {requestedCertificate.node.issued === true ? 'Sim' : 'Não'}
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ))
            : null}
        </TableBody>
      </Table>
    </PageLayout>
  );
};
