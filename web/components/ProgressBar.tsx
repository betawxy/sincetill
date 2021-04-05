import NextNprogress from "nextjs-progressbar";

/**
 * put in container
 */
export default function ProgressBar() {
  return (
    <NextNprogress
      color="#a8dadc"
      startPosition={0}
      stopDelayMs={50}
      height={2}
    />
  );
}
