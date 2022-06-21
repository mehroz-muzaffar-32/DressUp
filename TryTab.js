import React from 'react';
import { Text,Pressable, View, Image, StyleSheet, TouchableOpacity, ScrollView, Button } from 'react-native';
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
import { checkAllPermissions, GetAllPermissions} from './permisions';
import * as RNFS from 'react-native-fs';
import {NativeModules} from 'react-native';
import { ActivityIndicator } from 'react-native';

const {DressUpModule}=NativeModules;

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
  middleLayer:{
    display: 'flex',
    height:'75%',
    alignItems:"center",
    justifyContent:"center"
  },
  pic:{
    width:"100%",
    height:"100%",
  },
  pic_border:{
    borderWidth:2,
    borderColor:"grey"
  },
  pic_selected_border:{
    borderWidth:4,
    borderColor:"skyblue"
  },
  logo: {
    backgroundColor:'black',
    width: "90%",
    height: "90%",
    // borderWidth:2,
    // borderRadius:10,
    // borderColor: "grey"
  },
  scroll:{
    height:"12%",
    paddingBottom:5
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
  buttonBlock: {
    backgroundColor: "green",
    flex:1,
    justifyContent:"center",
    alignItems:"center"
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

const TryTab = (props) => {
  var [ shirtIsPress, setShirtIsPress ] = React.useState(true);
  var [ jeansIsPress, setJeansIsPress ] = React.useState(false);
  var [ shoeIsPress, setShoeIsPress ] = React.useState(false);
  //these three are for the shirt, pant, shoe middle layer change buttons on top of screen
  var[filepath,setFilepath]=React.useState(null);
  //this state is for the image of the user after user presses on add personal pic and user pic appears on screen
  var [istapped,setIstapped]=React.useState(false);
  //this state is for the add personal pic such that when it is pressed the middle layer changes
  var [files, setfiles]=React.useState([]);
  //this state contains the filenames readed from "RNFS.ExternalDirectoryPath+'/'" directory
  var [shirtTryName, setShirtTryName] = React.useState(props.shirt);//shirt name for the shirt that will be tried on user's pic. use it in image source by using this {uri:"file://"+RNFS.ExternalDirectoryPath+'/'+shirtpath}<--file name here same goes for 2 states below
  var [pantTryName, setPantTryName] = React.useState(props.pant);//pant name for the pant that will be tried on user's pic. use it in image source by using this {uri:"file://"+RNFS.ExternalDirectoryPath+'/'+pantpath} in image source
  var [shoeTryName, setShoeTryName] = React.useState(props.shoe);//shoe name for the shoe that will be tried on user's pic. use it in image source by using this {uri:"file://"+RNFS.ExternalDirectoryPath+'/'+shoepath} in image source
  var [firstTime,setFirstTime]=React.useState(true);//Hmmm... First Time?
  var [counter,setCounter]=React.useState(0);//For Testing Purposes
  var [prevName,setPrevName]=React.useState(null);
  var [personPicPath,setPersonPicPath]=React.useState(null);
  var [isLoading, setIsLoading]=React.useState(false);
  const [loadingText, setLoadingText] = React.useState("Loading...");
  // States End here-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  React.useEffect(()=>{
    if(isLoading)
    {
      TryOnSelectedClothes(shirtTryName, pantTryName, shoeTryName);
    }
  },[isLoading])
  if(firstTime){
    cleanPreviousPictures();
    readFilesForScroll(1);// why is it called? its because when try tab is opened by default shirts part/fragment is opened hence 1 is added in category so that it loads all shirt names
    setFirstTime(false);
  }
  async function GalleryIntent(){ // please dont change it, if a problem occurs im not gonna fix it
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
        setPersonPicPath(res.assets[0].uri);
       }
        });
  }
  
  async function readFilesForScroll(category)//function for the updation of the scroll menu on the bottom of the screen. it basically updates the scroll menu by updating the state files. files state must contain file names only not directory path or URI must beincluded.
  {
    let categoryMap={1:"shirt",2:"pant",3:"shoe"};
    const imageFiles = await RNFS.readDir(RNFS.ExternalDirectoryPath);
    const imageFilesOfCategory=[];
    for(let i=0;i<imageFiles.length;i++)
    {
      let imageName=imageFiles[i].name;
      if(imageName.includes(categoryMap[category]))
      {
        imageFilesOfCategory.push(imageName);
      }
    }
    setfiles(imageFilesOfCategory);
    /*1. category id the integer variable that contains 1 or 2 or 3. 1 is for shirts. 2 is for pants and 3 is for shoe.
      2. based on integer stored in category must read files from the directory "RNFS.ExternalDirectoryPath+'/'".
      3. files readed must be inserted to files state in form of array.
      4. if files readed are "shirt_5.jpg" and "shirt_6.jpg" then state must be set by setfiles(["shirt_5.jpg","shirt_6.jpg"]).
      5. in case no files exist in directory state must set with emoty array i.e. setfiles([])<-- it must be remembered that array must be empty dont put "" inside it if no file exists 
      6. readed files must be filtered meaning from the directory all files will be readed so if category is 1 which means shirts then it should filter readed files array and remove pants and shoes files and leave only shirts file name in array.
      7. return arr-> this array must contain names in form of ["shirt_5","shirt_6"] etc.;
      8. all filtered file names should be inserted inside files state by using setfiles(array)
      9. in case no files are available in directoy just set the files state to [""]
      */
  }

  function middleLayer() // dont change it, it updates the middle layer
  {
    var items=[]
    if(isLoading)
    {
      items.push(
        <View key={3} style={[styles.middleLayer]}>
          <ActivityIndicator size={50} />
          <Text>{loadingText}</Text>
        </View>);
      return items;
    }
    if (!istapped)
    {
      items.push(
      <View key={1} style={[styles.middleLayer]}>
        <TouchableOpacity style={styles.button} onPress={()=>{GalleryIntent();setIstapped(true);}}>
          <View style={{justifyContent:"center", flexDirection:'row'}}>
          <Image style={{marginRight:22, width:20, height:20}} source={gallery} ></Image>
            <Text style={{color:"white"}}>
              Add Personal Pic
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      );
    }
    else
    {
      items.push(
      <View key={2} style={[styles.middleLayer]}>
        <Image style={styles.logo} resizeMode='contain' source={filepath==null?sample:{uri:filepath}} ></Image>
        <TouchableOpacity style={[styles.buttonClose]} onPress={()=>{setIstapped(false);setFilepath(null);setPersonPicPath(null);}}>
          <Image style={{width:30,height:30}} source={change}/>
        </TouchableOpacity>
      </View>
      );
    }
  return items;
}

