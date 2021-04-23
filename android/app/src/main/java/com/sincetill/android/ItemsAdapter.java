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
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ExecutionException;

public class ItemsAdapter extends ArrayAdapter<Item> implements Filterable {
    private List<Item> items;
    public List<Item> filteredItems;

    private final LayoutInflater layoutInflater;
    private final ItemFilter filter = new ItemFilter();

    private long sortDirection;
    private long sortType;

    public ItemsAdapter(@NonNull Context context, int resource, @NonNull List<Item> items) {
        super(context, resource, items);
        this.items = items;
        this.filteredItems = items;
        this.layoutInflater = LayoutInflater.from(context);
    }

    @Override
    public int getCount() {
        if (filteredItems == null) return 0;
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
            viewHolder.imageView = (ImageView) convertView.findViewById(R.id.imageView);
            viewHolder.titleTextView = (TextView) convertView.findViewById(R.id.titleTextView);
            viewHolder.sinceTextView = (TextView) convertView.findViewById(R.id.sinceTextView);
            viewHolder.tillTextView = (TextView) convertView.findViewById(R.id.tillTextView);
            viewHolder.fullDayTextView = (TextView) convertView.findViewById(R.id.fullDayTextView);
            viewHolder.diffTextView =
                    (RefreshingTextView) convertView.findViewById(R.id.diffTextView);

            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }

        if (filteredItems.get(position).bitmap == null) {
            try {
                ImageDownloader imageDownloader = new ImageDownloader();
                filteredItems.get(position).bitmap =
                        imageDownloader.execute(filteredItems.get(position).backgroundImage).get();
            } catch (ExecutionException | InterruptedException e) {
                e.printStackTrace();
            }
        }
        viewHolder.imageView.setImageBitmap(filteredItems.get(position).bitmap);
        viewHolder.titleTextView.setText(filteredItems.get(position).title);
        if (Utils.isSince(filteredItems.get(position))) {
            viewHolder.sinceTextView.setVisibility(View.VISIBLE);
            viewHolder.tillTextView.setVisibility(View.GONE);
        } else {
            viewHolder.sinceTextView.setVisibility(View.GONE);
            viewHolder.tillTextView.setVisibility(View.VISIBLE);
        }
        if (!filteredItems.get(position).isFullDayEvent) {
            viewHolder.fullDayTextView.setVisibility(View.INVISIBLE);
        } else {
            viewHolder.fullDayTextView.setVisibility(View.VISIBLE);
        }
        viewHolder.diffTextView.setItem(filteredItems.get(position));

        return convertView;
    }

    @NonNull
    @Override
    public Filter getFilter() {
        return filter;
    }

    public void setSortDirection(long sortDirection) {
        this.sortDirection = sortDirection;
    }

    public void setSortType(long sortType) {
        this.sortType = sortType;
    }

    static class ViewHolder {
        ImageView imageView;
        TextView titleTextView;
        TextView sinceTextView;
        TextView tillTextView;
        TextView fullDayTextView;
        RefreshingTextView diffTextView;
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

            Item[] valuesArr = new Item[values.size()];
            for (int i = 0; i < values.size(); i++) {
                valuesArr[i] = values.get(i);
            }

            switch ((int) sortType) {
                case 0: // Title
                    Arrays.sort(valuesArr, new Comparator<Item>() {
                        @Override
                        public int compare(Item o1, Item o2) {
                            return o1.title.compareTo(o2.title);
                        }
                    });
                    values = Arrays.asList(valuesArr);
                    break;
                case 1: // TS
                    Arrays.sort(valuesArr, new Comparator<Item>() {
                        @Override
                        public int compare(Item o1, Item o2) {
                            return Long.compare(o1.ts, o2.ts);
                        }
                    });
                    values = Arrays.asList(valuesArr);
                    break;
                case 2: // CTIME
                    Arrays.sort(valuesArr, new Comparator<Item>() {
                        @Override
                        public int compare(Item o1, Item o2) {
                            return Long.compare(o1.ctime, o2.ctime);
                        }
                    });
                    values = Arrays.asList(valuesArr);
                    break;
                case 3: // MTIME
                    Arrays.sort(valuesArr, new Comparator<Item>() {
                        @Override
                        public int compare(Item o1, Item o2) {
                            return Long.compare(o1.mtime, o2.mtime);
                        }
                    });
                    values = Arrays.asList(valuesArr);
                    break;
                default:
                    break;
            }

            if (sortDirection == 1L) {
                for (int i = 0, j = values.size() - 1; i < j; i++, j--) {
                    Item t = values.get(i);
                    values.set(i, values.get(j));
                    values.set(j, t);
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
