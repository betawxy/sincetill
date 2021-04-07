export default function ItemCardSkeleton() {
  return (
    <div className="flex rounded bg-gray-100 p-3">
      <div className="flex-none flex items-center rounded overflow-hidden">
        <div className="skeleton w-16 h-16" />
      </div>
      <div className="flex-grow ml-4">
        <div className="flex justify-between mt-1">
          <div className="flex w-full mt-1">
            <div className="leading-6">
              <div className="skeleton w-12 h-5 mr-3" />
            </div>
            <div className="skeleton w-1/2"></div>
          </div>
        </div>
        <div className="skeleton w-2/3 h-4 mt-3"></div>
      </div>
    </div>
  );
}
