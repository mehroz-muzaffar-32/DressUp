import React from 'react';
import { Text, Button, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import shirt from './Files/Images/t-shirt.png'
import shirtB from './Files/Images/shirtB.png'
import jeans from './Files/Images/jeans.png'
import jeansB from './Files/Images/jeansB.png'
import shoe from './Files/Images/shoes.png'
import shoeB from './Files/Images/shoesB.png'
import sample from './Files/Images/sample.jpeg'
const styles = StyleSheet.create({
    bar: {
      width: "100%",
      alignItems: 'center',
      height:44,
      paddingTop:5,
      justifyContent:"center",
      backgroundColor:"white",
      flexDirection: 'row',
      elevation:3
    },
    tabItems:{
      width:30,
      height:30,
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
    pic:{
      width:130,
      height:130,
      marginLeft:10,
      marginRight:10,
      borderWidth:2,
      borderRadius:10,
      borderColor:"grey"
    },
    row:{
      marginTop:10,
      marginBottom:10,
      flexDirection: 'row',
      justifyContent:"center",
    },
    scroll:{
      marginBottom:40,
    }
  });

const WardrobeTab = () =>{
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
    <ScrollView style={styles.scroll}>
      <View style={styles.row}>
      <Image style={styles.pic} source={sample} ></Image>
      <Image style={styles.pic} source={sample} ></Image>
      </View>
      <View style={styles.row}>
      <Image style={styles.pic} source={sample} ></Image>
      <Image style={styles.pic} source={sample} ></Image>
      </View>
      <View style={styles.row}>
      <Image style={styles.pic} source={sample} ></Image>
      <Image style={styles.pic} source={sample} ></Image>
      </View>
      <View style={styles.row}>
      <Image style={styles.pic} source={sample} ></Image>
      <Image style={styles.pic} source={sample} ></Image>
      </View>
      <View style={styles.row}>
      <Image style={styles.pic} source={sample} ></Image>
      <Image style={styles.pic} source={sample} ></Image>
      </View>
    </ScrollView>
    </View>
    );
};
export default WardrobeTab;