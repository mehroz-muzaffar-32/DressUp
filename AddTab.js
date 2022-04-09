import React from 'react';
import { Text, Button, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import sample from './Files/Images/sample.jpeg';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker/src';
import react from 'react';
import { checkAllPermissions, GetAllPermissions, requestCameraPermission, requestReadStoragePermission, requestWriteStoragePermission } from './permisions';
import * as RNFS from 'react-native-fs';
import { check } from 'react-native-permissions';
import gallery from './Files/Images/gallery.png';
import photo from './Files/Images/photo.png';
import { CustomPicker } from 'react-native-custom-picker';
import down from './Files/Images/down.png';
import next from  './Files/Images/next.png';

const styles = StyleSheet.create({
    container2: {
        flex:1
    },
    container3: {
        height: "13%",
        justifyContent:'center',
        alignItems:'center'
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
      borderRadius: 100,
      },
      buttonClose: {
        backgroundColor: "#eb3434",
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        width:30,
        height:30,
        borderRadius:15,
        position:'absolute',
        transform:[{
          translateX:60},{
          translateY:-60}
        ]
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
    logo: {
      width: 120,
      height: 120,
      borderWidth:2,
      borderRadius:10,
      borderColor: "grey"
    },
    picker: {
    backgroundColor: "#fff",
    width: 150,
    borderRadius:100,
    borderWidth:2,
    borderColor:"#3195CD",
    color:"#3195CD",
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
    elevation: 3,
    marginBottom:20
    }
  });

const AddTab = () => {
    const [selectedValue, setSelectedValue] = React.useState("shirt");//contains the selected value of the custom picker
    const [filepath, setFilepath] = React.useState(null)//contains the URI of the file that is imported after the camera and gallery is used 
    const [filename, setFilename] = React.useState("");// file name must be generated so that when it is saved it is saved by the name that is stored in this state
    const pickerOptions = ['shirt','pant','shoe'];// options for custom picker
    const [selected, setSelected] = React.useState(false);// used for appearing and disappearing X button
    const [catTap, setCatTap] = React.useState(false);//Category Tap => it ensures user must change category before opening camera or gallery
    // state ends here ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    async function CameraIntent(){ // dont change it, if a problem occurs im not gonna fix it
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
        ImagePicker.launchCamera(options , (res) => {
          if (res.didCancel) {
            console.log('User cancelled image picker');
          } else if (res.error) {
            console.log('ImagePicker Error: ', res.error);
          } else if (res.customButton) {
            console.log('User tapped custom button: ', res.customButton);
            alert(res.customButton);
          }
          else {
                RNFS.copyFile(res.assets[0].uri.replace("file://",""), RNFS.ExternalDirectoryPath+'/'+filename)
                .then(res => {})
                .catch(err => {
                    console.log('ERROR: image file write failed!!!');
                    console.log(err.message, err.code);
                    
         });
          setSelected(true);
          setFilepath(res.assets[0].uri);
         }
          });
    }

    async function GalleryIntent(){//dont change it, if problem occurs then im not gonna help
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
                RNFS.copyFile(res.assets[0].uri.replace("file://",""), RNFS.ExternalDirectoryPath+'/'+filename)
                .then(res => {})
                .catch(err => {
                    console.log('ERROR: image file write failed!!!');
                    console.log(err.message, err.code);
                    
         });
          setSelected(true);
          setFilepath(res.assets[0].uri);
         }
          });
    }
    
    function renderField(settings) {// dont change it, it updates the custom picker
      const { selectedItem, defaultText, getLabel, clear } = settings
      return (
        <View style={{justifyContent:"center", flexDirection:'row'}}>
          <View>
            {!catTap &&<Text>{defaultText}</Text>}
            {catTap && selectedItem && (
              <View>
                <Text style={{ color:'grey' }}>
                  {getLabel(selectedItem)}
                </Text>
              </View>
            )}
          </View>
          <View>
          <Image style={{marginLeft:30, width:20, height:20}} source={down} ></Image>
          </View>
        </View>
      )
    }

    function generateFilename()//function used to set the name of the file name that needs to be saved
    {
      /*1. must generate the file name before it is saved
        2. set the file name using setFilename
        3. when generating file name remember! the generated file must be unique it must not concide with the file name generated in past
        4. one way to solve the prblem in step 3 is to add date and time as a string in file name but remember it must contain {category i.e. shirt/pant/shoe}_{id}.jpg
        */
    }

    function deleteFile()//function used to delete in case user press X button on the image
    {
      /*1. when X button is pressed the file name stored in the filename state is extracted
        2. it is then used to delete from the directory RNFS.ExternalDirectoryPath+'/'
        3. in case there is a problem with deleting file add a prefix file://
        4. must set filename to "" when file is deleted
       */
    }

  return (
    <View style={styles.container2}>
        <View style={styles.container}>
          <Image style={styles.logo} source={filepath==null?sample:{uri:filepath}} ></Image>
          <TouchableOpacity style={[styles.buttonClose,selected?{display:'flex'}:{display:'none'}]} onPress={()=>{deleteFile(); setSelected(false); setCatTap(false); setFilepath(null);}}>
              <Text style={{color:"white"}}>
                X
              </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container3} >
        <CustomPicker 
          placeholder={'Category'}
          options={pickerOptions}
          style={styles.picker}
          fieldTemplate={renderField}
          onValueChange={value => {
            setSelectedValue(value); setCatTap(true); generateFilename();
          }}
        />
        </View>
        <View style={styles.container3}>
        <TouchableOpacity style={styles.button} onPress={()=>{catTap?GalleryIntent():alert("please choose catergory!")}}>
            <View style={{justifyContent:"center", flexDirection:'row'}}>
            <Image style={{marginRight:22, width:20, height:20}} source={gallery} ></Image>
              <Text style={{color:"white", marginRight:15}}>
                GALLERY
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container3}>
        <TouchableOpacity style={styles.button} onPress={()=>{catTap?CameraIntent():alert("please choose category!")}}>
            <View style={{justifyContent:"center", flexDirection:'row'}}>
            <Image style={{marginRight:10, width:20, height:20}} source={photo} ></Image>
              <Text style={{color:"white"}}>
                TAKE PHOTO
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container3}>
        <TouchableOpacity style={styles.button2} onPress={()=>{setFilepath(null); setSelected(false); setCatTap(false);}}>
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


export default AddTab;