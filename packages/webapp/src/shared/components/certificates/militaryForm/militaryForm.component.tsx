import { Button } from '@sb/webapp-core/components/buttons';
import { Form, FormControl, FormField, FormItem, FormLabel, Input } from '@sb/webapp-core/components/forms';
import { Loader } from 'lucide-react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCreateMilitaryCertificate } from './militaryForm.hooks';

export const MilitaryForm = () => {
  const intl = useIntl();

  const {
    form: {
      register,
      formState: { errors, isSubmitting },
    },
    form,
    handleSubmit,
  } = useCreateMilitaryCertificate();

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
                  <FormattedMessage defaultMessage="Nome completo" id="Military Form / Full Name" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    {...register('fullName', {
                      maxLength: {
                        value: 50,
                        message: intl.formatMessage({
                          defaultMessage: 'Nome completo é grande demais',
                          id: 'Military Form / Full Name Max Length Error',
                        }),
                      },
                      required: {
                        value: true,
                        message: intl.formatMessage({
                          defaultMessage: 'Nome completo é necessário',
                          id: 'Military Form / Full Name Required',
                        }),
                      },
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Nome completo',
                      id: 'Military Form / Full Name',
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
                  <FormattedMessage defaultMessage="CPF" id="Military Form / CPF" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    {...register('CPF', {
                      maxLength: {
                        value: 50,
                        message: intl.formatMessage({
                          defaultMessage: 'CPF é grande demais',
                          id: 'Military Form / CPF Max Length Error',
                        }),
                      },
                      required: {
                        value: true,
                        message: intl.formatMessage({
                          defaultMessage: 'CPF é necessário',
                          id: 'Military Form / CPF Required',
                        }),
                      },
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'CPF',
                      id: 'Military Form / CPF',
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
                  <FormattedMessage defaultMessage="Estado" id="Military Form / State" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    {...register('state', {
                      maxLength: {
                        value: 50,
                        message: intl.formatMessage({
                          defaultMessage: 'Estado é grande demais',
                          id: 'Military Form / State Max Length Error',
                        }),
                      },
                      required: {
                        value: true,
                        message: intl.formatMessage({
                          defaultMessage: 'Estado é necessário',
                          id: 'Military Form / State Required',
                        }),
                      },
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Estado',
                      id: 'Military Form / State',
                    })}
                    error={errors.state?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <FormattedMessage defaultMessage="Tipo de pessoa" id="Military Form / Person Type" />
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    {...register('personType', {
                      maxLength: {
                        value: 50,
                        message: intl.formatMessage({
                          defaultMessage: 'Tipo de pessoa é grande demais',
                          id: 'Military Form / Person Type Max Length Error',
                        }),
                      },
                      required: {
                        value: true,
                        message: intl.formatMessage({
                          defaultMessage: 'Tipo de pessoa é necessário',
                          id: 'Military Form / Person Type Required',
                        }),
                      },
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Tipo de pessoa',
                      id: 'Military Form / Person Type',
                    })}
                    error={errors.personType?.message}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="max-w-xs">
          {isSubmitting && <Loader />}
          <FormattedMessage defaultMessage="Pedir Certificado Militar" id="Military Form / Submit Button" />
        </Button>
      </form>
    </Form>
  );
};
