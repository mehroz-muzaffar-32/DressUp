package com.dressup;

import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.opencv.core.Core;
import org.opencv.core.CvType;
import org.opencv.core.Mat;
import org.opencv.core.MatOfPoint;
import org.opencv.core.MatOfRect;
import org.opencv.core.Point;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.ximgproc.ContourFitting;
import org.opencv.ximgproc.StructuredEdgeDetection;
import org.opencv.objdetect.CascadeClassifier;
import org.opencv.ximgproc.Ximgproc;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class DressUpNativeModule extends ReactContextBaseJavaModule {

    private enum BodyPart {
        FACE, UPPER_BODY, LOWER_BODY, FULL_BODY
    }
    HashMap<BodyPart, Integer>resourceMap=new HashMap<>();
    HashMap<BodyPart, String>fileNameMap=new HashMap<>();
    StructuredEdgeDetection edgeDetector=null;
    boolean detectorLoaded=false;
    DressUpNativeModule(ReactApplicationContext context) {
        super(context);
        resourceMap.put(BodyPart.FACE,R.raw.haarcascade_frontalface_default);
        resourceMap.put(BodyPart.UPPER_BODY,R.raw.haarcascade_upperbody);
        resourceMap.put(BodyPart.LOWER_BODY,R.raw.haarcascade_lowerbody);
        resourceMap.put(BodyPart.FULL_BODY,R.raw.haarcascade_fullbody);
        fileNameMap.put(BodyPart.FACE,"haarcascade_frontalface_default.xml");
        fileNameMap.put(BodyPart.UPPER_BODY,"haarcascade_upperbody.xml");
        fileNameMap.put(BodyPart.LOWER_BODY,"haarcascade_lowerbody.xml");
        fileNameMap.put(BodyPart.FULL_BODY,"haarcascade_fullbody.xml");
        loadEdgeDetector();
    }

    private void loadEdgeDetector() {
        try {
            // load model file from application resources
            InputStream is = context().getResources().openRawResource(R.raw.model);
            File modelDir = context().getDir("bg_removal", ReactApplicationContext.MODE_PRIVATE);
            File modelFile = new File(modelDir, "model.yml");
            FileOutputStream os = null;
            os = new FileOutputStream(modelFile);

            byte[] buffer = new byte[4096];
            int bytesRead;
            while ((bytesRead = is.read(buffer)) != -1) {
                os.write(buffer, 0, bytesRead);
            }
            is.close();
            os.close();
            edgeDetector = Ximgproc.createStructuredEdgeDetection(modelFile.getAbsolutePath());
            detectorLoaded=true;
//            Mat temp = new Mat();
//            edgeDetector.detectEdges(blurred_float, temp);
//            Mat edges = new Mat();
//            temp.convertTo(edges, -1, 255);
        }
        catch (IOException e) {
            detectorLoaded=false;
            e.printStackTrace();
        }
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

    private CascadeClassifier getBodyPartDetector(BodyPart bp) {
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

    private void filterOutSaltPepperNoise(Mat edgeImg){
        int count = 0;
    }
    private MatOfPoint findLargestContour(Mat edgeImg){
        ArrayList<MatOfPoint>contours=new ArrayList<MatOfPoint>();
        Mat hierarchy = new Mat();
        Imgproc.findContours(edgeImg, contours, hierarchy, Imgproc.RETR_EXTERNAL, Imgproc.CHAIN_APPROX_SIMPLE);
        MatOfPoint largestContour=new MatOfPoint();
        double largestArea=0;
        for(MatOfPoint contour: contours){
            double area = Imgproc.contourArea(contour);
            if(area>largestArea){
                largestContour=contour;
            }
        }
        return largestContour;
    }

    private Mat removeBackground(Mat clotheImage)
    {
        Alert("Detector Loaded: "+detectorLoaded);
        Mat blur=clotheImage.clone();
        Imgproc.GaussianBlur(clotheImage,blur, new Size(5, 5), 0);
        Mat blurred_float=new Mat();
        blur.assignTo(blurred_float, CvType.CV_32F);
        blurred_float.convertTo(blurred_float, -1, 1.0/255.0);
        Mat edges = new Mat();
        edgeDetector.detectEdges(blurred_float, edges);
        edges.convertTo(edges, -1, 255.0);
        Mat edges_8u=new Mat();
        edges.assignTo(edges_8u, CvType.CV_8U);
        MatOfPoint contour = findLargestContour(edges_8u);
        Mat mask = Mat.zeros(edges_8u.size(),edges_8u.type());
        ArrayList<MatOfPoint> conts=new ArrayList<MatOfPoint>();
        conts.add(contour);
        Imgproc.fillPoly(mask, conts, new Scalar(255,255,255));
        Mat mapFg = new Mat();
        Imgproc.erode(mask, mapFg, Mat.ones(new Size(5, 5), CvType.CV_8U), new Point(0,0), 10);
        Mat trimap = mask.clone();
        trimap.setTo(new Scalar(Imgproc.GC_PR_BGD), mask);
        Mat full=Mat.ones(mask.size(),mask.type());
        full.convertTo(full, -1, 255);
        Core.subtract(full, mask, full);
        trimap.setTo(new Scalar(Imgproc.GC_BGD), full);
        trimap.setTo(new Scalar(Imgproc.GC_FGD), mapFg);
        Mat bgdModel= Mat.zeros(new Size(65,1), CvType.CV_64FC1);
        Mat fgdModel= Mat.zeros(new Size(65,1), CvType.CV_64FC1);
        Rect rect = new Rect(new Point(0,0), new Point(mask.width()-1,mask.height()-1));
        Imgproc.grabCut(clotheImage, trimap, rect, bgdModel, fgdModel, 5, Imgproc.GC_INIT_WITH_MASK);
        return clotheImage;
    }
    @ReactMethod
    public void TryOnClothesTest(String personPicPath, String shirtName , String pantName, String shoeName, String resultName, Callback cb) {
        if(personPicPath.isEmpty())
        {
            Alert("Please Add Personal Picture!");
            return;
        }
        Mat personImage = Imgcodecs.imread(personPicPath);
        Mat personImageGS = personImage.clone();
        Mat shirtImage=null,shirtImageGS=null;
        String imagesPath="/storage/self/primary/Android/data/com.dressup/files/";
        String resultPath="/storage/self/primary/Android/data/com.dressup/files/"+resultName;
//        CascadeClassifier faceDetector=getBodyPartDetector(BodyPart.FULL_BODY);
        Mat resultImage=null;
//        if(faceDetector!=null) {
            Imgproc.cvtColor(personImage, personImageGS, Imgproc.COLOR_BGR2GRAY);
            if (!(shirtName.isEmpty())) {
                shirtImage = Imgcodecs.imread(imagesPath + shirtName);
                resultImage = removeBackground(shirtImage);
            }
            else
            resultImage = removeBackground(personImage);
//            MatOfRect fRects = new MatOfRect();
//            faceDetector.detectMultiScale(personImageGS, fRects);
//            for (Rect f : fRects.toList()) {
//                Imgproc.rectangle(personImage, new Point(f.x, f.y), new Point(f.x+f.width,f.y+f.height),new Scalar(0,0,0));
//            }
//        }else{
//            Alert("Could Not Get One or More Detectors!");
//        }
        Alert("TryOnClothesTest() Function Executed!");

        Imgcodecs.imwrite(resultPath, resultImage);
        cb.invoke(resultPath,resultName);
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
