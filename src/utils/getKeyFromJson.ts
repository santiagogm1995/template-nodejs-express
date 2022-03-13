export function getValueFromJSON(
  json: any,
  value: string | undefined | null
): any {
  let result = "";
  const oArray = {
    array: json,
    value: value,
  };

  if (value == "" || value == null) return value;

  Object.keys(json).forEach((element: any) => {
    if (oArray.array[element] === oArray.value) {
      result = element;
    }
  }, oArray);

  if (result === "") {
    throw new Error(`Value ${value} not pertmited`);
  }

  return result;
}
