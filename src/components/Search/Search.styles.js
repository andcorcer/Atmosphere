// Import all dependencies
import styled from "@emotion/styled";

export const SearchForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

export const SearchInput = styled.input`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
  border: ${(props) => `1px solid ${props.theme.colors.border}`};
  border-radius: ${(props) => props.theme.border.radius};
  outline: none;
  font-size: ${(props) => props.theme.bodyFontSize};
  color: ${(props) => props.theme.colors.textSecondary};

  &:focus {
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

export const SearchButton = styled.button`
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md};
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

  &:disabled {
    opacity: 0.75;
    background-color: ${(props) => props.theme.colors.surface};
    border-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.textSecondary};
    cursor: not-allowed;
    box-shadow: none;
  }
`;
