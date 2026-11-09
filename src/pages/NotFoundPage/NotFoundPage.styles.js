// Import all dependencies
import styled from "@emotion/styled";

export const NotFoundPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xl};
`;

export const NotFoundPageErrorCodeTitle = styled.h1`
  font-size: ${(props) => props.theme.typography.mainHeadingFontSize};
  color: ${(props) => props.theme.colors.error};
`;

export const NotFoundPageErrorMessageTitle = styled.h2`
  font-size: ${(props) => props.theme.typography.subHeadingFontSize};
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const NotFoundPageErrorText = styled.p`
  font-size: ${(props) => props.theme.typography.bodyFontSize};
  color: ${(props) => props.theme.colors.textSecondary};
`;

export const NotFoundPageButton = styled.button`
  padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
  font-size: ${(props) => props.theme.typography.baseFontSize};
  font-weight: ${(props) => props.theme.typography.buttonFontWeight};
  color: ${(props) => props.theme.colors.textPrimary};
  background-color: ${(props) => props.theme.colors.accent};
  border: ${(props) => `1px solid ${props.theme.colors.border}`};
  border-radius: ${(props) => props.theme.border.radius};
  cursor: pointer;
  box-shadow: ${(props) => props.theme.shadows.sm};
  transition:
    background-color ${(props) => props.theme.transition.speed},
    border-color ${(props) => props.theme.transition.speed},
    box-shadow ${(props) => props.theme.transition.speed};

  &:hover {
    background-color: ${(props) => props.theme.colors.accentHover};
    border-color: ${(props) => props.theme.colors.accentHover};
    box-shadow: ${(props) => props.theme.shadows.md};
  }

  &:active {
    background-color: ${(props) => props.theme.colors.highlight};
    border-color: ${(props) => props.theme.colors.highlight};
    box-shadow: ${(props) => props.theme.shadows.sm};
  }
`;
