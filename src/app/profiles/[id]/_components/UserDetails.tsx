import Image from "next/image";

interface UserDetails {
  id: number;
  pfp?: string;
  fullname?: string;
  username?: string;
  bio?: string;
  country?: string;
}

export default function UserDetails({
  id,
  pfp = `https://avatar.vercel.sh/${id}`,
  country = "Unknown",
  username = `User ${id}`,
  fullname = `Full Name`,
  bio,
}: UserDetails) {
  return (
    <div className="flex flex-row items-start  h-3/4 m-16 bg-[#ababab] rounded-2xl p-8 py-4">
      <section className="bg-white flex items-center justify-center w-40 h-40 -mt-16 rounded-xl mr-8">
        <Image
          width={144}
          height={144}
          src={pfp}
          alt="Imagen del usuario"
          className="rounded-2xl "
          loading="lazy"
        />
      </section>
      <div className="mr-[25%]">
        <span className="bg-cyan-300/60 p-0.5 px-4 rounded-xl">{country}</span>
        <h2 className="text-2xl font-bold pt-1">{fullname}</h2>
        <span className="text-gray-700">@{username}</span>
      </div>
      <div className="h-28 bg-gray-500/40 w-[1px] -mt-2 -mb-2 mr-5" />
      <p className="text-gray-600">This is user {id}.</p>
    </div>
  );
}
