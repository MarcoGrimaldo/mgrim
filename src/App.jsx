import Home from './modules/Home/Home';
import React from 'react';
import { CustomThemeProvider } from './modules/theme/theme';

function App() {
  return (
    <>
      <CustomThemeProvider>
        <Home />
      </CustomThemeProvider>
    </>
  );
}

export default App;
