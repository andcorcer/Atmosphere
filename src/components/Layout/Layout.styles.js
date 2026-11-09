// Import all dependencies
import styled from "@emotion/styled";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  min-height: 100vh;
`;

export const MainContainer = styled.main`
  padding: 0 ${(props) => props.theme.spacing.lg};
`;
