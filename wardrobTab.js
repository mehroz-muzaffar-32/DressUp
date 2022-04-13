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
      borderRadius:10,
      marginTop:10,
      marginBottom:10,
    },
    row:{
      marginTop:10,
      marginBottom:10,
      flex:1,
      flexDirection: 'row',
      flexWrap:'wrap',
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
    var [longPress, setLongpress] = React.useState(false);// long press state for the x button that appears on the image that needs to be deleted
    var[mainitems,setMainitems] = React.useState([]);//state for all the items that will appear on the middle of the screen contains an array
    var [firstTime,setFirstTime]=React.useState(true);//Hmmm... First Time?
    var [mainCategory,setMainCategory]=React.useState(1);
    //state ends here -----------------------------------------------------------------------------------------------------------------------------------------
    if(firstTime){
      generateMainitems(1);//why is it called? because when wardrobe tab is opened by default shirt tab is opened so automatically the shirts will be shown on screen
      setFirstTime(false);
    }
    async function deleteFile(filename)//function which is called when X button is pressed on a file
    {
      let imagePath=RNFS.ExternalDirectoryPath+'/'+filename;
      let exists = await RNFS.exists(imagePath);
      if(exists){
          await RNFS.unlink(imagePath);
      }else{
          console.log("File Not Available")
      }
      generateMainitems(mainCategory);
      /*1. it must delete the file using the file name obtained as arg from the directory RNFS.ExternalDirectoryPath+'/'
        2. if a problem occurs add prefix to the directory path "file://"
       */
    }

    async function generateMainitems(category)// function that generates the main items being showed on screen
    {
      let categoryMap={1:"shirt",2:"pant",3:"shoe"};
      const imageNames = await RNFS.readDir(RNFS.ExternalDirectoryPath);
      const imageNamesOfCategory=[];
      for(let i=0;i<imageNames.length;i++)
      {
        let imageName=imageNames[i].name;
        if(imageName.includes(categoryMap[category]))
        {
          imageNamesOfCategory.push(imageName);
        }
      }
      setMainitems(imageNamesOfCategory);
      setMainCategory(category);
      /*1. it must read all files available in directory RNFS.ExternalDirectoryPath+'/'+fileName
        2. filter the files obtained like if shirts then only shirts are taken
        3. category variable contains 1,2 or 3 where 1=>shirts 2=> pants 3=>shoes
        4. obtained and filtered file titles must be set to the state mainitems using setmainitems
        5. in case no file is available in directory set state as []
        */
    }

    function addMainItems(fileName)
    {
      var comp =<TouchableWithoutFeedback key={fileName} onLongPress={()=>{if (longPress==false){setLongpress(true);}else {setLongpress(false);}}}>
        <View >
          <Image style={[styles.pic,longPress?{
          borderColor:"#3195CD"}:{
          borderColor:"grey"}]} source={{uri:"file://"+RNFS.ExternalDirectoryPath+'/'+fileName}} ></Image>
          <TouchableOpacity style={[styles.buttonClose,longPress?{display:'flex'}:{display:'none'}]} onPress={()=>{setLongpress(true);deleteFile(fileName);}} >
            <Text style={{color:'white'}}>X</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
      return comp;
      /* -----------back up code------------------------
      var renderItems=[];
      if(fileNames.length==0)
      {
        return renderItems;
      }
      for (var i=0; i< (fileNames.length%2==0?fileNames.length:fileNames.length-1);i+=2)
      {
        renderItems.push(
        
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
          
        );
        }
        if(fileNames.length%2!=0)
        {
          renderItems.push(<TouchableWithoutFeedback onLongPress={()=>{if (longPress==false){setLongpress(true);}else {setLongpress(false);}}}>
              <View >
                <Image style={[styles.pic,longPress?{
                borderColor:"#3195CD"}:{
                borderColor:"grey"}]} source={{uri:"file://"+RNFS.ExternalDirectoryPath+'/'+fileNames[fileNames.length-1]}} ></Image>
                <TouchableOpacity style={[styles.buttonClose,longPress?{display:'flex'}:{display:'none'}]} onPress={()=>{setLongpress(true);}} >
                  <Text style={{color:'white'}}>X</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
      
          
          );
        } 
      return renderItems;
      -------------------back up code -------------------*/
    }

    function maynItems()
    {
      return mainitems.map(addMainItems);
    }

    return(
    <View>
      <View style={styles.bar}>
        <TouchableOpacity style={shirtIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(true);setShoeIsPress(false);setJeansIsPress(false);generateMainitems(1);}}>
          <Image style={styles.tabItems} source={shirtIsPress?shirtB:shirt} ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={jeansIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(false);setShoeIsPress(false);setJeansIsPress(true);generateMainitems(2);}}>
          <Image style={styles.tabItems} source={jeansIsPress?jeansB:jeans} ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={shoeIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(false);setShoeIsPress(true);setJeansIsPress(false);generateMainitems(3);}}>
          <Image style={styles.tabItems} source={shoeIsPress?shoeB:shoe} ></Image>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.row}>
            {maynItems()}
        </View>
      </ScrollView>
    </View>
    );
};
export default WardrobeTab;