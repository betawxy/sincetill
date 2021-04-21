package com.sincetill.android;

public class Item {
    private String backgroundImage;
    private long ctime;
    private int formatType;
    private String id;
    private boolean isFullDayEvent;
    private long mtime;
    private String title;
    private long ts;
    private String uid;

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

    public String getBackgroundImage() {
        return backgroundImage;
    }

    public long getCtime() {
        return ctime;
    }

    public int getFormatType() {
        return formatType;
    }

    public String getId() {
        return id;
    }

    public boolean isFullDayEvent() {
        return isFullDayEvent;
    }

    public long getMtime() {
        return mtime;
    }

    public String getTitle() {
        return title;
    }

    public long getTs() {
        return ts;
    }

    public String getUid() {
        return uid;
    }
}
