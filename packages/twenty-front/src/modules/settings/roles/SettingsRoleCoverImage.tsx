import styled from '@emotion/styled';
import { IconEye } from 'twenty-ui';

import { FloatingButton } from '@/ui/input/button/components/FloatingButton';
import { Card } from '@/ui/layout/card/components/Card';

import DarkCoverImage from './assets/cover-dark.png';
import LightCoverImage from './assets/cover-light.png';

const StyledCoverImageContainer = styled(Card)`
  align-items: center;
  background-image: ${({ theme }) =>
    theme.name === 'light'
      ? `url('${LightCoverImage.toString()}')`
      : `url('${DarkCoverImage.toString()}')`};
  background-size: cover;
  border-radius: ${({ theme }) => theme.border.radius.md};
  box-sizing: border-box;
  display: flex;
  height: 153px;
  justify-content: center;
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
`;

const StyledButtonContainer = styled.div`
  padding-top: ${({ theme }) => theme.spacing(5)};
`;

export const SettingsRoleCoverImage = () => {
  return (
    <StyledCoverImageContainer>
      <StyledButtonContainer>
        <FloatingButton
          Icon={IconEye}
          title="Visualize"
          size="small"
          to="/settings/members-roles/overview"
        />
      </StyledButtonContainer>
    </StyledCoverImageContainer>
  );
};
