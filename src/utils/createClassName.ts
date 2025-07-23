type CreateClassNameArgs = (string | undefined | false | null | string[])[];

export default function createClassName(...args: CreateClassNameArgs): string {
  return args.flat().filter(Boolean).join(" ");
}
