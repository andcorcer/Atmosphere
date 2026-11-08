// Import all dependencies
import styled from "@emotion/styled";

export const LoadingContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
`;

export const LoadingMessage = styled.p`
  font-size: ${(props) => props.theme.typography.subHeadingFontSize};
  color: ${(props) => props.theme.colors.textSecondary};
`;
