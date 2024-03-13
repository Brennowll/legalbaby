import { StripePaymentIntentType } from '@sb/webapp-api-client';
import { Button } from '@sb/webapp-core/components/buttons';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@sb/webapp-core/components/forms';
import { RadioGroup, RadioGroupItem } from '@sb/webapp-core/components/forms/radioGroup';
import { reportError } from '@sb/webapp-core/utils/reportError';
import { FormattedMessage, useIntl } from 'react-intl';

import { TestProduct } from '../../../types';
import { useStripePaymentForm } from '../stripePayment.hooks';
import { StripePaymentMethodSelector } from '../stripePaymentMethodSelector';

export type StripePaymentFormProps = {
  onSuccess: (paymentIntent: StripePaymentIntentType) => void;
};

export const StripePaymentForm = ({ onSuccess }: StripePaymentFormProps) => {
  const intl = useIntl();
  const {
    onSubmit,
    apiFormControls: { form, hasGenericErrorOnly, genericError },
    loading,
  } = useStripePaymentForm(onSuccess);

  const amountValue = form.watch('product');

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={(e) => {
          onSubmit(e).catch(reportError);
        }}
        className="space-y-8"
      >
        <FormField
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <FormattedMessage defaultMessage="Escolha uma opção" id="Stripe / payment form / Choose an option" />
              </FormLabel>
              <FormDescription>
                <FormattedMessage
                  defaultMessage="Selecione a quantidade que queira adquirir"
                  id="Stripe / payment form / product description"
                />
              </FormDescription>

              <FormMessage />

              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-3 gap-8 pt-2"
              >
                {Object.values(TestProduct).map((amount) => (
                  <FormItem key={amount}>
                    <FormLabel className="[&:has([data-state=checked])>div]:border-primary">
                      <FormControl>
                        <RadioGroupItem value={amount} className="sr-only" />
                      </FormControl>
                      <div className="flex justify-center w-56 items-center rounded-md border-2 border-muted px-9 py-4 cursor-pointer font-semibold text-base">
                        {amount}
                      </div>
                    </FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormItem>
          )}
          name="product"
          rules={{
            required: {
              value: true,
              message: intl.formatMessage({
                defaultMessage: 'Selecione a quantidade',
                id: 'Stripe / Payment / Select quantity',
              }),
            },
          }}
        />

        <div className="mt-3">
          <StripePaymentMethodSelector control={form.control} />
        </div>

        {hasGenericErrorOnly && <div className="text-red-500">{genericError}</div>}

        <Button type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting || loading}>
          <FormattedMessage
            values={{ amount: amountValue ? `${amountValue} USD` : '' }}
            defaultMessage="Pay {amount}"
            id="Stripe / payment form / pay CTA"
          />
        </Button>
      </form>
    </Form>
  );
};
