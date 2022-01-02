import React from 'react';
import { Text, Button, View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: 'center',
    height:"50%",
    justifyContent:"center"
  },
  container2: {
    width: "100%",
    alignItems: 'center',
    height:"25%"
  },
  logo: {
    width: 120,
    height: 120,
  },
  padding:{
    paddingTop: "15%"
  }
});

const App = () => {
  return (
    <View>
      <View style={styles.container}>
          <Image style={styles.logo} source={require("./Files/Images/Logo.png")} ></Image>
      </View>
      <View style={[styles.container2,styles.padding]}>
          <Button title='SUGGESTIONS' />
      </View>
      <View style={styles.container2}>
          <Button style={styles.margin} title='ENTER WARDROBE' />
      </View>
    </View>
  );
}

export default App;