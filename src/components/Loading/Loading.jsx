// Import all dependencies
import React from "react";

// Import Styles
import { LoadingContainer, LoadingMessage } from './Loading.styles';

// Loading Component 
const Loading = () => {
   return (
    <LoadingContainer>
      <LoadingMessage>⏳ Loading...</LoadingMessage>
    </LoadingContainer>
   ); 
}

// Export the Loading component
export default Loading;