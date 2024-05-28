import Link from "next/link";

export default function Banner() {
  return (
    <div className="bg-purple-600 sticky">
      <div className="max-w-screen-xl mx-auto px-4 py-3 text-white text-center md:px-8">
        <p className="font-medium">
          You are now in staging environment{" "}
          <Link
            href="https://umbraco.com/knowledge-base/staging-environment/#:~:text=A%20staging%20environment%20is%20the,they%20hit%20the%20live%20website."
            target="_blank"
            className="underline"
          >
            Learn more
          </Link>
        </p>
      </div>
    </div>
  );
}
