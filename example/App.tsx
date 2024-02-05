import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {
  initSdk,
  trackScreen,
  trackEvent,
  setProperties,
  setIdentity,
  startSurvey,
  assignGroup,
  unassignGroup,
  debug,
  debugTargeting,
} from '@screeb/react-native';

function App(): JSX.Element {
  React.useEffect(() => {
    initSdk(
      '082b7590-1621-4f72-8030-731a98cd1448', // preview
      '5c62c145-91f1-4abd-8aa2-63d7847db1e1', // preview
      '0021de43-6e44-443c-9903-2ab99f9c4233', // https://admin.screeb.app/org/73bd089b-61e3-49f4-86d5-08f1da50941d/people/respondent/f4776019-24d9-49aa-9e5d-a4a5a1d44ab1
      // "react-native@screeb.app",
      {
        // 'isConnected': false,
        // 'age': 29,
        // 'product': 'iPhone 13',
        // 'email': 'e2e@screeb.app',
      },
      {
        version: '1.0.0',
        onReady: (payload: any) => {
          console.log('onReady', payload);
        },
      },
      {
        isDebugMode: false,
      },
    );

    // trackScreen('Dashboard')

    // setInterval(() => {
    // trackScreen('Dashboard', {
    //   'isConnected': false,
    // })
    // }, 1000);

    // setTimeout(() => {
    // trackScreen('ReactModuleHomeScreen', {
    //   'isConnected': false,
    //   'age': 29,
    //   'product': 'iPhone 13',
    // })
    // }, 5000)
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Screeb demo app</Text>
      <Button
        style={styles.sectionButton}
        title="Set identity"
        onPress={() =>
          setIdentity('react-user@screeb.app', {
            isConnected: false,
            age: 29,
            product: 'iPhone 13',
          })
        }
      />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="Track event"
        onPress={() =>
          trackEvent('ReactModuleEvent', {
            isConnected: false,
            age: 29,
            product: 'iPhone 13',
          })
        }
      />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="Track screen"
        onPress={() =>
          trackScreen('ReactModuleScreen', {
            isConnected: false,
            age: 29,
            product: 'iPhone 13',
          })
        }
      />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="Set visitor properties"
        onPress={() =>
          setProperties({
            isConnected: false,
            age: 29,
            product: 'iPhone 13',
          })
        }
      />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="Start survey"
        onPress={() =>
          startSurvey(
            '8dd42ae1-f716-429c-9843-fad62adf2ac4',
            true,
            null,
            true,
            {
              version: '1.0.0',
              onSurveyShowed: (payload: any) => {
                console.log('onSurveyShowed', payload);
              },
            },
          )
        }
      />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="Assign group"
        onPress={() =>
          assignGroup(null, 'Apple', {
            age: null,
            product: 'iPhone 13',
          })
        }
      />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="Unassign group"
        onPress={() =>
          unassignGroup(null, 'Apple', {
            age: null,
            product: 'iPhone 13',
          })
        }
      />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="debug"
        onPress={() => debug()}
      />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="debug targeting"
        onPress={() => debugTargeting()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  sectionButton: {
    padding: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 32,
  },
  space: {
    width: 20,
    height: 20,
  },
});

export default App;
