import React from 'react';
import { Text, Button, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
const styles = StyleSheet.create({
  container1:{
    flex:1
  },
  container2:{
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row"
  },
  container: {
    width: "100%",
    alignItems: 'center',
    height:"40%",
    justifyContent:"center",
  },
  button: {
      backgroundColor: "#3195CD",
      width: 150,
      justifyContent: 'center',
      height: 40,
      alignItems: 'center',
      elevation: 3,
      marginTop:20,
      marginBottom:20,
      marginLeft:10,
      marginRight:10
    }
});

const SuggesstionTab = () => {
  return (
    <View style={styles.container1}>
        <View  style={styles.container1}>
        
        </View>
        <View style={styles.container2}>
        <TouchableOpacity style={styles.button}>
            <View style={{justifyContent:"center"}}>
              <Text style={{color:"white"}}>
                Try 
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={{justifyContent:"center"}}>
              <Text style={{color:"white"}}>
                Next
              </Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
}

export default SuggesstionTab;