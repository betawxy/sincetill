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
      <div className="flex-none w-16 h-16 bg-white rounded overflow-hidden">
        <img
          className="object-cover"
          src={item.backgroundImage || DEFAULT_IMAGE}
        />
      </div>
      <div className="flex-grow ml-3">
        <div className="flex justify-between mt-1">
          <div>
            <span>
              {isSince ? (
                <Tag color="magenta">since</Tag>
              ) : (
                <Tag color="cyan">till</Tag>
              )}
            </span>
            <span className="text-md font-bold">{item.title}</span>
          </div>
          <div>{item.isFullDayEvent && <Tag color="gold">full day</Tag>}</div>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          {getDateTimeString(item)}
        </div>
      </div>
    </div>
  );
}
