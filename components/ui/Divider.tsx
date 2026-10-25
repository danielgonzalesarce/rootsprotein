export function Divider({ orientation = "vertical" }: { orientation?: "vertical" | "horizontal" }) {
  if (orientation === "horizontal") {
    return <hr className="my-4 border-0 border-t border-current/20" />;
  }
  return <span className="mx-3 hidden h-8 w-px shrink-0 bg-current/25 md:block" aria-hidden="true" />;
}
