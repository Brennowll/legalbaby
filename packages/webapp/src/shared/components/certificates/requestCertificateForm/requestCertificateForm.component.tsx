import { Button } from '@sb/webapp-core/components/buttons';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@sb/webapp-core/components/collapsible';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@sb/webapp-core/components/forms';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@sb/webapp-core/components/select';
import { Separator } from '@sb/webapp-core/components/separator';
import { ToggleGroup, ToggleGroupItem } from '@sb/webapp-core/components/toggleGroup';
import { ChevronRight, RotateCw } from 'lucide-react';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import {
  CITY,
  CITY_MAX_LENGTH,
  FATHER_NAME,
  MARITAL_STATE,
  MOTHER_NAME,
  MOTHER_NAME_MAX_LENGTH,
  RG,
  RG_MAX_LENGTH,
  SSP_RG,
  SSP_RG_MAX_LENGTH,
  STATE_OPTIONS,
  VAT_MAX_LENGTH,
} from './requestCertificateForm.constants';
import { useCreateRequestCertificate } from './requestCertificateForm.hooks';

interface CertificateCollapsibleProps {
  categoryName: string;
  children: React.ReactNode;
  labelClass: string;
  contentClass: string;
}

const CertificateCollapsible: React.FC<CertificateCollapsibleProps> = ({
  categoryName,
  labelClass,
  contentClass,
  children,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center">
          <Button type="button" variant="ghost" className="h-6 p-1">
            <ChevronRight className={`h-4 w-4 transition-all ${isOpen ? 'rotate-90' : ''}`} />
          </Button>
          <h3 className={`ml-2 group-hover:text-opacity-70 ${labelClass}`}>{categoryName}</h3>
        </CollapsibleTrigger>
        <CollapsibleContent className={`flex flex-col ${contentClass}`}>{children}</CollapsibleContent>
      </Collapsible>
    </>
  );
};

