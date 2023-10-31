export function classnames(...args: any[]): string {
  let cn = "";
  args.forEach((arg) => {
    if (typeof arg === "string") {
      cn += ` ${arg}`;
    } else if (typeof arg === "object" && arg !== null) {
      for (const key in arg) {
        if (arg[key] === true) {
          cn += ` ${key}`;
        }
      }
    }
  });
  return cn;
}
