import { Button } from '@sb/webapp-core/components/buttons';
import { Input } from '@sb/webapp-core/components/forms';
import { Small } from '@sb/webapp-core/components/typography';
import { cn } from '@sb/webapp-core/lib/utils';
import { FormattedMessage, useIntl } from 'react-intl';

import { FIRST_NAME_MAX_LENGTH, LAST_NAME_MAX_LENGTH } from './editProfileForm.constants';
import { useEditProfileForm } from './editProfileForm.hooks';

export const EditProfileForm = () => {
  const intl = useIntl();

  const {
    form: {
      formState: { errors },
      register,
    },
    genericError,
    hasGenericErrorOnly,
    loading,
    handleUpdate,
  } = useEditProfileForm();

  return (
    <div className="w-full">
      <form
        noValidate
        onSubmit={handleUpdate}
        className={cn('flex max-w-xs flex-row flex-wrap items-end justify-center gap-4 md:max-w-full md:justify-start')}
      >
        <div className="flex w-full flex-row flex-wrap gap-4">
          <Input
            {...register('firstName', {
              maxLength: {
                value: FIRST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'Primeiro nome é muito longo',
                  id: 'Auth / Update profile/ First name max length error',
                }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'Primeiro nome',
              id: 'Auth / Update profile / First name label',
            })}
            error={errors.firstName?.message}
          />

          <Input
            {...register('lastName', {
              maxLength: {
                value: LAST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'Último nome é muito longo',
                  id: 'Auth / Update profile/ Last name max length error',
                }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'Último nome',
              id: 'Auth / Update profile / Last name label',
            })}
            error={errors.lastName?.message}
          />
          <Input
            {...register('vat', {
              maxLength: {
                value: LAST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'O CPF ou CNPJ é muito longo',
                  id: 'Auth / Update profile/ vat max length error',
                }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'CPF ou RG',
              id: 'Auth / Update profile / vat label',
            })}
            error={errors.vat?.message}
          />
          <Input
            {...register('phoneNumber', {
              maxLength: {
                value: LAST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'O telefone é muito longo',
                  id: 'Auth / Update profile/ phoneNumber max length error',
                }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'Telefone',
              id: 'Auth / Update profile / phoneNumber label',
            })}
            error={errors.phoneNumber?.message}
          />
          <Input
            {...register('postalCode', {
              maxLength: {
                value: LAST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'O CEP é muito longo',
                  id: 'Auth / Update profile/ postalCode max length error',
                }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'CEP',
              id: 'Auth / Update profile / postalCode label',
            })}
            error={errors.postalCode?.message}
          />
          <Input
            {...register('street', {
              maxLength: {
                value: LAST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'A rua é muito longo',
                  id: 'Auth / Update profile/ street max length error',
                }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'Rua',
              id: 'Auth / Update profile / street label',
            })}
            error={errors.street?.message}
          />
          <Input
            {...register('number', {
              maxLength: {
                value: LAST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'O Número é muito longo',
                  id: 'Auth / Update profile/ number max length error',
                }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'Número',
              id: 'Auth / Update profile / number label',
            })}
            error={errors.number?.message}
          />
          <Input
            {...register('complement', {
              maxLength: {
                value: LAST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'O complemento é muito longo',
                  id: 'Auth / Update profile/ complement max length error',
                }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'Complemento',
              id: 'Auth / Update profile / complement label',
            })}
            error={errors.complement?.message}
          />
          <Input
            {...register('neighborhood', {
              maxLength: {
                value: LAST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'O bairro é muito longo',
                  id: 'Auth / Update profile/ neighborhood max length error',
                }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'Bairro',
              id: 'Auth / Update profile / neighborhood label',
            })}
            error={errors.neighborhood?.message}
          />
          <Input
            {...register('city', {
              maxLength: {
                value: LAST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'A cidade é muito longa',
                  id: 'Auth / Update profile/ city max length error',
                }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'Cidade',
              id: 'Auth / Update profile / city label',
            })}
            error={errors.city?.message}
          />
          <Input
            {...register('state', {
              maxLength: {
                value: LAST_NAME_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'O estado é muito longo',
                  id: 'Auth / Update profile/ state max length error',
                }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'Estado',
              id: 'Auth / Update profile / state label',
            })}
            error={errors.state?.message}
          />
        </div>

        {hasGenericErrorOnly ? <Small className="text-red-500">{genericError}</Small> : null}

        <Button type="submit" disabled={loading} className="w-full md:w-fit">
          <FormattedMessage defaultMessage="Atualizar dados pessoais" id="Auth / Update profile/ Submit button" />
        </Button>
      </form>
    </div>
  );
};
