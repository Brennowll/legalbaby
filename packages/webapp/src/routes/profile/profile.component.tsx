import { useQuery } from '@apollo/client';
import { PageHeadline } from '@sb/webapp-core/components/pageHeadline';
import { PageLayout } from '@sb/webapp-core/components/pageLayout';
import { Paragraph } from '@sb/webapp-core/components/typography';
import { FormattedMessage } from 'react-intl';

import { AvatarForm } from '../../shared/components/auth/avatarForm';
import { ChangePasswordForm } from '../../shared/components/auth/changePasswordForm';
import { EditProfileForm } from '../../shared/components/auth/editProfileForm';
import { useAuth } from '../../shared/hooks';
import { UserProfileQuery } from './profile.graphql';
import { UserProfile } from './profile.types';

export const Profile = () => {
  const { currentUser } = useAuth();
  const { data } = useQuery<UserProfile>(UserProfileQuery);

  return (
    <PageLayout>
      <PageHeadline
        header={<FormattedMessage defaultMessage="Perfil do usuário" id="Auth / Profile details / Header" />}
        subheader={
          <FormattedMessage
            defaultMessage="Aqui você encontra mais informações sobre sua conta, além de poder editá-las"
            id="Auth / Profile details / Label"
          />
        }
      />

      <div className="flex flex-row gap-3">
        <AvatarForm />

        <div>
          <Paragraph>
            <FormattedMessage
              defaultMessage="Nome: {firstName} {lastName}"
              id="Auth / Profile details / Name label"
              values={{ firstName: currentUser?.firstName, lastName: currentUser?.lastName }}
            />
          </Paragraph>

          <Paragraph firstChildMargin={false}>
            <FormattedMessage
              defaultMessage="Email: {email}"
              id="Auth / Profile details / Email label"
              values={{ email: currentUser?.email }}
            />
          </Paragraph>

          <Paragraph firstChildMargin={false}>
            <FormattedMessage
              defaultMessage="Créditos: {credits}"
              id="Auth / Profile details / Credits label"
              values={{ credits: data?.currentUser.certificateCredits }}
            />
          </Paragraph>
        </div>
      </div>

      <div className="flex w-full flex-col gap-y-6">
        <PageHeadline
          header={
            <FormattedMessage
              defaultMessage="Informações pessoais"
              id="Auth / Profile details / Personal data header"
            />
          }
          subheader={
            <FormattedMessage
              defaultMessage="Atualize os detalhes da sua conta"
              id="Auth / Profile details / Personal data label"
            />
          }
        />
        <EditProfileForm />
      </div>

      <div className="flex w-full flex-col gap-y-6">
        <PageHeadline
          header={
            <FormattedMessage defaultMessage="Mude sua senha" id="Auth / Profile details / Change password header" />
          }
          subheader={
            <FormattedMessage defaultMessage="Atualize sua senha" id="Auth / Profile details / Change password label" />
          }
        />
        <ChangePasswordForm />
      </div>
    </PageLayout>
  );
};
