interface MyObject {
  [key: string]: any;
}

// 返回一个object副本，只包含keys参数指定的属性值
export function pick(obj: MyObject, keys: Array<string>) {
  return keys.reduce((res, k) => k in obj ? { ...res, [k]: obj[k] } : res, {});
}

// 返回一个合并后的新对象，与Object.assign的区别在于不会合并undefined属性
export function extend(dest: MyObject = {}, source: MyObject = {}) {
  const result = { ...dest };
  Object.keys(source).forEach((key) => {
    if (source[key] !== undefined) {
      result[key] = source[key];
    }
  });
  return result;
}

// 将对象转换为数组
export function toArray(obj: MyObject, keyId: string, valueId: string) {
  return Object.keys(obj).reduce((arr, key) => {
    return arr.concat({ [keyId]: key, [valueId]: obj[key] });
  }, []);
}

// 把对象转换为FormData
export function toFormData(originData: any) {
  if (!originData) return null;

  const formData = new FormData();
  function transformToFormData(formData: any, data: MyObject, parentKey?: string) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(File && data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        let tempKey;
        if (Array.isArray(data)) {
          tempKey = parentKey ? `${parentKey}[${key}]` : key;
        } else {
          tempKey = parentKey ? `${parentKey}.${key}` : key;
        }
        transformToFormData(
          formData,
          data[key],
          tempKey
        );
      });
    } else {
      const value = data === null ? '' : data;
      formData.append(parentKey, value);
    }
  }
  transformToFormData(formData, originData);
  return formData;
}
