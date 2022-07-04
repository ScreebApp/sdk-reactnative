import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { initSdk, trackScreen, trackEvent, setProperties, setIdentity, startSurvey, assignGroup } from '@screeb/react-native';

export default function App() {

  React.useEffect(() => {
     initSdk(
        "082b7590-1621-4f72-8030-731a98cd1448",
        "5c62c145-91f1-4abd-8aa2-63d7847db1e1",
        "react-native@screeb.app",
        {
          'isConnected': false,
          'age': 29,
          'product' : 'iPhone 13',
          'email' : 'e2e@screeb.app',
        }
     );
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Screeb demo app</Text>
      <Button
        style={styles.sectionButton}
        title="Set identity"
        onPress={setIdentity('react-user@screeb.app', {'isConnected': false,
                                                   'age': 29,
                                                   'product' : 'iPhone 13',
                                                   })}
      />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="Track event"
        onPress={trackEvent('ReactModuleEvent', {'isConnected': false,
                                                   'age': 29,
                                                   'product' : 'iPhone 13',
                                                   })}
      />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="Track screen"
        onPress={trackScreen('ReactModuleScreen', {'isConnected': false,
                                                   'age': 29,
                                                   'product' : 'iPhone 13',
                                                   })}
      />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="Set visitor properties"
        onPress={setProperties({'isConnected': false,
                                'age': 29,
                                'product' : 'iPhone 13',
                                })}
     />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="Start survey"
        onPress={startSurvey("8dd42ae1-f716-429c-9843-fad62adf2ac4",
                             true,
                             null)}
     />
      <View style={styles.space} />
      <Button
        style={styles.sectionButton}
        title="Assign group"
        onPress={assignGroup("groupName",
                             "groupType",
                             {'isConnected': false,
                              'age': 29,
                              'product' : 'iPhone 13',
                              })}
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
