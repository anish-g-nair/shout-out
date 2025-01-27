import React from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './pages/MainPage';

function App() {
  return (
    <AppProvider>
      <Header />
      <MainPage />
      <Footer />
    </AppProvider>
  );
}

export default App;
