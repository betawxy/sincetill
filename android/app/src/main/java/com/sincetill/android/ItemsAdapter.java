package com.sincetill.android;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class ItemsAdapter extends ArrayAdapter<Item> implements Filterable {
    private List<Item> items;
    private List<Item> filteredItems;

    private final LayoutInflater layoutInflater;
    private final ItemFilter filter = new ItemFilter();

    public ItemsAdapter(@NonNull Context context, int resource, @NonNull List<Item> items) {
        super(context, resource, items);
        this.items = items;
        this.filteredItems = items;
        this.layoutInflater = LayoutInflater.from(context);
    }

    @Override
    public int getCount() {
        return filteredItems.size();
    }

    @Nullable
    @Override
    public Item getItem(int position) {
        return filteredItems.get(position);
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @NonNull
    @Override
    public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
        ViewHolder viewHolder;

        if (convertView == null) {
            convertView = layoutInflater.inflate(R.layout.item_item, null);
            viewHolder = new ViewHolder();
            viewHolder.titleTextView = (TextView) convertView.findViewById(R.id.titleTextView);
            viewHolder.imageView = (ImageView) convertView.findViewById(R.id.imageView);

            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }

        viewHolder.titleTextView.setText(filteredItems.get(position).title);
        try {
            ImageDownloader imageDownloader = new ImageDownloader();
            viewHolder.imageView.setImageBitmap(
                    imageDownloader.execute(filteredItems.get(position).backgroundImage).get());
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
        }

        return convertView;
    }

    @NonNull
    @Override
    public Filter getFilter() {
        return filter;
    }

    static class ViewHolder {
        TextView titleTextView;
        ImageView imageView;
    }

    private class ItemFilter extends Filter {

        @Override
        protected FilterResults performFiltering(CharSequence constraint) {
            String key = constraint.toString().toLowerCase();

            List<Item> values = new ArrayList<>();
            for (int i = 0; i < items.size(); i++) {
                if (items.get(i).title.toLowerCase().contains(key)) {
                    values.add(items.get(i));
                }
            }

            FilterResults results = new FilterResults();
            results.values = values;
            results.count = values.size();
            return results;
        }

        @SuppressWarnings("unchecked")
        @Override
        protected void publishResults(CharSequence constraint, FilterResults results) {
            filteredItems = (List<Item>) results.values;
            notifyDataSetChanged();
        }
    }
}
