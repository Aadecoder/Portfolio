import React, { useState, useEffect, useRef } from 'react';

const GitHubIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.92 3.18 9.1 7.59 10.57.56.1.76-.24.76-.53 0-.26-.01-1.12-.02-2.03-3.09.67-3.74-1.5-3.74-1.5-.51-1.3-1.24-1.65-1.24-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1.01 1.73 2.65 1.23 3.29.94.1-.73.39-1.23.71-1.52-2.47-.28-5.07-1.24-5.07-5.52 0-1.22.44-2.22 1.16-3.01-.12-.29-.5-1.45.11-3.02 0 0 .95-.31 3.12 1.15a10.8 10.8 0 012.84-.38c.96.01 1.93.13 2.84.38 2.17-1.46 3.12-1.15 3.12-1.15.61 1.57.23 2.73.11 3.02.72.79 1.16 1.79 1.16 3.01 0 4.29-2.61 5.24-5.09 5.51.4.35.76 1.04.76 2.1 0 1.52-.01 2.74-.01 3.11 0 .29.2.64.77.53A11.27 11.27 0 0023.25 11.75C23.25 5.48 18.27.5 12 .5z" />
  </svg>
);

const ProjectCarousel = ({ projects = [], autoPlay = false, autoPlayInterval = 6000 }) => {
  const [index, setIndex] = useState(0);
  const length = projects.length;
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % length), autoPlayInterval);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, autoPlayInterval, length]);

  const prev = () => setIndex((i) => (i - 1 + length) % length);
  const next = () => setIndex((i) => (i + 1) % length);

  if (!length) return null;

  return (
    <div className="w-full max-w-3/4 mx-auto relative">
      <div className="overflow-hidden rounded-md shadow-md">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)`, width: `${length * 100}%` }}
        >
          {projects.map((p, i) => (
            <div key={i} className="w-full flex-shrink-0 p-6 backdrop-blur-md bg-gray-900/50 flex gap-6 rounded-md">
              <div className="flex-shrink-0 w-100 h-100 bg-gray-800/50 backdrop-blur-md rounded-md overflow-hidden flex items-center justify-center">
                {p.image ? (
                  <img src={p.image} alt={p.title} className="object-contain w-full h-full" />
                ) : (
                  <div className="text-sm text-gray-500">No image</div>
                )}
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-5xl text-cyan-400 font-semibold">{p.title}</h3>
                  <p className="mt-2 text-md text-gray-600 dark:text-gray-300 whitespace-pre-line">{p.description}</p>
                </div>
                <div className="mt-4 flex items-center gap-3 hover:cursor-pointer">
                  <a
                    href={p.repo || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Open ${p.title} on GitHub`}
                    className="text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white flex items-center gap-2"
                  >
                    <GitHubIcon className="w-6 h-6" />
                    <span className="text-sm">Check out the repo on GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Previous project"
        className="absolute -left-10 size-20 top-1/2 -translate-y-1/2 bg-gray-700/50 backdrop-blur-md p-2 rounded-full shadow hover:shadow-md hover:cursor-pointer hover:dark:bg-gray-950/60"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next project"
        className="absolute size-20 -right-10 top-1/2 -translate-y-1/2 bg-gray-700/50 backdrop-blur-md p-2 rounded-full shadow hover:shadow-md hover:cursor-pointer hover:dark:bg-gray-950/60"
      >
        ›
      </button>

      <div className="mt-3 flex justify-center gap-2">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-gray-800 dark:bg-gray-200' : 'bg-gray-300 dark:bg-gray-600'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectCarousel;