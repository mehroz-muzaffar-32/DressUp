package com.dressup;

import android.telecom.Call;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import org.opencv.core.Mat;
import org.opencv.core.MatOfRect;
import org.opencv.core.Point;
import org.opencv.core.Rect;
import org.opencv.core.Scalar;
import org.opencv.core.Size;
import org.opencv.imgcodecs.Imgcodecs;
import org.opencv.imgproc.Imgproc;
import org.opencv.objdetect.CascadeClassifier;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;

public class DressUpNativeModule extends ReactContextBaseJavaModule {

    private enum BodyPart {
        FACE
    }
    HashMap<BodyPart, Integer>resourceMap=new HashMap<>();
    HashMap<BodyPart, String>fileNameMap=new HashMap<>();
    DressUpNativeModule(ReactApplicationContext context) {
        super(context);
        resourceMap.put(BodyPart.FACE,R.raw.haarcascade_frontalface_default);
        fileNameMap.put(BodyPart.FACE,"haarcascade_frontalface_default.xml");
    }

    @NonNull
    @Override
    public String getName() {
        return "DressUpModule";
    }

    private void Alert(String message)
    {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_SHORT).show();
    }
    private ReactApplicationContext context()
    {
        return getReactApplicationContext();
    }
    private Size fitSize(Size originalSize, Size fittingSize)
    {
        Size newSize=new Size(originalSize.width, originalSize.height);
        if(originalSize.height>800 || originalSize.width>800) {
            if (originalSize.width > originalSize.height) {
                newSize.height = (fittingSize.width * originalSize.height)/ originalSize.width;
                newSize.width = fittingSize.width;
            } else {
                newSize.width = (fittingSize.height * originalSize.width)/ originalSize.height;
                newSize.height = fittingSize.height;
            }
        }
        return newSize;
    }

    @ReactMethod
    public void optimizeSizeAndSave(String imagePath, String clotheFileName)
    {
        Mat image = Imgcodecs.imread(imagePath);
        Size optimizedSize = fitSize(image.size(), new Size(800, 800));
        Imgproc.resize(image, image, optimizedSize);
        String imagesPath = "/storage/self/primary/Android/data/com.dressup/files/";
        Imgcodecs.imwrite(imagesPath+clotheFileName, image);
    }

    private void overlayImage(Mat image, Mat overlay, Point overlayPos, Size overlaySize) {
//        Size imageSize=image.size();
//        overlayPos.x=Math.max(overlayPos.x,0.0);
//        overlayPos.y=Math.max(overlayPos.y,0.0);
//        double widthGap, heightGap;
//        widthGap=imageSize.width-overlayPos.x;
//        heightGap=imageSize.height-overlayPos.y;
//        Size optimizedSize=fitSize(overlaySize, new Size(widthGap-1,heightGap-1));
        Imgproc.resize(overlay, overlay, overlaySize);
        Mat subMat = image.submat(new Rect(overlayPos, overlaySize));
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

    @ReactMethod
    public void TryOnClothes(String personPicPath, String shirtName , String pantName, String shoeName, String resultName, Callback cb) {
        if(personPicPath.isEmpty())
        {
            Alert("Please Add Personal Picture!");
            return;
        }
        Mat personImage = Imgcodecs.imread(personPicPath);
        Size optimizedSize;
        Size personImageSize=personImage.size();
        optimizedSize=fitSize(personImageSize, new Size(800, 800));
        Imgproc.resize(personImage, personImage, optimizedSize);
        Mat personImageGS = personImage.clone();
        Mat shirtImage=null;
        Mat pantImage=null;
        Mat shoeImage=null;
        String imagesPath="/storage/self/primary/Android/data/com.dressup/files/";
        String resultPath=imagesPath+resultName;
        CascadeClassifier faceDetector=getBodyPartDetector(BodyPart.FACE);
        if(faceDetector!=null) {
            Imgproc.cvtColor(personImage, personImageGS, Imgproc.COLOR_BGR2GRAY);
            MatOfRect fRects = new MatOfRect();
            faceDetector.detectMultiScale(personImageGS, fRects);
            Rect f = fRects.toArray()[0];
            Imgproc.rectangle(personImage, new Point(f.x, f.y), new Point(f.x+f.width, f.y+f.height), new Scalar(0,0,0), 2);
            if (!(shirtName.isEmpty())) {
                shirtImage = Imgcodecs.imread(imagesPath + shirtName);
                putOnClothe(personImage,shirtImage,f,0);
            }
//            if (!(pantName.isEmpty())) {
//                pantImage = Imgcodecs.imread(imagesPath + pantName);
//                putOnClothe(personImage,pantImage,f,f.height*4);
//            }
//            if (!(shoeName.isEmpty())) {
//                shoeImage = Imgcodecs.imread(imagesPath + shoeName);
//                putOnClothe(personImage,shoeImage,f,0);
//            }
        }else{
            Alert("Could Not Get One or More Detectors!");
        }

        Imgcodecs.imwrite(resultPath, personImage);
        cb.invoke(resultPath,resultName);
    }
}
