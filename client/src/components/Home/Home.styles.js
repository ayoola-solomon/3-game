import styled from "styled-components";
import { Button, Text } from "rebass/styled-components";

import { device, fontFamily, fontWeight } from "utils/styles";

export const HomeWrapper = styled.div`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
    cursor: not-allowed;
`}
`;

export const HomeInnerWraper = styled.div`
  width: 90%;
  margin: auto;
  margin-top: 64px;

  @media ${device.mobileL} {
    width: 70%;
  }
  @media ${device.tablet} {
    width: 50%;
  }
`;

export const ExistingGames = styled.div`
  padding: 16px 0;
`;

export const ExistingGamesItem = styled.div`
  margin: 16px 0;
`;

export const StyledOR = styled(Text)`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.bold};
  font-size: 2rem;
  padding: 16px 0;
  text-align: center;
`;

export const Title = styled(Text)`
  font-family: ${fontFamily.primary};
  font-weight: ${fontWeight.bold};
  font-size: 2.5rem;
`;

export const ErrorMessage = styled(Text)`
  color: red;
  font-size: 1rem;
`;
