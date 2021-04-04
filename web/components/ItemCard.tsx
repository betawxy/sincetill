import { Tag } from "antd";
import moment from "moment";
import React from "react";
import { TItem } from "lib/types";
import { getDateTimeString } from "lib/utils";
import { DEFAULT_IMAGE } from "lib/consts";

export default function ItemCard({ item }: { item: TItem }) {
  if (!item.ts) {
    return null;
  }

  const m = moment(item.ts);
  const isSince = m.isBefore(moment());

  return (
    <div className="flex rounded bg-gray-100 p-3">
      <div className="flex-none flex items-center w-16 h-16 rounded overflow-hidden">
        <img
          className="object-cover"
          src={item.backgroundImage || DEFAULT_IMAGE}
          alt="background image"
        />
      </div>
      <div className="flex-grow ml-4">
        <div className="flex justify-between mt-1">
          <div className="flex">
            <div>
              {isSince ? (
                <Tag color="magenta">since</Tag>
              ) : (
                <Tag color="cyan">till</Tag>
              )}
            </div>
            <div className="text-lg">{item.title}</div>
          </div>
          <div>{item.isFullDayEvent && <Tag color="gold">full day</Tag>}</div>
        </div>
        <div className="mt-2 text-gray-500">{getDateTimeString(item)}</div>
      </div>
    </div>
  );
}
