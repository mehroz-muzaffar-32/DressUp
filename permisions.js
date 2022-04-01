import { PermissionsAndroid } from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions/src';
export async function requestCameraPermission() 
{
    check(PERMISSIONS.ANDROID.CAMERA).then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            alert('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.CAMERA)
            .then((result) => {
            switch (result) {
            case RESULTS.DENIED:
                alert("request for permission has been denied");
                break;
            case RESULTS.GRANTED:
                break;
            case RESULTS.BLOCKED:
                alert("request for permission has been blocked");
                break;
            }
        })
        .catch((error) => {
            alert(error)
        });
            break;
          case RESULTS.GRANTED:
              break;
          case RESULTS.BLOCKED:
            alert('The permission is denied and not requestable anymore');
        }
      });
}
export function requestWriteStoragePermission() 
{
    check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            alert('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
            .then((result) => {
            switch (result) {
            case RESULTS.DENIED:
                alert("request for permission has been denied");
                break;
            case RESULTS.GRANTED:
                break;
            case RESULTS.BLOCKED:
                alert("request for permission has been blocked");
                break;
            }
        })
        .catch((error) => {
            alert(error)
        });
            break;
          case RESULTS.GRANTED:
              break;
          case RESULTS.BLOCKED:
            alert('The permission is denied and not requestable anymore');
        }
      });
}

export function requestReadStoragePermission() 
{
    check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            alert('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
            .then((result) => {
            switch (result) {
            case RESULTS.DENIED:
                alert("request for permission has been denied");
                break;
            case RESULTS.GRANTED:
                break;
            case RESULTS.BLOCKED:
                alert("request for permission has been blocked");
                break;
            }
        })
        .catch((error) => {
            alert(error)
        });
            break;
          case RESULTS.GRANTED:
              break;
          case RESULTS.BLOCKED:
            alert('The permission is denied and not requestable anymore');
        }
      });
}