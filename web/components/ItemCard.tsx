import moment from "moment";
import React from "react";
import { TItem } from "lib/types";
import { getDateTimeString } from "lib/utils";
import { DEFAULT_IMAGE } from "lib/consts";

import Tag from "components/Tag";

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
            <div className="leading-6">
              {isSince ? (
                <Tag text="since" color="pink" className="w-12 mr-3" />
              ) : (
                <Tag text="till" color="green" className="w-12 mr-3" />
              )}
            </div>
            <div className="text-lg">{item.title}</div>
          </div>
          <div>
            {item.isFullDayEvent && (
              <Tag text="full day" color="yellow" className="w-14" />
            )}
          </div>
        </div>
        <div className="mt-1 text-gray-500">{getDateTimeString(item)}</div>
      </div>
    </div>
  );
}
