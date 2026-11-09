// Import all dependencies
import styled from "@emotion/styled";

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xl};
  padding: ${(props) => props.theme.spacing.xl};
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => props.theme.spacing.xl};
`;
