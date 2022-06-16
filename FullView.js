import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View,Dimensions,Image,StyleSheet,TouchableOpacity } from 'react-native';
import * as RNFS from 'react-native-fs'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
const styles=StyleSheet.create({
  rowSharing: 
  {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ButtonDiv:
  {
    height:"10%",
    width:"100%",
    position:"absolute",
    top:0,
    left:0,
    backgroundColor:"rgba(0,0,0,0.5)",
  },
  Button:
  {
    height:"100%",
    width:"20%",
  },
});
const FullView = (props) => { 
   const navigation = useNavigation();
   const imageName=props.route.params.imageName; 
   const deleteImage=props.route.params.deleteImage;
   const imagePath={uri:"file://"+RNFS.ExternalDirectoryPath+'/'+imageName};
   let windowHeight=Dimensions.get('window').height;
   let windowWidth=Dimensions.get('window').width;
   return (
    <View style={{backgroundColor:"black"}}>
      <Image style={{width:windowWidth,height:windowHeight}} resizeMode="contain" source={imagePath}></Image>
      <View style={styles.ButtonDiv}>
        <View style={styles.rowSharing}>
          <View style={[styles.Button,{marginLeft:"5%"}]}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Ionicons name={'return-up-back'} size={45} color="white" solid></Ionicons>
            </TouchableOpacity>
          </View>
          <View style={[styles.Button,{marginRight:"1%"}]}>
            <TouchableOpacity onPress={()=>{navigation.goBack();deleteImage(imageName)}}>
               <MaterialIcons name={'delete'} size={40} color="white" solid></MaterialIcons>
            </TouchableOpacity>
          </View>
        </View>  
      </View>
    </View>
  );
};
export default FullView;