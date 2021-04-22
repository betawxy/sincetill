package com.sincetill.android;

public class Utils {
    public static String defaultImage = "https://firebasestorage.googleapis" +
            ".com/v0/b/sincetill-app.appspot.com/o/images%2F015ee67c-1997-4340-8c14-ece8078661c7" +
            ".png?alt=media&token=d671b65b-e619-485e-a1c0-720d00f24e4b";

    public static boolean isSince(Item item) {
        return item.ts < System.currentTimeMillis();
    }
}
