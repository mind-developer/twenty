import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { IconCopy, IconLink } from 'twenty-ui';

import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { Button } from '@/ui/input/button/components/Button';
import { TextInput } from '@/ui/input/components/TextInput';
import { useTranslation } from 'react-i18next';

const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const StyledLinkContainer = styled.div`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

type WorkspaceInviteLinkProps = {
  inviteLink: string;
};

export const WorkspaceInviteLink = ({
  inviteLink,
}: WorkspaceInviteLinkProps) => {
  const theme = useTheme();

  const { enqueueSnackBar } = useSnackBar();
  const { t } = useTranslation();
  return (
    <StyledContainer data-chromatic="ignore">
      <StyledLinkContainer>
        <TextInput value={inviteLink} disabled fullWidth />
      </StyledLinkContainer>
      <Button
        Icon={IconLink}
        variant="primary"
        accent="blue"
        title={t('copyLink')}
        onClick={() => {
          enqueueSnackBar(t('linkCopiedToClipboard'), {
            variant: SnackBarVariant.Success,
            icon: <IconCopy size={theme.icon.size.md} />,
            duration: 2000,
          });
          navigator.clipboard.writeText(inviteLink);
        }}
      />
    </StyledContainer>
  );
};
