import React from 'react';
import { Text, Button, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
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
  button: {
    backgroundColor: "#3195CD",
    width: 150,
    justifyContent: 'center',
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    elevation: 3
  },
  button2: {
    backgroundColor: "#fff",
    width: 150,
    justifyContent: 'center',
    height: 40,
    borderRadius: 100,
    alignItems: 'center',
    elevation: 3,
    borderWidth: 1,
    borderColor:"#3195CD"
  },
  padding:{
    paddingTop: "15%"
  }
});

const Main = ({ navigation }) => {
  return (
    <View>
      <View style={styles.container}>
          <Image style={styles.logo} source={require("./Files/Images/Logo.png")} ></Image>
      </View>
      <View style={[styles.container2,styles.padding]}>
          <TouchableOpacity style={styles.button}>
            <View style={{justifyContent:"center"}}>
              <Text style={{color:"white"}}>
                SUGGESSTIONS
              </Text>
            </View>
          </TouchableOpacity>
      </View>
      <View style={styles.container2}>
          <TouchableOpacity style={styles.button2} onPress={() =>
        navigation.navigate('Selection')
      }>
            <View style={{justifyContent:"center"}}>
              <Text style={{color:"#3195CD"}}>
                ENTER WARDROBE
              </Text>
            </View>
          </TouchableOpacity>
      </View>
    </View>/*
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />*/
  );
};

export default Main;