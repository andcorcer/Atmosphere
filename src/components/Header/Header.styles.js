// Import all dependencies
import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  gap: ${(props) => props.theme.spacing.lg};
  flex-wrap: wrap;
  align-items: center;
  background-color: ${(props) => props.theme.colors.surface};
  border-bottom: ${(props) => `1px solid ${props.theme.colors.border}`};
  padding: ${(props) => props.theme.spacing.md}
    ${(props) => props.theme.spacing.lg};

    @media (max-width: 550px) {
      flex-direction: column;
    }
`;

export const HeaderTitle = styled.h1`
  font-size: ${(props) => props.theme.typography.mainHeadingFontSize};
  font-weight: ${(props) => props.theme.typography.headingFontWeight};
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const HeaderButtonsContainer = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.sm};
  border: ${(props) => `1px solid ${props.theme.colors.border}`};
  border-radius: ${(props) => props.theme.border.radius};
  color: ${(props) => props.theme.colors.textPrimary};
  background-color: ${(props) => props.theme.colors.surface};
`;

export const HeaderButton = styled.button`
  background-color: transparent;
  cursor: pointer;
  border: none;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border-radius: ${(props) => props.theme.border.radius};
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition:
    background-color ${(props) => props.theme.transition.speed},
    box-shadow ${(props) => props.theme.transition.speed};

  &:hover {
    background-color: ${(props) => props.theme.colors.accentHover};
    box-shadow: ${(props) => props.theme.shadows.md};
  }

  ${({ $active, theme }) =>
    $active &&
    `
        background-color: ${theme.colors.accent};
    `}
`;
