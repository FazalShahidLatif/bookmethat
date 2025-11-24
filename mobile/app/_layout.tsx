import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2563eb',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'BookMeThat',
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="trains/index" 
          options={{ title: 'Train Search' }} 
        />
        <Stack.Screen 
          name="trains/booking" 
          options={{ title: 'Book Train' }} 
        />
      </Stack>
    </>
  );
}
