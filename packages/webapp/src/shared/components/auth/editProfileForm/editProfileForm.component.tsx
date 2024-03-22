import { Button } from '@sb/webapp-core/components/buttons';
import { Form, FormDescription, FormField, FormItem, FormLabel, Input } from '@sb/webapp-core/components/forms';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@sb/webapp-core/components/select';
import { Small } from '@sb/webapp-core/components/typography';
import { cn } from '@sb/webapp-core/lib/utils';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  CITY_MAX_LENGTH,
  COMPLEMENT_MAX_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  LAST_NAME_MAX_LENGTH,
  NEIGHBORHOOD_MAX_LENGTH,
  NUMBER_MAX_LENGTH,
  PHONE_NUMBER_MAX_LENGTH,
  POSTAL_CODE_MAX_LENGTH,
  STATE_OPTIONS,
  STREET_MAX_LENGTH,
  VAT_MAX_LENGTH,
} from './editProfileForm.constants';
import { useEditProfileForm } from './editProfileForm.hooks';

export const EditProfileForm = () => {
  const intl = useIntl();

  const {
    form: {
      formState: { errors },
      register,
    },
    form,
    genericError,
    hasGenericErrorOnly,
    loading,
    handleUpdate,
  } = useEditProfileForm();

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          noValidate
          onSubmit={handleUpdate}
          className={cn(
            'flex max-w-xs flex-row flex-wrap items-end justify-center gap-4 md:max-w-full md:justify-start'
          )}
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
                  value: VAT_MAX_LENGTH,
                  message: intl.formatMessage({
                    defaultMessage: 'O CPF ou CNPJ é muito longo',
                    id: 'Auth / Update profile/ vat max length error',
                  }),
                },
                validate: {
                  isValidFormat: (value) =>
                    /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(value) ||
                    intl.formatMessage({
                      defaultMessage: 'O CPF ou CNPJ é inválido (XXXXX-XXX, ou XX.XXX.XXX/XXXX-XX)',
                      id: 'Auth / Update profile/ vat invalid error',
                    }),
                },
              })}
              label={intl.formatMessage({
                defaultMessage: 'CPF ou CNPJ',
                id: 'Auth / Update profile / vat label',
              })}
              error={errors.vat?.message}
            />

            <Input
              {...register('phoneNumber', {
                maxLength: {
                  value: PHONE_NUMBER_MAX_LENGTH,
                  message: intl.formatMessage({
                    defaultMessage: 'O telefone é muito longo',
                    id: 'Auth / Update profile/ phoneNumber max length error',
                  }),
                },
                validate: {
                  isValidFormat: (value) =>
                    /^(\(\d{2}\)\s?)?(\d{4,5}-?\d{4})$/.test(value) ||
                    intl.formatMessage({
                      defaultMessage: 'O telefone é inválido (00912345678, ou (00) 91234-5678',
                      id: 'Auth / Update profile/ phoneNumber invalid error',
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
                  value: POSTAL_CODE_MAX_LENGTH,
                  message: intl.formatMessage({
                    defaultMessage: 'O CEP é muito longo',
                    id: 'Auth / Update profile/ postalCode max length error',
                  }),
                },
                validate: {
                  isValidFormat: (value) =>
                    /^\d{5}-\d{3}$/.test(value) ||
                    intl.formatMessage({
                      defaultMessage: 'O CEP é inválido (XXXXX-XXX)',
                      id: 'Auth / Update profile/ postalCode invalid error',
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
                  value: STREET_MAX_LENGTH,
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
                  value: NUMBER_MAX_LENGTH,
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
                  value: COMPLEMENT_MAX_LENGTH,
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
                  value: NEIGHBORHOOD_MAX_LENGTH,
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
                  value: CITY_MAX_LENGTH,
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

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="text-xs">Estado</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className=" w-80 py-5">
                      <SelectValue placeholder="Escolha um estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATE_OPTIONS.map((state) => (
                        <SelectItem value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription className="pt-1 text-xs">Selecione "NA" para nacional</FormDescription>
                </FormItem>
              )}
            />
          </div>

          {hasGenericErrorOnly ? <Small className="text-red-500">{genericError}</Small> : null}

          <Button type="submit" disabled={loading} className="w-full md:w-fit">
            <FormattedMessage defaultMessage="Atualizar dados pessoais" id="Auth / Update profile/ Submit button" />
          </Button>
        </form>
      </Form>
    </div>
  );
};
