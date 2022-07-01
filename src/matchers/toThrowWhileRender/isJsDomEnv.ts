const isJsDomEnv = () => typeof window === "object" && window.name === "nodejs";

export default isJsDomEnv;
