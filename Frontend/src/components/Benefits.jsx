import React, { useState, useCallback } from "react";
import { benefits } from "../constants";
import Heading from "./Heading";
import Section from "./Section";
import Arrow from "../assets/svg/Arrow";
import { GradientLight } from "./design/Benefits";
import ClipPath from "../assets/svg/ClipPath";
import EmergencyNumbers from "./EmergencyNumbers";
import { fetchRandomExercise } from "../api";

const Benefits = () => {
  const [randomExercise, setRandomExercise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showExercise, setShowExercise] = useState(false);

  const handleExploreClick = useCallback(async (benefitId, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (benefitId !== "1") return;
    if (loading) return;

    setLoading(true);
    setError(null);
    setShowExercise(false);

    try {
      const exercise = await fetchRandomExercise();
      setRandomExercise(exercise);
      setShowExercise(true);
    } catch (error) {
      console.error("Failed to fetch random exercise:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  return (
    <>
      <EmergencyNumbers />
      <Section id="features">
        <div className="container relative z-2">
          <Heading
            className="md:max-w-md lg:max-w-2xl"
            title="Get More Relaxed, Not Harder with FreeMind"
          />

          <div className="flex flex-wrap gap-10 mb-10">
            {benefits.map((item) => (
              <div
                className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] group"
                style={{
                  backgroundImage: `url(${item.backgroundUrl})`,
                }}
                key={item.id}
              >
                <div className="relative z-2 flex flex-col min-h-[22rem] p-[2.4rem]">
                  <h5 className="h5 mb-5">{item.title}</h5>
                  <p className="body-2 mb-6 text-n-3">{item.text}</p>
                  <div className="flex items-center mt-auto">
                    <img
                      src={item.iconUrl}
                      width={48}
                      height={48}
                      alt={item.title}
                    />
                    <button
                      className="ml-auto font-code text-xs font-bold text-n-1 uppercase tracking-wider flex items-center gap-2"
                      onClick={(e) => handleExploreClick(item.id, e)}
                      disabled={loading && item.id === "1"}
                    >
                      {loading && item.id === "1" ? (
                        "Loading..."
                      ) : (
                        <>
                          Explore more
                          <Arrow />
                        </>
                      )}
                    </button>
                  </div>

                  {item.id === "1" && showExercise && randomExercise && (
                    <div className="mt-4">
                      <div className="p-4 border rounded bg-n-8 text-n-1">
                        <h3 className="h5 mb-2">{randomExercise.name}</h3>
                        <p className="body-2 mb-2">Body Part: {randomExercise.bodyPart}</p>
                        <p className="body-2 mb-4">Target: {randomExercise.target}</p>
                        <img src={randomExercise.gifUrl} alt={randomExercise.name} className="mt-4 max-w-full h-auto" />
                      </div>
                    </div>
                  )}

                  {item.id === "1" && error && (
                    <div className="mt-4 text-red-500">Error: {error}</div>
                  )}
                </div>

                {item.light && <GradientLight />}

                <div
                  className="absolute inset-0.5 bg-n-8"
                  style={{ clipPath: "url(#benefits)" }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10">
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        width={380}
                        height={362}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>

                <ClipPath />
              </div>
            ))}
          </div>
        </div>

        <GradientLight />
      </Section>
    </>
  );
};

export default Benefits;