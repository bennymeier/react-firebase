import { Container } from "react-bootstrap";
import ContentLoader from "react-content-loader"
import React from "react";
export const KanbanEditLoader = () => {
    return (
        <Container>
            <ContentLoader
                height={200}
                width={500}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
            >
                <rect x="0" y="77" rx="3" ry="3" width="500" height="8" />
                <rect x="0" y="50" rx="3" ry="3" width="250" height="8" />
                <rect x="255" y="50" rx="3" ry="3" width="250" height="8" />
                <rect x="0" y="100" rx="3" ry="3" width="250" height="8" />
                <rect x="255" y="100" rx="3" ry="3" width="250" height="8" />
                <rect x="0" y="130" rx="3" ry="3" width="500" height="8" />
                <rect x="0" y="150" rx="3" ry="3" width="500" height="8" />
            </ContentLoader>
        </Container>
    );
};
export const KanbanLoader = () => {
    return (
        <Container>
            <ContentLoader
                height={475}
                width={600}
                speed={2}
                primaryColor="#f3f3f3"
                secondaryColor="#ecebeb"
            >
                <rect x="20" y="65" rx="5" ry="5" width="138" height="100" />
                <rect x="20" y="12" rx="0" ry="0" width="150" height="32" />
                <rect x="450" y="12" rx="0" ry="0" width="150" height="32" />
                <rect x="247" y="12" rx="0" ry="0" width="150" height="32" />
                <rect x="455" y="65" rx="5" ry="5" width="138" height="100" />
                <rect x="252" y="65" rx="5" ry="5" width="138" height="100" />
                <rect x="20" y="183" rx="5" ry="5" width="138" height="100" />
                <rect x="20" y="303" rx="5" ry="5" width="138" height="100" />
                <rect x="455" y="196" rx="5" ry="5" width="138" height="100" />
            </ContentLoader>
        </Container>
    );
};