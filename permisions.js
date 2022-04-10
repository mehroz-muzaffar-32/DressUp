import { PermissionsAndroid } from 'react-native';
// you better not change this file, if a problem occurs im not gonna fix it
// file for getting permissions all at once 
export async function GetAllPermissions() {
    if (Platform.OS === "android") {
        const userResponse = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]);
        return userResponse;
      }
    return null;
  }

export async function checkAllPermissions(){
    let camPer = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
    let stoPer = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    return camPer && stoPer;
}