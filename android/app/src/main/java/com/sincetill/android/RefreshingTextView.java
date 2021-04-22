package com.sincetill.android;

import android.app.Activity;
import android.content.Context;
import android.util.AttributeSet;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.Timer;
import java.util.TimerTask;

public class RefreshingTextView extends androidx.appcompat.widget.AppCompatTextView {
    private Item item;
    private Timer timer = null;
    private final Context context;

    public RefreshingTextView(@NonNull Context context, @Nullable AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        this.context = context;
    }

    public RefreshingTextView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        this.context = context;
    }

    public RefreshingTextView(@NonNull Context context) {
        super(context);
        this.context = context;
    }

    public void setItem(Item it) {
        this.item = it;
    }

    @Override
    protected void onAttachedToWindow() {
        super.onAttachedToWindow();

        if (timer == null) {
            timer = new Timer();
        }
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                ((Activity) context).runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        RefreshingTextView.this.setText(Utils.getDateTimeString(item));
                    }
                });
            }
        }, 0, 1000);
    }

    @Override
    protected void onDetachedFromWindow() {
        timer.cancel();
        timer = null;
        super.onDetachedFromWindow();
    }
}
