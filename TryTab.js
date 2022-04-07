import React from 'react';
import { Text,Pressable, TouchableWithoutFeedback,Button, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import shirt from './Files/Images/t-shirt.png'
import shirtB from './Files/Images/shirtB.png'
import jeans from './Files/Images/jeans.png'
import jeansB from './Files/Images/jeansB.png'
import shoe from './Files/Images/shoes.png'
import shoeB from './Files/Images/shoesB.png'
import sample from './Files/Images/sample.jpeg';
import gallery from './Files/Images/gallery.png';
import change from './Files/Images/change.png';
import * as ImagePicker from 'react-native-image-picker/src';
import react from 'react';
import { checkAllPermissions, GetAllPermissions, requestCameraPermission, requestReadStoragePermission, requestWriteStoragePermission } from './permisions';
import * as RNFS from 'react-native-fs';
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
  container1:{
    flex:1
  },
  container2:{
    alignItems:"center",
    justifyContent:"center"
  },
  pic:{
    width:"100%",
    height:"100%",
    borderWidth:2,
    borderColor:"grey"
  },
  logo: {
    width: "90%",
    height: "90%",
    borderWidth:2,
    borderRadius:10,
    borderColor: "grey"
  },
  scroll:{
    marginBottom:5
  },
  button: {
    backgroundColor: "#3195CD",
    width: 170,
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
    elevation: 3,
    marginTop:20,
    marginBottom:20,
    borderRadius: 100,
  },
  buttonClose: {
    backgroundColor: "#3195CD",
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    width:50,
    height:50,
    borderRadius:25,
    position:'absolute',
    right:"3%",
    top:"3%"
  },
});

const TryTab = () => {
  var [ shirtIsPress, setShirtIsPress ] = React.useState(true);
  var [ jeansIsPress, setJeansIsPress ] = React.useState(false);
  var [ shoeIsPress, setShoeIsPress ] = React.useState(false);
  var[filepath,setFilepath]=React.useState(null);
  var [istapped,setIstapped]=React.useState(false);
  var [files, setfiles]=React.useState([]);
  async function GalleryIntent(){
    await GetAllPermissions();
    let check=await checkAllPermissions();
    if(check==false)
    {
      return;
    }
    let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.launchImageLibrary(options , (res) => {
        if (res.didCancel) {
          console.log('User cancelled image picker');
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          alert(res.customButton);
        }
        else {
        setFilepath(res.assets[0].uri);
       }
        });
  }
  
  
  function middleLayer()
  {
    var items=[]
    if (!istapped)
    {
    items.push(<View key={1} style={[styles.container1,styles.container2]}>
      <TouchableOpacity style={styles.button} onPress={()=>{GalleryIntent();setIstapped(true);}}>
        <View style={{justifyContent:"center", flexDirection:'row'}}>
        <Image style={{marginRight:22, width:20, height:20}} source={gallery} ></Image>
          <Text style={{color:"white"}}>
            Add Personal Pic
          </Text>
        </View>
      </TouchableOpacity>
</View>);}
else
{
  items.push(<View key={2} style={[styles.container1,styles.container2]}>
    <Image style={styles.logo} source={filepath==null?sample:{uri:filepath}} ></Image>
    <TouchableOpacity style={[styles.buttonClose]} onPress={()=>{setIstapped(false);setFilepath(null);}}>
                <Image style={{width:30,height:30}} source={change}/>
            </TouchableOpacity>
  </View>);
}
return items;
}

function bottomLayer(fileNames)
{
  var items=[];
  for (var i=0;i<fileNames.length;i++)
  {
    items.push(<Pressable style={({ pressed }) => [{ height: pressed ? 100 : 70, width: pressed ? 100 : 90, paddingLeft:10,alignSelf:'flex-end', paddingRight:10 } ]}><Image key={i+2} style={styles.pic}  
    source={{uri:"file://"+RNFS.ExternalDirectoryPath+'/'+fileNames[i]}} /></Pressable>);
  }
  if(fileNames.length==0)
  {
    items.push(<Pressable style={({ pressed }) => [{ height: pressed ? 100 : 70, width: pressed ? 100 : 90, paddingLeft:10, paddingRight:10 } ]}><Image key={i+2} style={styles.pic} 
      source={sample} /></Pressable>)
  }
  return items;
}
  
  return(
  <View style={styles.container1}>
  <View style={styles.bar}>
      <TouchableOpacity style={shirtIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(true);setShoeIsPress(false);setJeansIsPress(false);setfiles(["shirt_5.jpg","shirt_5.jpg"])}}>
        <Image style={styles.tabItems} source={shirtIsPress?shirtB:shirt} ></Image>
      </TouchableOpacity>
      <TouchableOpacity style={jeansIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(false);setShoeIsPress(false);setJeansIsPress(true);setfiles(["pant_5.jpg","pant_5.jpg","pant_5.jpg","pant_5.jpg","pant_5.jpg","pant_5.jpg"])}}>
        <Image style={styles.tabItems} source={jeansIsPress?jeansB:jeans} ></Image>
      </TouchableOpacity>
      <TouchableOpacity style={shoeIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(false);setShoeIsPress(true);setJeansIsPress(false);setfiles([])}}>
        <Image style={styles.tabItems} source={shoeIsPress?shoeB:shoe} ></Image>
      </TouchableOpacity>
  </View>
  {middleLayer()}
  <View style={[styles.scroll,{position:'absolute', bottom:0}]}>
    <ScrollView horizontal={true} >
    {bottomLayer(files)}  
    </ScrollView>
  </View>
  </View>
  );
}

export default TryTab;