/*******BSEF18M004-MEHROZ MUZAFFAR*********/

function generateFileName(prefix)
{
  let tempCurDate=new Date();
  let currentDate=JSON.stringify(tempCurDate).split('\"')[1].split('T')[0];
  let currentTime=tempCurDate.getHours()+"-"+tempCurDate.getMinutes()+"-"+tempCurDate.getSeconds();
  let id=currentDate+"_"+currentTime;
  let generatedFileName=prefix+"_"+id+".png";
  return generatedFileName;
}
async function deletePicture(fileName)
{
  let imagePath=RNFS.ExternalDirectoryPath+'/'+fileName;
  let exists = await RNFS.exists(imagePath);
  if(exists){
      // exists call delete
      await RNFS.unlink(imagePath);
  }else{
      console.log("File Not Available")
  }
}
async function cleanPreviousPictures()
{
  const imageFiles = await RNFS.readDir(RNFS.ExternalDirectoryPath);
  for(let i=0;i<imageFiles.length;i++){
    let imageName=imageFiles[i].name;
    if(imageName.includes("gs")){
      deletePicture(imageName);
    }
  }
}

/******************************************/

async function correctPressFunction(category, name)//function that saves the chosen object name to the appropriate variable to try on user pic
{
  if (category==1)
  {
    setShirtTryName(name);
  }
  else if(category==2)
  {
    setPantTryName(name);
  }
  else
  {
    setShoeTryName(name);
  }
}

