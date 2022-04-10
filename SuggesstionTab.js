import React from 'react';
import { Text, Button, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import sample from './Files/Images/sample.jpeg';
import next from './Files/Images/next.png';
import change from './Files/Images/tryw.png';
import * as RNFS from 'react-native-fs';
const styles = StyleSheet.create({
  container1:{
    flex:1
  },
  container2:{
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row"
  },
  logo: {
    width: 120,
    height: 120,
    borderWidth:2,
    borderRadius:10,
    borderColor: "grey"
  },
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent:"center",
  },
  button2: {
    backgroundColor: "white",
    borderColor: 'green',
    borderRadius:100,
    borderWidth:2,
    width: 150,
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
    elevation: 3,
    marginTop:20,
    marginBottom:20
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
    borderRadius: 100,
    marginRight:10,
    marginLeft:10,
    }
});

const SuggesstionTab = (props) => {
var [shirtpath, setShirtpath] = React.useState("");
var [pantpath, setPantpath] = React.useState("");
var [shoepath, setShoepath] = React.useState("");
refreshSuggesstion();//why is it called? becaus when app runs in start and suggesstion tab is opened it will refresh suggesstions right away

function filenamesReturn() //dont change it, as it changes state when images are refreshed
{
  props.tryset([shirtpath,pantpath,shoepath]);
}

function refreshSuggesstion()
{
  /* -- code here --
  Q-> what should it do?
  A-> 1. Must read filenames from the directiory "RNFS.ExternalDirectoryPath+'/'" 
      2. Must set the states shirtpath, pantpath, shoepath after reading file names as in step 1
      3. Must choose 1 files name from each shirts, pants and shoes
      4. file names are saved using {category}_{id}.jpg where category is either shirt/pant/shoe and id is a number so for shirt with id 1 the file name is shirt_1.jpg
      5. dont create any other directory inside the directory mentioned in step 1 as files are named using format {category}_{id}.jpg hence no additional directory is required inside  
      6. In order to read file names see RNFS library
      --Warning--
      1. dont inser whole URI insdie the filenames states mentioned above in code
      2. if no file exist setstate as "" for file names
      3. when reading or writing use "RNFS.ExternalDirectoryPath+'/'"
  */  
}  

return (
    <View style={styles.container1}>
        <View  style={styles.container1}>
        <View style={styles.container}>
          <Image style={styles.logo} source={shirtpath!=""?{uri:"file://"+RNFS.ExternalDirectoryPath+'/'+shirtpath}:sample} ></Image>
        </View>
        <View style={styles.container}>
          <Image style={styles.logo} source={pantpath!=""?{uri:"file://"+RNFS.ExternalDirectoryPath+'/'+pantpath}:sample} ></Image>
        </View>
        <View style={styles.container}>
          <Image style={styles.logo} source={shoepath!=""?{uri:"file://"+RNFS.ExternalDirectoryPath+'/'+shoepath}:sample} ></Image>
        </View>
        </View>
        <View style={styles.container2}>
        <TouchableOpacity style={styles.button} onPress={()=>{filenamesReturn();props.chngIndx(3);props.sugchng(false);props.trychng(true);}}>
            <View style={{justifyContent:"center", flexDirection:'row'}}>
            <Image style={{marginRight:30, width:21, height:21}} source={change} ></Image>
              <Text style={{color:"white"}}>
                TRY
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button2} onPress={()=>{refreshSuggesstion();}}>
            <View style={{justifyContent:"center", flexDirection:'row'}}>
            <Image style={{marginRight:30, width:21, height:21}} source={next} ></Image>
              <Text style={{color:"green", fontSize:14, marginRight:25}}>
                NEXT
              </Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
}

export default SuggesstionTab;