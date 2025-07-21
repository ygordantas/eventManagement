export default function createClassName(
  ...args: (string | undefined | false | null | string[])[]
): string {
  return args.flat().filter(Boolean).join(" ");
}
