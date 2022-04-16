package com.dressup;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.widget.Toast;
import android.widget.ImageView;

import androidx.annotation.NonNull;

import java.util.Base64;
import java.util.ResourceBundle;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import org.opencv.android.Utils;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;

public class DressUpNativeModule extends ReactContextBaseJavaModule {

    DressUpNativeModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "TestModule";
    }

//    private Mat getDecodedImage(String imageAsBase64)
//    {
//        BitmapFactory.Options options = new BitmapFactory.Options();
//        options.inDither = true;
//        options.inPreferredConfig = Bitmap.Config.ARGB_8888;
//
//        byte[] decodedString = new byte[0];
//        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
//            decodedString = Base64.getDecoder().decode(imageAsBase64);
//        }
//        Bitmap image = BitmapFactory.decodeByteArray(decodedString, 0, decodedString.length);
//        Mat matImage = new Mat();
//        Utils.bitmapToMat(image, matImage);
//        return matImage;
//    }
//
//    private String getEncodedImage(Mat image)
//    {
//            MatOfByte mobImage=new MatOfByte();
//            Imgcodecs.imencode(".jpg",image,mobImage);
//            byte[]gsData=mobImage.toArray();
//        String imageAsBase64= null;
//        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
//            imageAsBase64 = Base64.getEncoder().encodeToString(gsData);
//        }
//        return imageAsBase64;
//    }

    @ReactMethod
    public void TestFunction() {
        Toast.makeText(getReactApplicationContext(), "Hello there this module finally working!", Toast.LENGTH_LONG).show();
//        Mat image=null;
//        Mat gsImage=image.clone();
//        Imgproc.cvtColor(image, gsImage, Imgproc.COLOR_BGR2GRAY);
//        Toast.makeText(getReactApplicationContext(), "Hello There This native module finally working!",
//                Toast.LENGTH_LONG).show();
//        testCallback.invoke(getEncodedImage(gsImage));
    }
}
