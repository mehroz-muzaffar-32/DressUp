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
    flex:1
  },
  bar: {
    width: "100%",
    alignItems: 'center',
    height:50,
    justifyContent:"center",
    flexDirection: 'row',
    backgroundColor:"white",
    elivation:10,
    paddingBottom:10
  },
  tabItems:{
    width:30,
    height:30,
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
  },
  flexBox:{
    flex:1,
  }
});

const Selection = ({ route }) => {
  var [suggesstionNavigated, setSuggesstionNavigated] = React.useState(route.params.suggesstion)
  const [index, setIndex] = React.useState(suggesstionNavigated?4:1);
  var [ wardrobIsPress, setWardrobIsPress ] = React.useState(suggesstionNavigated?false:true);
  var [ addIsPress, setAddIsPress ] = React.useState(false);
  var [ tryIsPress, setTryIsPress ] = React.useState(false);
  var [ suggesstionIsPress, setSuggesstionIsPress ] = React.useState(suggesstionNavigated?true:false);
  var [trypaths, setTrypaths]=React.useState(["","",""]);// try paths state is used to transfer the file names from suggesstion tab to the try tab. it is array and at first index it contains shirt name at second index it contains pant name and at the third index it contains shoe file name
  // states end here -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
  const RenderElement = () => { // dont change it. it is used for navigating or more specifically changing tabs
    if (index === 1) {
      return <WardrobeTab />;
    } else if (index === 2) {
      return <AddTab />;
    } else if (index == 3) {
      return <TryTab shirt={trypaths[0]} pant={trypaths[1]} shoe={trypaths[2]}/>;
    } else{
      return <SuggesstionTab tryset={setTrypaths} chngIndx={setIndex} trychng={setTryIsPress} sugchng={setSuggesstionIsPress} />
    }
  };
    
    return (
      <View style={styles.flexBox}>
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