package com.sincetill.android;

import android.app.Activity;
import android.content.Context;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.List;

public class ItemsAdapter extends ArrayAdapter<Item> {
    private List<Item> items;
    private Context context;

    public ItemsAdapter(@NonNull Context context, int resource, @NonNull List<Item> items) {
        super(context, resource, items);
        this.context = context;
        this.items = items;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        if (convertView == null) {
            convertView = ((Activity) context).getLayoutInflater().inflate(R.layout.item_item,
                    parent,
                    false);
        }

        ((TextView) convertView.findViewById(R.id.titleTextView))
                .setText(items.get(position).title);
        return convertView;
    }
}
