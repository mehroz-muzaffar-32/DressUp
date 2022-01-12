import React from 'react';
import { Text, Button, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import sample from './Files/Images/sample.jpeg';
import {Picker} from '@react-native-picker/picker';

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
  return (
    <View style={styles.container2}>
        <View style={styles.container}>
          <Image style={styles.logo} source={sample} ></Image>
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
        <TouchableOpacity style={styles.button}>
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