import React from 'react';
import { Text, TouchableNativeFeedback, TouchableWithoutFeedback,Button, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import shirt from './Files/Images/t-shirt.png'
import shirtB from './Files/Images/shirtB.png'
import jeans from './Files/Images/jeans.png'
import jeansB from './Files/Images/jeansB.png'
import shoe from './Files/Images/shoes.png'
import shoeB from './Files/Images/shoesB.png'
import sample from './Files/Images/sample.jpeg'
import trash from './Files/Images/trash.png'
import * as RNFS from 'react-native-fs'
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
    buttonClose: {
      backgroundColor: "#eb3434",
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 20,
      width:30,
      height:30,
      borderRadius:20,
      position:'absolute',
      transform:[{
        translateX:120
      },{
        translateY:-10
      }]
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
      borderRadius:10
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
    var [longPress, setLongpress] = React.useState(false);
    var[mainitems,setMainitems] = React.useState([]);
    function addMainItems(fileNames)
    {
      var renderItems=[];
      if(fileNames.length==0)
      {
        return renderItems;
      }
      for (var i=0; i< (fileNames.length%2==0?fileNames.length:fileNames.length-1);i+=2)
      {
        renderItems.push(<View style={styles.row} key={i}>
        
          <TouchableWithoutFeedback onLongPress={()=>{if (longPress==false){setLongpress(true);}else {setLongpress(false);}}}>
            <View >
              <Image style={[styles.pic,longPress?{
              borderColor:"#3195CD"}:{
              borderColor:"grey"}]} source={{uri:"file://"+RNFS.ExternalDirectoryPath+'/'+fileNames[i]}} ></Image>
              <TouchableOpacity style={[styles.buttonClose,longPress?{display:'flex'}:{display:'none'}]} onPress={()=>{setLongpress(true);}} >
                <Text style={{color:'white'}}>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
    
          <TouchableWithoutFeedback onLongPress={()=>{if (longPress==false){setLongpress(true);}else {setLongpress(false);}}}>
            <View >
              <Image style={[styles.pic, longPress?{
              borderColor:"#3195CD"}:{
              borderColor:"grey"}]} source={{uri:"file://"+RNFS.ExternalDirectoryPath+'/'+fileNames[i+1]}}  ></Image>
              <TouchableOpacity style={[styles.buttonClose,longPress?{display:'flex'}:{display:'none'}]}>
                <Text style={{color:'white'}}>X</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        
          </View>
        );
        }
        if(fileNames.length%2!=0)
        {
          renderItems.push(<View style={styles.row} key={fileNames.length-1}>
            <TouchableWithoutFeedback onLongPress={()=>{if (longPress==false){setLongpress(true);}else {setLongpress(false);}}}>
              <View >
                <Image style={[styles.pic,longPress?{
                borderColor:"#3195CD"}:{
                borderColor:"grey"}]} source={{uri:"file://"+RNFS.ExternalDirectoryPath+'/'+fileNames[fileNames.length-1]}} ></Image>
                <TouchableOpacity style={[styles.buttonClose,longPress?{display:'flex'}:{display:'none'}]} onPress={()=>{setLongpress(true);}} >
                  <Text style={{color:'white'}}>X</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
      
          </View>
          );
        } 
      return renderItems;
    }
    return(
    <View>
    <View style={styles.bar}>
        <TouchableOpacity style={shirtIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(true);setShoeIsPress(false);setJeansIsPress(false);setMainitems(['shirt_6.jpg','shirt_6.jpg'])}}>
          <Image style={styles.tabItems} source={shirtIsPress?shirtB:shirt} ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={jeansIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(false);setShoeIsPress(false);setJeansIsPress(true);setMainitems(["pant_5.jpg",'pant_5.jpg'])}}>
          <Image style={styles.tabItems} source={jeansIsPress?jeansB:jeans} ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={shoeIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(false);setShoeIsPress(true);setJeansIsPress(false);setMainitems([])}}>
          <Image style={styles.tabItems} source={shoeIsPress?shoeB:shoe} ></Image>
        </TouchableOpacity>
        
    </View>
    <ScrollView style={styles.scroll}>
            {addMainItems(mainitems)}
    </ScrollView>
    </View>
    );
};
export default WardrobeTab;