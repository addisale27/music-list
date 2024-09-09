import { PlayList } from "@prisma/client";
import Heading from "../components/Heading";

interface SummartProps {
  playList: PlayList[];
}

const Summary: React.FC<SummartProps> = ({ playList }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="rounded-xl border-2 p-4  transition max-w-[300px]">
        <div
          className="text-xl md:text-4xl font-bold flex flex-col items-center gap-2 justify-center
        "
        >
          <div>{playList.length}</div>
          <div className="text-lg">Total PlayList Created</div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
