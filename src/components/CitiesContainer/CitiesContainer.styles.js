// Import all dependencies
import styled from "@emotion/styled";

export const CitiesContainerWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, 1fr);
    gap: ${(props) => props.theme.spacing.md};
    width: 100%;
    padding: ${(props) => props.theme.spacing.lg};
    background-color: ${(props) => props.theme.colors.surface};
    border-radius: ${(props) => props.theme.border.radius};
    border: ${(props) => `1px solid ${props.theme.colors.border}`};
    box-shadow: ${(props) => props.theme.shadows.sm};

    @media (max-width: 400px) {
        padding: ${(props) => props.theme.spacing.sm};
    }
`;

export const NoCitiesMessage = styled.p`
    text-align: center;
    color: ${(props) => props.theme.colors.textSecondary};
    font-size: ${(props) => props.theme.bodyFontSize};
`;