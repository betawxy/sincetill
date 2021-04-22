package com.sincetill.android;

import android.graphics.Bitmap;

public class Item {
    public String backgroundImage;
    public long ctime;
    public int formatType;
    public String id;
    public boolean isFullDayEvent;
    public long mtime;
    public String title;
    public long ts;
    public String uid;
    public Bitmap bitmap = null;

    public Item() {
    }

    public Item(String backgroundImage,
                long ctime,
                int formatType,
                String id,
                boolean isFullDayEvent,
                long mtime,
                String title,
                long ts,
                String uid
    ) {
        this.backgroundImage = backgroundImage;
        this.ctime = ctime;
        this.formatType = formatType;
        this.id = id;
        this.isFullDayEvent = isFullDayEvent;
        this.mtime = mtime;
        this.title = title;
        this.ts = ts;
        this.uid = uid;
    }
}
