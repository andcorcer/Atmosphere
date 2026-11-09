// Import all dependencies
import styled from "@emotion/styled";

export const DetailsCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.lg};
  border: ${(props) => `1px solid ${props.theme.colors.border}`};
  border-radius: ${(props) => props.theme.border.radius};
  background-color: ${(props) => props.theme.colors.surface};
  box-shadow: ${(props) => props.theme.shadows.sm};
  cursor: pointer;
  transition:
    background-color ${(props) => props.theme.transition.speed},
    box-shadow ${(props) => props.theme.transition.speed};

  &:hover {
    background-color: ${(props) => props.theme.colors.surfaceHover};
    box-shadow: ${(props) => props.theme.shadows.md};
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DetailsCardTitle = styled.h2`
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: ${(props) => props.theme.typography.subHeadingFontSize};
`;

export const StarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.spacing.sm};
  border-radius: 50%;
  transition:
    color ${(props) => props.theme.transition.speed},
    background-color ${(props) => props.theme.transition.speed};

  &:hover {
    background-color: ${(props) => props.theme.colors.background};
    color: ${(props) => props.theme.colors.highlight};
  }

  ${({ $active, theme }) =>
    $active &&
    `
      background-color: ${theme.colors.background};
      color: ${theme.colors.highlight};

      svg {
        fill: ${theme.colors.highlight};
      }
    `}
`;

export const CoordinatesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: ${(props) => props.theme.spacing.md};
`;

export const HourlyWeatherContainer = styled.div`
  display: grid;
  grid-template-columns: 100px repeat(2, minmax(200px, 1fr));
  gap: ${(props) => props.theme.spacing.sm};

  @media (max-width: 768px) {
    grid-template-columns: 100px 1fr;
  }
`;

export const TimeLabel = styled.span`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.textPrimary};
  font-size: ${(props) => props.theme.typography.bodyFontSize};

  ${({ $active, theme }) =>
    $active &&
    `
      font-weight: ${theme.typography.headingFontWeight};
      color: ${theme.colors.highlight};
    `}

  @media (max-width: 768px) {
    grid-row: span 2;
  }
`;

export const WeatherCodeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

export const IconContainer = styled.div`
  color: ${(props) => props.theme.colors.textPrimary};
`;

export const TemperatureContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};
`;

export const MetadataText = styled.p`
  color: ${(props) => props.theme.colors.textSecondary};
  font-size: ${(props) => props.theme.typography.bodyFontSize};
`;
