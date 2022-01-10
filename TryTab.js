import React from 'react';
import { Text, Button, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import shirt from './Files/Images/t-shirt.png'
import shirtB from './Files/Images/shirtB.png'
import jeans from './Files/Images/jeans.png'
import jeansB from './Files/Images/jeansB.png'
import shoe from './Files/Images/shoes.png'
import shoeB from './Files/Images/shoesB.png'
import sample from './Files/Images/sample.jpeg';
const styles = StyleSheet.create({
  bar: {
    width: "100%",
    alignItems: 'center',
    height:40,
    justifyContent:"center",
    paddingTop:20,
    flexDirection: 'row'
  },
  tabItems:{
    width:40,
    height:40,
    marginRight:20,
    marginLeft:20
  },
  tabContainer:{
    paddingBottom:10,
    borderBottomWidth:2,
    borderBottomColor:"#8C8C8C"
  },
  tabContainerB:{
    paddingBottom:10,
    borderBottomWidth:2,
    borderBottomColor:"#3195CD"
  },
  container1:{
    height:"78%"
  },
  pic:{
    width:70,
    height:70,
    marginLeft:10,
    marginRight:10,
    borderWidth:2,
    borderColor:"grey"
  }
});

const TryTab = () => {
  var [ shirtIsPress, setShirtIsPress ] = React.useState(true);
  var [ jeansIsPress, setJeansIsPress ] = React.useState(false);
  var [ shoeIsPress, setShoeIsPress ] = React.useState(false);
  return(
  <View>
  <View style={styles.bar}>
      <TouchableOpacity style={shirtIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(true);setShoeIsPress(false),setJeansIsPress(false)}}>
        <Image style={styles.tabItems} source={shirtIsPress?shirtB:shirt} ></Image>
      </TouchableOpacity>
      <TouchableOpacity style={jeansIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(false);setShoeIsPress(false),setJeansIsPress(true)}}>
        <Image style={styles.tabItems} source={jeansIsPress?jeansB:jeans} ></Image>
      </TouchableOpacity>
      <TouchableOpacity style={shoeIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(false);setShoeIsPress(true),setJeansIsPress(false)}}>
        <Image style={styles.tabItems} source={shoeIsPress?shoeB:shoe} ></Image>
      </TouchableOpacity>
  </View>
  <View style={styles.container1}>

  </View>
  <View>
    <ScrollView horizontal={true}>
      <Image style={styles.pic} source={sample} ></Image>
      <Image style={styles.pic} source={sample} ></Image>
      <Image style={styles.pic} source={sample} ></Image>
      <Image style={styles.pic} source={sample} ></Image>
      <Image style={styles.pic} source={sample} ></Image>
      <Image style={styles.pic} source={sample} ></Image>
      <Image style={styles.pic} source={sample} ></Image>
    </ScrollView>
  </View>
  </View>
  );
}

export default TryTab;