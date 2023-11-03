import Image from "next/image";

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            fill
            src="/documents.png"
            className="object-contain select-none pointer-events-none"
            alt="documents"
          />
        </div>
        <div className="relative w-[400px] h-[400px] hidden md:block">
          <Image
            fill
            src="/reading.png"
            className="object-contain select-none pointer-events-none"
            alt="reading"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
