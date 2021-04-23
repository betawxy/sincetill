package com.sincetill.android;

import java.util.ArrayList;

public class Utils {
    public static String defaultImage = "https://firebasestorage.googleapis" +
            ".com/v0/b/sincetill-app.appspot.com/o/images%2F015ee67c-1997-4340-8c14-ece8078661c7" +
            ".png?alt=media&token=d671b65b-e619-485e-a1c0-720d00f24e4b";

    public static boolean isSince(Item item) {
        return item.ts < System.currentTimeMillis();
    }

    public static String getDateTimeString(Item item) {
        int[] types = {6, 5, 4, 3, 2, 1, 0};
        int[] mods = {3600 * 24 * 365, 3600 * 24 * 30, 3600 * 24 * 7, 3600 * 24, 3600, 60, 1};
        String[] strings = {"year", "month", "week", "day", "hour", "minute", "second"};

        long diff = Math.abs(item.ts - System.currentTimeMillis()) / 1000;
        ArrayList<String> parts = new ArrayList<>();
        boolean started = false;

        for (int i = 0; i < types.length; i++) {
            int t = types[i];
            int mod = mods[i];
            String s = strings[i];

            if (t == item.formatType) {
                started = true;
            }

            if (item.isFullDayEvent && t == 2 /* HOURS */ && item.formatType > 2) {
                started = false;
            }

            if (started) {
                long v = diff / mod;
                if (v > 1) {
                    parts.add(String.valueOf(v) + " " + s + "s");
                } else if (v == 1) {
                    parts.add(v + " " + s);
                }

                diff %= mod;
            }
        }

        if (parts.size() > 1) {
            String last = parts.get(parts.size() - 1);
            String secondToLast = parts.get(parts.size() - 2);
            parts.remove(parts.size() - 1);
            parts.set(parts.size() - 1, secondToLast + " and " + last);
        }

        if (parts.isEmpty()) {
            if (item.isFullDayEvent) {
                parts.add("today is the day!");
            } else {
                parts.add("right now!");
            }
        }

        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < parts.size(); i++) {
            builder.append(parts.get(i));
            if (i < parts.size() - 1) {
                builder.append(", ");
            }
        }

        return builder.toString();
    }

    public static String sortTypeToString(long sortType) {
        switch ((int)sortType) {
            case 0:
                return "Title";
            case 1:
                return "Event Time";
            case 2:
                return "Create Time";
            case 3:
                return "Update Time";
            default:
                return null;
        }
    }
}
