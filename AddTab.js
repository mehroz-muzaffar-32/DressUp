import React from 'react';
import { Text, Button, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import sample from './Files/Images/sample.jpeg';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'react-native-image-picker/src';
import react from 'react';
import { requestCameraPermission, requestReadStoragePermission, requestWriteStoragePermission } from './permisions';
import * as RNFS from 'react-native-fs';

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
        marginBottom:20
      },
      button2: {
        backgroundColor: "green",
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
      borderColor: "grey"
    },
    picker: {
    backgroundColor: "#fff",
    width: 150,
    justifyContent: 'center',
    height: 40,
    alignItems: 'center',
    elevation: 3,
    marginBottom:20
    }
  });

const AddTab = () => {
    const [selectedValue, setSelectedValue] = React.useState("Shirt");
    const [filepath, setFilepath] = React.useState(null)
    const [filename, setFilename] = React.useState("shirt_1.jpg");

    async function CameraIntent(){
      await requestCameraPermission();
      await requestWriteStoragePermission();
      await requestReadStoragePermission();
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
                RNFS.moveFile(res.assets[0].uri.replace("file://",""), RNFS.ExternalDirectoryPath+'/'+filename)
                .then(res => {})
                .catch(err => {
                    console.log('ERROR: image file write failed!!!');
                    console.log(err.message, err.code);
         });
                setFilepath(res.assets[0].uri);
         }
          });
    }
  
  return (
    <View style={styles.container2}>
        <View style={styles.container}>
          <Image style={styles.logo} source={filepath==null?sample:{uri:filepath}} ></Image>
        </View>
        <View style={styles.container3}>
        <Picker selectedValue={selectedValue}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Shirt" value="Shirt" />
        <Picker.Item label="Jeans" value="Jeans" />
        <Picker.Item label="Shoes" value="Shoes" />
      </Picker>
        </View>
        <View style={styles.container3}>
        <TouchableOpacity style={styles.button}>
            <View style={{justifyContent:"center"}}>
              <Text style={{color:"white"}}>
                GALLERY
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container3}>
        <TouchableOpacity style={styles.button} onPress={()=>{CameraIntent()}}>
            <View style={{justifyContent:"center"}}>
              <Text style={{color:"white"}}>
                TAKE PHOTO
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container3}>
        <TouchableOpacity style={styles.button2}>
            <View style={{justifyContent:"center"}}>
              <Text style={{color:"white"}}>
                SAVE
              </Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  );
}

export default AddTab;