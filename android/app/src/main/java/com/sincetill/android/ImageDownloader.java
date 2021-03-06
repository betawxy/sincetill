package com.sincetill.android;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;
import android.util.Log;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class ImageDownloader extends AsyncTask<String, Void, Bitmap> {
    private static final String TAG = "ImageDownloader";

    @Override
    protected Bitmap doInBackground(String... strings) {
        try {
            String s = strings[0];
            if (s == null || s.length() == 0) {
                s = Utils.defaultImage;
            }
            Log.d(TAG, "Downloading: " + s);
            URL url = new URL(s);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.connect();
            InputStream in = connection.getInputStream();

            return BitmapFactory.decodeStream(in);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }
}
