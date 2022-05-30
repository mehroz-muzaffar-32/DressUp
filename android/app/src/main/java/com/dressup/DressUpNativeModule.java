package com.dressup;

import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Build;
import android.widget.Toast;
import android.widget.ImageView;

import androidx.annotation.NonNull;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashMap;
import java.util.ResourceBundle;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;
import com.rnfs.RNFSManager;
import com.rnfs.RNFSPackage;

import org.opencv.android.Utils;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfByte;
import org.opencv.core.MatOfRect;
import org.opencv.core.Point;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;

public class DressUpNativeModule extends ReactContextBaseJavaModule {

    private enum BodyPart {
        FACE, UPPER_BODY, LOWER_BODY
    }
    HashMap<BodyPart, Integer>resourceMap=new HashMap<>();
    HashMap<BodyPart, String>fileNameMap=new HashMap<>();
    DressUpNativeModule(ReactApplicationContext context) {
        super(context);
        resourceMap.put(BodyPart.FACE,R.raw.haarcascade_frontalface_default);
        resourceMap.put(BodyPart.UPPER_BODY,R.raw.haarcascade_upperbody);
        resourceMap.put(BodyPart.LOWER_BODY,R.raw.haarcascade_lowerbody);
        fileNameMap.put(BodyPart.FACE,"haarcascade_frontalface_default.xml");
        fileNameMap.put(BodyPart.UPPER_BODY,"haarcascade_upperbody.xml");
        fileNameMap.put(BodyPart.LOWER_BODY,"haarcascade_lowerbody.xml");
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

    private void Alert(String message)
    {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }
    private ReactApplicationContext context()
    {
        return getReactApplicationContext();
    }
    private void overlayImage(Mat image, Mat overlay, Point clothePos, Size overlaySize) {
        Imgproc.resize(overlay, overlay, overlaySize);
        Mat subMat = image.submat(new Rect((int)clothePos.x, (int)clothePos.y, overlay.cols(), overlay.rows()));
        overlay.copyTo(subMat);
    }
    private void putOnClothe(Mat personImage,Mat clotheImage, Rect face, int offset){
        Point clothePos=new Point(0,0);
        Size clotheSize=new Size(0,0);
        clotheSize.width=face.width*4;
        clotheSize.height=clotheImage.height()*(clotheSize.width/clotheImage.width());
        clothePos.x=(face.x+face.width/2.0)-clotheSize.width/2;
        clothePos.y=face.y+face.height+offset;
        overlayImage(personImage,clotheImage,clothePos,clotheSize);
    }

    private CascadeClassifier getBodyPartDetector(BodyPart bp)
    {
        try {
            // load cascade file from application resources
            InputStream is = context().getResources().openRawResource(resourceMap.get(bp));
            File cascadeDir = context().getDir("cascade", ReactApplicationContext.MODE_PRIVATE);
            File mCascadeFile = new File(cascadeDir, fileNameMap.get(bp));
            FileOutputStream os = new FileOutputStream(mCascadeFile);

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
            is.close();
            os.close();

            CascadeClassifier mJavaDetector = new CascadeClassifier(mCascadeFile.getAbsolutePath());
            if (mJavaDetector.empty()) {
                Alert("Failed to load cascade classifier");
                mJavaDetector = null;
            } else {
                Alert("Loaded cascade classifier from " + mCascadeFile.getAbsolutePath());
            }
            return mJavaDetector;
            //cascadeDir.delete();
        } catch (IOException e) {
            e.printStackTrace();
            Alert("Failed to load cascade. Exception thrown: " + e);
            return null;
        }
    }

    @ReactMethod
    public void TryOnClothes(String personPicPath, String shirtName , String pantName, String shoeName, String resultName, Callback cb) {
        if(personPicPath.isEmpty())
        {
            Alert("Please Add Personal Picture!");
            return;
        }
        Mat personImage = Imgcodecs.imread(personPicPath);
        Mat personImageGS = personImage.clone();
        Mat shirtImage=null,shirtImageGS=null;
        Mat pantImage=null,pantImageGS=null;
        Mat shoeImage=null,shoeImageGS=null;
        String imagesPath="/storage/self/primary/Android/data/com.dressup/files/";
        String resultPath="/storage/self/primary/Android/data/com.dressup/files/"+resultName;
        CascadeClassifier faceDetector=getBodyPartDetector(BodyPart.FACE);
        if(faceDetector!=null) {
            Imgproc.cvtColor(personImage, personImageGS, Imgproc.COLOR_BGR2GRAY);
            MatOfRect fRects = new MatOfRect();
            faceDetector.detectMultiScale(personImageGS, fRects);
            for (Rect f : fRects.toList()) {
                if (!(shirtName.isEmpty())) {
                    shirtImage = Imgcodecs.imread(imagesPath + shirtName);
                    putOnClothe(personImage,shirtImage,f,0);
                }
                if (!(pantName.isEmpty())) {
                    pantImage = Imgcodecs.imread(imagesPath + pantName);
                    putOnClothe(personImage,pantImage,f,f.height*4);
                }
                if (!(shoeName.isEmpty())) {
                    shoeImage = Imgcodecs.imread(imagesPath + shoeName);
                    putOnClothe(personImage,shoeImage,f,0);
                }
            }
        }else{
            Alert("Could Not Get One or More Detectors!");
        }
        Alert(personPicPath+" Function Executed!");

        Imgcodecs.imwrite(resultPath, personImage);
        cb.invoke(resultPath,resultName);

//        Toast.makeText(getReactApplicationContext(), "Hello there this module finally working!", Toast.LENGTH_LONG).show();
//        Mat image=null;
//        Mat gsImage=image.clone();
//        Imgproc.cvtColor(image, gsImage, Imgproc.COLOR_BGR2GRAY);
//        Toast.makeText(getReactApplicationContext(), "Hello There This native module finally working!",
//                Toast.LENGTH_LONG).show();
//        testCallback.invoke(getEncodedImage(gsImage));
    }
}
