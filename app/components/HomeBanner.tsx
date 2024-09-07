import { FiMusic } from "react-icons/fi";
const HomeBanner = () => {
  return (
    <div className="bg-gradient-to-r from-sky-500 to-sky-700">
      <div className="px-8 mx-auto py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
        <div className="mb-8 md:mb-0 text-center">
          <h1 className="text-4xl font-bold text-white md:text-6xl mb-4">
            Discover Your Soundtrack
          </h1>
          <p
            className="text-lg md:xl text-white mb-2
          "
          >
            Create your perfect playlist and let the rhythm take over!
          </p>
        </div>
        <div className="relative aspect-square text-8xl text-white">
          <FiMusic />
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
