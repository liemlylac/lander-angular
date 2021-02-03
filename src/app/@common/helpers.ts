
export function getOptions(object = {}, name: string, defaultValue?: any): any{
  const props = name.split('.');
  let value = {...object};
  props.forEach((prop) => {
    if (value && typeof value[prop] !== 'undefined') {
      value = value[prop];
    } else {
      value = undefined;
    }
  });

  return typeof value === 'undefined' ? defaultValue : value;
}
