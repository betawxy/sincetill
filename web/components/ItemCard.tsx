import { Tag } from "antd";
import moment from "moment";
import React from "react";
import { TItem } from "lib/types";
import { getDateTimeString } from "lib/utils";

export default function ItemCard({ item }: { item: TItem }) {
  if (!item.ts) {
    return null;
  }

  const m = moment(item.ts);
  const isSince = m.isBefore(moment());

  return (
    <div className="rounded bg-gray-100 p-3">
      <div className="flex">
        <div className="flex-grow">
          <span>
            {isSince ? (
              <Tag color="cyan">since</Tag>
            ) : (
              <Tag color="magenta">till</Tag>
            )}
          </span>
          <span className="text-md font-bold">{item.title}</span>
        </div>
        <div className="flex-none">
          {item.isFullDayEvent && <Tag color="gold">full day</Tag>}
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        {getDateTimeString(item)}
      </div>
    </div>
  );
}
