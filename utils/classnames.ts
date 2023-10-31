export function classnames(...args: any[]): string {
  const cn = args.filter(Boolean).join(" ");
  return cn;
}
