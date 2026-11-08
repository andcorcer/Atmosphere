// Import all dependencies
import styled from "@emotion/styled";

export const ErrorContainer = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${props => props.theme.spacing.md};
`;

export const ErrorText = styled.p`
    font-size: ${(props) => props.theme.typography.subHeadingFontSize};
    color: ${(props) => props.theme.colors.textSecondary};
`;

export const ErrorButton = styled.button`
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
`;