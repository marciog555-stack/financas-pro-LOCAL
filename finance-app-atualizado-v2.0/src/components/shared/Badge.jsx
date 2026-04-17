import { BADGE_COLORS } from "../../constants";

export function Badge({ children, color = "slate" }) {
  const styles = BADGE_COLORS;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${styles[color] || styles.slate}`}>
      {children}
    </span>
  );
}
