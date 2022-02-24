import React from 'react';
import RoutesStack from './routes';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <RoutesStack />
    </BrowserRouter>
    <GlobalStyle />
  </>
)

export default App;