export const RequestCertificateForm = () => {
  const intl = useIntl();

  const {
    form: {
      register,
      formState: { errors, isSubmitting },
    },
    form,
    handleSubmit,
    validVat,
    isLegalEntity,
    filteredCertificates,
    certificateCategories,
  } = useCreateRequestCertificate();

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-y-5">
          <Input
            {...register('vat', {
              maxLength: {
                value: VAT_MAX_LENGTH,
                message: intl.formatMessage({
                  defaultMessage: 'O CPF ou CNPJ é muito longo',
                  id: 'Auth / Update profile/ vat max length error',
                }),
              },
              required: {
                value: true,
                message: intl.formatMessage({
                  defaultMessage: 'O CPF ou CNPJ é necessário',
                  id: 'Auth / Update profile/ vat required',
                }),
              },
              validate: {
                isValidFormat: (value) =>
                  /^(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}|\d{3}\.\d{3}\.\d{3}-\d{2})$/.test(value) ||
                  intl.formatMessage({
                    defaultMessage: 'O CPF ou CNPJ é inválido',
                    id: 'Auth / Update profile/ vat invalid error',
                  }),
              },
            })}
            label={intl.formatMessage({
              defaultMessage: 'CPF ou RG',
              id: 'Auth / Update profile / vat label',
            })}
            error={errors.vat?.message}
            className="mt-[0.35rem]"
          />
          <FormField
            control={form.control}
            name="state"
            rules={{
              validate: (value) => {
                if (!value || value === '') {
                  return 'É necessário selecionar um estado';
                }
              },
            }}
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
                {form.watch('state') === '' ? (
                  <FormDescription className="pt-1 text-xs">Selecione "NA" para nacional</FormDescription>
                ) : null}
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          {validVat && !isLegalEntity ? (
            <>
              {RG.includes(form.watch('state')) ? (
                <Input
                  {...register('rg', {
                    required: {
                      value: true,
                      message: intl.formatMessage({
                        defaultMessage: 'RG é obrigatório',
                        id: 'Request Certificate Form/ RG required error',
                      }),
                    },
                    maxLength: {
                      value: RG_MAX_LENGTH,
                      message: intl.formatMessage({
                        defaultMessage: 'O RG é muito longo',
                        id: 'Request Certificate Form/ RG max length error',
                      }),
                    },
                  })}
                  label={intl.formatMessage({
                    defaultMessage: 'RG',
                    id: 'Request Certificate Form / RG label',
                  })}
                  error={errors.rg?.message}
                />
              ) : null}
              {SSP_RG.includes(form.watch('state')) ? (
                <Input
                  {...register('sspRg', {
                    required: {
                      value: true,
                      message: intl.formatMessage({
                        defaultMessage: 'SSP RG é obrigatório',
                        id: 'Request Certificate Form/ SSP RG required error',
                      }),
                    },
                    maxLength: {
                      value: SSP_RG_MAX_LENGTH,
                      message: intl.formatMessage({
                        defaultMessage: 'O SSP_RG é muito longo',
                        id: 'Request Certificate Form/ SSP_RG max length error',
                      }),
                    },
                  })}
                  label={intl.formatMessage({
                    defaultMessage: 'SSP RG',
                    id: 'Request Certificate Form / SSP RG label',
                  })}
                  error={errors.sspRg?.message}
                />
              ) : null}
              {MOTHER_NAME.includes(form.watch('state')) ? (
                <Input
                  {...register('motherName', {
                    required: {
                      value: true,
                      message: intl.formatMessage({
                        defaultMessage: 'Nome da mãe é obrigatório',
                        id: 'Request Certificate Form/ mother name required error',
                      }),
                    },
                    maxLength: {
                      value: MOTHER_NAME_MAX_LENGTH,
                      message: intl.formatMessage({
                        defaultMessage: 'O Nome da mãe é muito longo',
                        id: 'Request Certificate Form/ mother name max length error',
                      }),
                    },
                  })}
                  label={intl.formatMessage({
                    defaultMessage: 'Nome da mãe',
                    id: 'Request Certificate Form / mother name label',
                  })}
                  error={errors.motherName?.message}
                />
              ) : null}
              {FATHER_NAME.includes(form.watch('state')) ? (
                <Input
                  {...register('fatherName', {
                    required: {
                      value: true,
                      message: intl.formatMessage({
                        defaultMessage: 'Nome do pai é obrigatório',
                        id: 'Request Certificate Form/ father name required error',
                      }),
                    },
                    maxLength: {
                      value: MOTHER_NAME_MAX_LENGTH,
                      message: intl.formatMessage({
                        defaultMessage: 'O Nome do pai é muito longo',
                        id: 'Request Certificate Form/ father name max length error',
                      }),
                    },
                  })}
                  label={intl.formatMessage({
                    defaultMessage: 'Nome do pai',
                    id: 'Request Certificate Form / father name label',
                  })}
                  error={errors.fatherName?.message}
                />
              ) : null}
              {MARITAL_STATE.includes(form.watch('state')) ? (
                <Input
                  {...register('maritalState', {
                    required: {
                      value: true,
                      message: intl.formatMessage({
                        defaultMessage: 'Estado civil é obrigatório',
                        id: 'Request Certificate Form/ marital state required error',
                      }),
                    },
                    maxLength: {
                      value: MOTHER_NAME_MAX_LENGTH,
                      message: intl.formatMessage({
                        defaultMessage: 'O estado civil é muito longo',
                        id: 'Request Certificate Form/ marital state max length error',
                      }),
                    },
                  })}
                  label={intl.formatMessage({
                    defaultMessage: 'Estado civil',
                    id: 'Request Certificate Form / marital state label',
                  })}
                  error={errors.maritalState?.message}
                />
              ) : null}
              {CITY.includes(form.watch('state')) ? (
                <Input
                  {...register('city', {
                    required: {
                      value: true,
                      message: intl.formatMessage({
                        defaultMessage: 'Cidade é obrigatória',
                        id: 'Request Certificate Form/ city required error',
                      }),
                    },
                    maxLength: {
                      value: CITY_MAX_LENGTH,
                      message: intl.formatMessage({
                        defaultMessage: 'A cidade é muito longa',
                        id: 'Request Certificate Form/ city max length error',
                      }),
                    },
                  })}
                  label={intl.formatMessage({
                    defaultMessage: 'Cidade',
                    id: 'Request Certificate Form / city label',
                  })}
                  error={errors.city?.message}
                />
              ) : null}
            </>
          ) : null}
          {validVat && form.watch('state') !== '' && form.watch('state') ? (
            <>
              <Separator className="col-span-2 my-5" />
              <FormField
                control={form.control}
                name="requestedCertificatesSlugs"
                rules={{
                  validate: (value) => {
                    if (!value || value.length === 0) {
                      return 'É necessário selecionar pelo menos 1 certidão';
                    }
                  },
                }}
                render={({ field }) => (
                  <>
                    <h3 className="col-span-2 mb-5">Escolha as certidões a serem emitidas</h3>
                    <ToggleGroup
                      onValueChange={field.onChange}
                      type="multiple"
                      className="flex-col items-start border-l-2 pl-2"
                    >
                      {certificateCategories?.map((category) => (
                        <CertificateCollapsible categoryName={category.name} labelClass="text-lg" contentClass="pt-1">
                          {category.subCategories.edges.map((subcategorie) => (
                            <div className="ml-5 flex flex-col">
                              <CertificateCollapsible
                                categoryName={subcategorie.node.name}
                                labelClass="text-sm"
                                contentClass=""
                              >
                                {filteredCertificates
                                  ?.filter(
                                    (certificate) =>
                                      certificate.category.name === category.name &&
                                      certificate.subCategory !== null &&
                                      certificate.subCategory.name === subcategorie.node.name
                                  )
                                  .map((certificate) => (
                                    <ToggleGroupItem
                                      value={certificate.slug}
                                      className="ml-7 py-0 text-xs hover:bg-transparent data-[state=on]:bg-transparent"
                                    >
                                      <div
                                        className={`mr-2 flex h-3 w-3 items-center justify-center rounded-full border-2 border-primary ${
                                          field.value && field.value.includes(certificate.slug) && 'bg-primary'
                                        }`}
                                      />
                                      {`${certificate.name} - ${certificate.creditsNeeded} Créditos`}
                                    </ToggleGroupItem>
                                  ))}
                              </CertificateCollapsible>
                            </div>
                          ))}
                        </CertificateCollapsible>
                      ))}
                    </ToggleGroup>
                    <FormMessage className="col-span-2" />
                  </>
                )}
              ></FormField>
            </>
          ) : null}
        </div>
        <Button type="submit" disabled={isSubmitting} className="max-w-xs">
          {isSubmitting && <RotateCw className="mr-4 animate-spin" />}
          <FormattedMessage defaultMessage="Fazer pedido" id="Request Certificate Form / Submit Button" />
        </Button>
      </form>
    </Form>
  );
};
