import Section from "./Section";
import { smallSphere, stars } from "../assets";
import Heading from "./Heading";
import ResourcesList from "./ResourcesList";
import { LeftLine, RightLine } from "./design/Resources";

const Resources = () => {
  return (
    <Section className="overflow-hidden" id="Resources">
      <div className="container relative z-2">
        <div className="hidden relative justify-center mb-[6.5rem] lg:flex">
          <img
            src={smallSphere}
            className="relative z-1"
            width={255}
            height={255}
            alt="Sphere"
          />
          <div className="absolute top-1/2 left-1/2 w-[60rem] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <img
              src={stars}
              className="w-full"
              width={950}
              height={400}
              alt="Stars"
            />
          </div>
        </div>

        <Heading
          tag="Get started with FreeMind"
          title="Life is Good, Lets Help Each Other"
        />

        <div className="relative">
          <ResourcesList />
          <LeftLine />
          <RightLine />
        </div>

        <div className="flex justify-center mt-10">
          <a
            className="text-xs font-code font-bold tracking-wider uppercase border-b"
            href="/Resources"
          >
            See the full details
          </a>
        </div>
      </div>
    </Section>
  );
};

export default Resources;
