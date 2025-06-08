import Image from "next/image";
import { IEntity } from "jsql-api";
import EditProfileModal from "./EditProfileModal";
import ReportProfileModal from "./ReportProfileModal";

// Rangos predefinidos por mi
const Ranks = [
  { name: "Diamond", color: "#B9F2FF", points: 2200 },
  { name: "Platinum", color: "#E5E4E2", points: 1800 },
  { name: "Gold", color: "#FFD700", points: 1500 },
  { name: "Silver", color: "#C0C0C0", points: 1100 },
  { name: "Bronze", color: "#CD7F32", points: 0 },
];

interface UserDetailsProps extends IEntity {
  id: Number;
  pfp?: string;
  country?: string;
  username?: string;
  fullname?: string;
  score?: number;
  isOwnProfile?: boolean; // Nueva prop para saber si es el perfil del usuario actual
}

export default function UserDetails({
  id,
  pfp = `https://avatar.vercel.sh/${id}`,
  country = "Unknown",
  username = `User ${id}`,
  fullname = `Full Name`,
  score = 0,
  isOwnProfile = false,
}: UserDetailsProps) {
  // Determine rank based on ELO score
  const getRankFromElo = (elo: number) => {
    return Ranks.find((rank) => elo >= rank.points) || Ranks[Ranks.length - 1];
  };

  const rankInfo = getRankFromElo(score);
  return (
    <div className="flex flex-row items-start h-3/4 m-16 bg-[#fefefe] rounded-2xl p-8 py-4 relative">
      <section className="bg-white flex items-center justify-center w-40 h-40 -mt-16 rounded-full mr-8">
        <Image
          width={144}
          height={144}
          src={pfp}
          alt="Imagen del usuario"
          className="rounded-full "
          loading="lazy"
        />
      </section>
      <div className="mr-[25%]">
        <span className="bg-sky-300/5 p-0.5 px-4 rounded-xl text-sky-400 font-normal">
          {country}
        </span>
        <h2 className="text-2xl font-bold pt-1">{fullname}</h2>
        <span className="text-gray-700">@{username}</span>
      </div>
      <div className="h-28 bg-gray-500/40 w-[1px] -mt-2 -mb-2 mr-5" />
      <div className="flex-1">
        <h2 className="text-2xl font-bold">Clasificación</h2>
        <p className="text-gray-700">
          Rank:{" "}
          <span style={{ color: rankInfo.color, fontWeight: "bold" }}>
            {rankInfo.name}
          </span>
        </p>
        <p>ELO: {score}</p>
      </div>

      {/* Botones de acción */}
      <div className="absolute top-4 right-4 flex gap-2">
        {isOwnProfile ? (
          <EditProfileModal
            userId={Number(id)}
            initialData={{
              fullname,
              username,
              country,
            }}
          />
        ) : (
          <ReportProfileModal
            userId={Number(id)}
            username={username}
          />
        )}
      </div>
    </div>
  );
}
