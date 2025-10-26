import React, { useMemo } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { AppNavigation } from '@/navigation/AppNavigation';
import { darkTheme, lightTheme } from '@/theme';
import { usePreferencesStore } from '@/store/usePreferencesStore';

const queryClient = new QueryClient();

const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDarkMode = usePreferencesStore((state) => state.isDarkMode);

  const { paperTheme, navigationTheme, statusBarStyle } = useMemo(() => {
    if (isDarkMode) {
      return {
        paperTheme: darkTheme,
        navigationTheme: DarkTheme,
        statusBarStyle: 'light' as const,
      };
    }

    return {
      paperTheme: lightTheme,
      navigationTheme: DefaultTheme,
      statusBarStyle: 'dark' as const,
    };
  }, [isDarkMode]);

  return (
    <PaperProvider theme={paperTheme}>
      <SafeAreaProvider>
        <NavigationContainer theme={navigationTheme}>
          <StatusBar style={statusBarStyle} />
          {children}
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <AppNavigation />
      </AppProviders>
    </QueryClientProvider>
  );
};

export default App;
