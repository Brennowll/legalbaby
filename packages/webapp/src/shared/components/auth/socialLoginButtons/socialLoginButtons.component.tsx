import { useOAuthLogin } from '@sb/webapp-api-client/api/auth';
import { Button, ButtonVariant } from '@sb/webapp-core/components/buttons';
import { HTMLAttributes } from 'react';
import { FormattedMessage } from 'react-intl';

import { GoogleIcon } from '../../../../images/icons';
import { OAuthProvider } from '../../../../modules/auth/auth.types';

export enum SignupButtonsVariant {
  LOGIN,
  SIGNUP,
}

export type SocialLoginButtonsProps = HTMLAttributes<HTMLDivElement> & {
  variant: SignupButtonsVariant;
};

export const SocialLoginButtons = ({ variant, ...props }: SocialLoginButtonsProps) => {
  const oAuthLogin = useOAuthLogin();
  const handleGoogleLogin = () => oAuthLogin(OAuthProvider.Google);

  return (
    <div className="flex w-full flex-col gap-4" {...props}>
      <Button
        className="flex gap-1"
        icon={<GoogleIcon />}
        variant={ButtonVariant.SECONDARY}
        onClick={handleGoogleLogin}
      >
        {variant === SignupButtonsVariant.LOGIN ? (
          <FormattedMessage defaultMessage="Log in with Google" id="Auth / Login / Google login button" />
        ) : (
          <FormattedMessage defaultMessage="Sign up with Google" id="Auth / Signup / Google signup button" />
        )}
      </Button>
    </div>
  );
};
