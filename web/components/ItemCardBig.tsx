import moment from "moment";
import React from "react";
import { TItem } from "lib/types";
import { getDateTimeString } from "lib/utils";
import { DEFAULT_IMAGE } from "lib/consts";

import Tag from "components/Tag";

export default function ItemCardBig({ item }: { item: TItem }) {
  if (!item.ts) {
    return null;
  }

  const m = moment(item.ts);
  const isSince = m.isBefore(moment());

  return (
    <div
      className="flex md:rounded md:border bg-gray-100 w-full object-cover"
      style={{
        minHeight: "calc(100vh - 20rem)",
        backgroundImage: `url("${item.backgroundImage || DEFAULT_IMAGE}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex flex-col p-3 w-1/2 mx-auto border rounded-lg self-center"
        style={{
          backdropFilter: "blur(30px)",
        }}
      >
        <div className="flex m-3 justify-between">
          {isSince ? (
            <Tag text="since" color="pink" className="w-12 mr-3" />
          ) : (
            <Tag text="till" color="green" className="w-12 mr-3" />
          )}
          {item.isFullDayEvent && (
            <Tag text="full day" color="yellow" className="w-14" />
          )}
        </div>
        <div className="w-full text-3xl text-center mt-2">{item.title}</div>
        <div className="w-full text-md text-center mt-3 mb-6 text-gray-900">
          {getDateTimeString(item)}
        </div>
      </div>
    </div>
  );
}
