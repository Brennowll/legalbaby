import { Button } from '@sb/webapp-core/components/buttons';
import { Input } from '@sb/webapp-core/components/forms';
import { Small } from '@sb/webapp-core/components/typography';
import { cn } from '@sb/webapp-core/lib/utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { useChangePasswordForm } from './changePasswordForm.hooks';

export const ChangePasswordForm = () => {
  const intl = useIntl();

  const {
    form: {
      formState: { errors },
      register,
      getValues,
    },
    genericError,
    hasGenericErrorOnly,
    loading,
    handleChangePassword,
  } = useChangePasswordForm();

  return (
    <div className="w-full">
      <form
        noValidate
        onSubmit={handleChangePassword}
        className={cn('flex max-w-xs flex-row flex-wrap items-end justify-center gap-4 md:max-w-full md:justify-start')}
      >
        <div className="w-full">
          <Input
            {...register('oldPassword', {
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'Senha anterior é necessária',
                  id: 'Auth / Change password / Old password required',
                }),
              },
            })}
            type="password"
            label={intl.formatMessage({
              defaultMessage: 'Senha anterior',
              id: 'Auth / Change password / Old password placeholder',
            })}
            error={errors.oldPassword?.message}
          />
        </div>

        <div
          className={cn(
            { 'gap-8': !!errors.newPassword, 'gap-4': !errors.newPassword },
            'flex w-full flex-row flex-wrap'
          )}
        >
          <Input
            {...register('newPassword', {
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'Nova senha é necessária',
                  id: 'Auth / Change password / Password required',
                }),
              },
              minLength: {
                value: 8,
                message: intl.formatMessage({
                  defaultMessage: 'A senha é muito pequena. Ela precisa ter no mínimo 8 caracteres.',
                  id: 'Auth / Change password / Password too short',
                }),
              },
            })}
            type="password"
            label={intl.formatMessage({
              defaultMessage: 'Nova senha',
              id: 'Auth / Change password / New password label',
            })}
            placeholder={intl.formatMessage({
              defaultMessage: 'Mínimo de 8 caracteres',
              id: 'Auth / Change password / New password placeholder',
            })}
            error={errors.newPassword?.message}
          />

          <Input
            {...register('confirmNewPassword', {
              validate: {
                required: (value) =>
                  value?.length > 0 ||
                  intl.formatMessage({
                    defaultMessage: 'A confirmação da senha é necessária',
                    id: 'Auth / Change password / Confirm password required',
                  }),
                mustMatch: (value) =>
                  getValues().newPassword === value ||
                  intl.formatMessage({
                    defaultMessage: 'As senhas precisam ser iguais',
                    id: 'Auth / Change password / Password must match',
                  }),
              },
            })}
            type="password"
            label={intl.formatMessage({
              defaultMessage: 'Confirme sua senha',
              id: 'Auth / Change password / Confirm new password label',
            })}
            placeholder={intl.formatMessage({
              defaultMessage: 'Mínimo de 8 caracteres',
              id: 'Auth / Change password / Confirm new password placeholder',
            })}
            error={errors.confirmNewPassword?.message}
          />
        </div>

        {hasGenericErrorOnly ? <Small className="text-red-500">{genericError}</Small> : null}

        <Button disabled={loading} type="submit" className={cn({ 'mt-4': !!errors.newPassword }, 'w-full md:w-fit')}>
          <FormattedMessage defaultMessage="Atualize sua senha" id="Auth / Change password / Submit button" />
        </Button>
      </form>
    </div>
  );
};
