import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { Logo } from '@/auth/components/Logo';
import { Title } from '@/auth/components/Title';
import { SignInUpForm } from '@/auth/sign-in-up/components/SignInUpForm';
import {
  SignInUpMode,
  SignInUpStep,
  useSignInUp,
} from '@/auth/sign-in-up/hooks/useSignInUp';
import { useSignInUpForm } from '@/auth/sign-in-up/hooks/useSignInUpForm';
import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { AnimatedEaseIn } from '@/ui/utilities/animation/components/AnimatedEaseIn';
import { isDefined } from '~/utils/isDefined';

import { useTranslation } from 'react-i18next';

export const SignInUp = () => {
  const { t } = useTranslation();

  const { form } = useSignInUpForm();
  const currentWorkspace = useRecoilValue(currentWorkspaceState);

  const { signInUpStep, signInUpMode } = useSignInUp(form);

  const title = useMemo(() => {
    if (
      signInUpStep === SignInUpStep.Init ||
      signInUpStep === SignInUpStep.Email
    ) {
      return t('welcomeMessage');
    }
    return signInUpMode === SignInUpMode.SignIn
      ? t('signInMessage')
      : t('signUpMessage');
  }, [signInUpMode, signInUpStep]);

  if (isDefined(currentWorkspace)) {
    return <></>;
  }

  return (
    <>
      <AnimatedEaseIn>
        <Logo />
      </AnimatedEaseIn>
      <Title animate>{title}</Title>
      <SignInUpForm />
    </>
  );
};