async function TryOnSelectedClothes(shirt, pant, shoe)
{
  shirt=(shirt==null?"":shirt);
  pant=(pant==null?"":pant);
  shoe=(shoe==null?"":shoe);
  personPicPath=(personPicPath==null?"":personPicPath);
  if(shirt=="" && pant=="" && shoe=="")
  {
    alert("Please select atleast one clothe image!");
    setIsLoading(false);
  }
  else if(personPicPath=="")
  {
    alert("Please add personal picture!");
    setIsLoading(false);
  }
  else
  {
    // // console.log("Before: "+filepath);
    let resultFileName=generateFileName("gs");
    DressUpModule.TryOnClothes(personPicPath.replace("file://",""), shirt, pant, shoe, resultFileName, async (dpath,oldFileName)=>{
      if(prevName!=null){
        deletePicture(prevName);
      }
      setPrevName(oldFileName);
      setFilepath("file://"+dpath);
      setIsLoading(false);
      // console.log("After: "+dpath);
    });
  }
}

function bottomLayerExtended(fileN) // dont change it, it updates the horizontal scrollbar on the bottom
{
  var comp=<TouchableOpacity key={fileN} style={{paddingLeft: 5, paddingRight: 5,height:"100%",width:75, display: 'flex', justifyContent:'center', alignItems:'center'}}>
    <Pressable style={({ pressed }) => [{ height: pressed ? "90%" : "100%", width: pressed ? "90%" : "100%"}]} 
    onPress={()=>{correctPressFunction(fileN.includes("shirt")?1:(fileN.includes("pant")?2:3),fileN)}}>
      <Image style={[styles.pic,((fileN==shirtTryName || fileN==pantTryName || fileN==shoeTryName)?styles.pic_selected_border:styles.pic_border)]} source={ fileN!=""?{uri:"file://"+RNFS.ExternalDirectoryPath+'/'+fileN}:sample} />
    </Pressable>
  </TouchableOpacity>
  return comp;
}
  
function BottomLayer()
{
  return files.map(bottomLayerExtended);
}
return(
  <View style={styles.container1}>
    <View style={styles.bar}>
      <TouchableOpacity style={shirtIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(true);setShoeIsPress(false);setJeansIsPress(false);readFilesForScroll(1);}}>
        <Image style={styles.tabItems} source={shirtIsPress?shirtB:shirt} ></Image>
      </TouchableOpacity>
      <TouchableOpacity style={jeansIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(false);setShoeIsPress(false);setJeansIsPress(true);readFilesForScroll(2);}}>
        <Image style={styles.tabItems} source={jeansIsPress?jeansB:jeans} ></Image>
      </TouchableOpacity>
      <TouchableOpacity style={shoeIsPress?styles.tabContainerB:styles.tabContainer} onPress={()=>{setShirtIsPress(false);setShoeIsPress(true);setJeansIsPress(false);readFilesForScroll(3);}}>
        <Image style={styles.tabItems} source={shoeIsPress?shoeB:shoe} ></Image>
      </TouchableOpacity>
    </View>
    {middleLayer()}
    <View style={styles.scroll}>
      <ScrollView horizontal={true} >
      {BottomLayer()}
      </ScrollView>
    </View>
    <TouchableOpacity style={styles.buttonBlock} onPress={()=>{setIsLoading(true);}}>
        <Text style={{color:"white"}}>
          TRY ON
        </Text>
    </TouchableOpacity>
  </View>
  );
}

export default TryTab;