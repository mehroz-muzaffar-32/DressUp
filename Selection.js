import React from 'react';
import { Text, Button, View, Image, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import WardrobeTab from './wardrobTab';
import wardrobeB from './Files/Images/wardrobeB.png'
import wardrobe from './Files/Images/wardrobe.png'
import reloadB from './Files/Images/reloadB.png'
import reload from './Files/Images/reload.png'
import plusB from './Files/Images/plusB.png'
import plus from './Files/Images/plus.png'
import chatB from './Files/Images/chatB.png'
import chat from './Files/Images/chat.png'
import AddTab from './AddTab';
import TryTab from './TryTab';
import SuggesstionTab from './SuggesstionTab';

const styles = StyleSheet.create({
  fragment: {
    height: "90%"
  },
  bar: {
    width: "100%",
    alignItems: 'center',
    height:"10%",
    justifyContent:"center",
    paddingBottom:20,
    flexDirection: 'row'
  },
  tabItems:{
    width:40,
    height:40,
    marginRight:20,
    marginLeft:20
  },
  tabContainer:{
    paddingTop:10,
    borderTopWidth:2,
    borderTopColor:"#8C8C8C"
  },
  tabContainerB:{
    paddingTop:10,
    borderTopWidth:2,
    borderTopColor:"#3195CD"
  }
});

const Selection = ({ navigation }) => {
  const [index, setIndex] = React.useState(1);
  var [ wardrobIsPress, setWardrobIsPress ] = React.useState(true);
  var [ addIsPress, setAddIsPress ] = React.useState(false);
  var [ tryIsPress, setTryIsPress ] = React.useState(false);
  var [ suggesstionIsPress, setSuggesstionIsPress ] = React.useState(false);

  const RenderElement = () => {
    if (index === 1) {
      return <WardrobeTab />;
    } else if (index === 2) {
      return <AddTab />;
    } else if (index == 3) {
      return <TryTab />;
    } else{
      return <SuggesstionTab />
    }
  };

    return (
      <View>
      <View style={styles.fragment}>
        <RenderElement />
      </View>
      <View style={styles.bar}>
      <TouchableOpacity style={wardrobIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setWardrobIsPress(true);setAddIsPress(false),setTryIsPress(false),setSuggesstionIsPress(false),setIndex(1)}}>
          <Image style={styles.tabItems} source={wardrobIsPress?wardrobeB:wardrobe} ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={addIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setWardrobIsPress(false);setAddIsPress(true),setTryIsPress(false),setSuggesstionIsPress(false),setIndex(2)}}>
          <Image style={styles.tabItems} source={addIsPress?plusB:plus} ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={tryIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setWardrobIsPress(false);setAddIsPress(false),setTryIsPress(true),setSuggesstionIsPress(false),setIndex(3)}}>
          <Image style={styles.tabItems} source={tryIsPress?reloadB:reload} ></Image>
        </TouchableOpacity>
        <TouchableOpacity style={suggesstionIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setWardrobIsPress(false);setAddIsPress(false),setTryIsPress(false),setSuggesstionIsPress(true),setIndex(4)}}>
          <Image style={styles.tabItems} source={suggesstionIsPress?chatB:chat} ></Image>
        </TouchableOpacity>
      </View>
      </View>
    );
  };

  export default Selection;