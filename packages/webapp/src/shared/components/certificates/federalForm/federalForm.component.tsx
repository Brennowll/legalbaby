import { Button } from '@sb/webapp-core/components/buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, Input } from '@sb/webapp-core/components/forms';
import { RotateCw } from 'lucide-react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCreateRequestCertificate } from '../requestCertificate.hooks';

export const FederalForm = () => {
  const intl = useIntl();

  const {
    form: {
      register,
      formState: { errors, isSubmitting },
    },
    form,
    handleSubmit,
  } = useCreateRequestCertificate('Federal');

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-y-5">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage defaultMessage="Nome completo" id="Request Certificate Form / Full Name" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    {...register('fullName', {
                      maxLength: {
                        value: 50,
                        message: intl.formatMessage({
                          defaultMessage: 'Nome completo é grande demais',
                          id: 'Request Certificate Form / Full Name Max Length Error',
                        }),
                      },
                      required: {
                        value: true,
                        message: intl.formatMessage({
                          defaultMessage: 'Nome completo é necessário',
                          id: 'Request Certificate Form / Full Name Required',
                        }),
                      },
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Nome completo',
                      id: 'Request Certificate Form / Full Name',
                    })}
                    error={errors.fullName?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="CPF"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage defaultMessage="CPF" id="Request Certificate Form / CPF" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    {...register('CPF', {
                      maxLength: {
                        value: 50,
                        message: intl.formatMessage({
                          defaultMessage: 'CPF é grande demais',
                          id: 'Request Certificate Form / CPF Max Length Error',
                        }),
                      },
                      required: {
                        value: true,
                        message: intl.formatMessage({
                          defaultMessage: 'CPF é necessário',
                          id: 'Request Certificate Form / CPF Required',
                        }),
                      },
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'CPF',
                      id: 'Request Certificate Form / CPF',
                    })}
                    error={errors.CPF?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage defaultMessage="Estado" id="Request Certificate Form / State" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    {...register('state', {
                      maxLength: {
                        value: 50,
                        message: intl.formatMessage({
                          defaultMessage: 'Estado é grande demais',
                          id: 'Request Certificate Form / State Max Length Error',
                        }),
                      },
                      required: {
                        value: true,
                        message: intl.formatMessage({
                          defaultMessage: 'Estado é necessário',
                          id: 'Request Certificate Form / State Required',
                        }),
                      },
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Estado',
                      id: 'Request Certificate Form / State',
                    })}
                    error={errors.state?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isLegalEntity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage defaultMessage="Tipo de pessoa" id="Request Certificate Form / Person Type" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    {...register('isLegalEntity', {
                      maxLength: {
                        value: 50,
                        message: intl.formatMessage({
                          defaultMessage: 'Tipo de pessoa é grande demais',
                          id: 'Request Certificate Form / Person Type Max Length Error',
                        }),
                      },
                      required: {
                        value: true,
                        message: intl.formatMessage({
                          defaultMessage: 'Tipo de pessoa é necessário',
                          id: 'Request Certificate Form / Person Type Required',
                        }),
                      },
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Tipo de pessoa',
                      id: 'Request Certificate Form / Person Type',
                    })}
                    error={errors.isLegalEntity?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="max-w-xs">
          {isSubmitting && <RotateCw />}
          <FormattedMessage defaultMessage="Pedir Certificado Federal" id="Request Certificate Form / Submit Button" />
        </Button>
      </form>
    </Form>
  );
};
