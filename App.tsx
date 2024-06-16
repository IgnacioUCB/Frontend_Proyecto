import 'react-native-gesture-handler';
import React, { Children, ReactElement } from 'react';
import LoginScreen from './src/Presentation/screens/login/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { MainAppStack } from './src/Presentation/navigator/MainAppStack';
import { AuthProvider } from './src/Presentation/context/auth/AuthContext';
import { View } from 'react-native';
import FlashMessage from 'react-native-flash-message';

interface AppStateProps{
  children: ReactElement | ReactElement[] | null;
}

const AppState: React.FC<AppStateProps> = ({children}) => {
  return(
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <AppState>
        <View style={{ flex: 1 }}>
          <MainAppStack />
          <FlashMessage position="bottom" />
        </View>
      </AppState>
    </NavigationContainer>
  );

}
