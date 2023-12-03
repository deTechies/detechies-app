import Image from "next/image";

export default function Profile() {
  return (
    <div className="grid h-full">
      <div className="flex h-[120px]">
        <Image
          src="data:image/jpeg;base64,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"
          width={100}
          height={100}
          className="basis-2/5"
          alt={"avatar"}
        ></Image>
        <div className="flex flex-col justify-between basis-auto ml-2">
          <div>
            <p className="text-md">#Robin 12</p>
            <p className="text-md mt-2">이름: 윤창진</p>
          </div>
          <button className="text-sm bg-gray-200 rounded-full p-2">
            아바타 설정
          </button>
        </div>
      </div>

      <div className="grid p-2 mt-2 border rounded-sm border-gray-400">
        <div className="flex p-1">
          <div className="basis-1/2">
            <p className="">2,334</p>
            <p className="text-gray-400">팔로잉</p>
          </div>
          <div className="basis-1/2">
            <p className="">15</p>
            <p className="text-gray-400">팔로워</p>
          </div>
        </div>
      </div>

      <div className="grid p-2 mt-2 border rounded-sm border-gray-400">
        <div className="flex justify-between p-1">
          <div className="flex">
            <Image
              src={"/icons/ethereum.png"}
              width={20}
              height={20}
              alt={"eth"}
            />
            <span> CAZ 토큰</span>
          </div>
          <div>1,000.02</div>
        </div>
      </div>
    </div>
  );
}
