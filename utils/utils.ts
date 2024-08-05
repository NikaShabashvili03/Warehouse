



export const updateQueryJson = (
  (name: string, value: string) => {
      const params = new URLSearchParams(window.location.search)
      
      const prev = params.get(name);
      if(!prev){
        params.set(name, value)
        return `${window.location.pathname}?${params.toString()}`
      }

      let parsedPrev;
      try {
        parsedPrev = JSON.parse(prev);
      } catch (error) {
        console.error("Failed to parse previous value as JSON:", error);
        parsedPrev = {};
      }

      let parsedValue;
      try {
        parsedValue = JSON.parse(value);
      } catch (error) {
        console.error("Failed to parse value as JSON:", error);
        parsedValue = {};
      }

      for (const key in parsedValue) {
        if (Object.prototype.hasOwnProperty.call(parsedValue, key)) {
          parsedPrev[key] = parsedValue[key];
        }
      }

      params.set(name, JSON.stringify(parsedPrev))
      return `${window.location.pathname}?${params.toString()}`
  }
)

export const appendQueryString = (
    (name: string, value: string) => {
     const params = new URLSearchParams(window.location.search)
     !params.has(name, value) && params.append(name, value)
      
     return `${window.location.pathname}?${params.toString()}`;
})

export const updateQueryString = (
    (name: string, value: string) => {
        const params = new URLSearchParams(window.location.search)
        params.set(name, value)

        return `${window.location.pathname}?${params.toString()}`
    }
)

export  const removeQueryString = (
    (name: string, value: string | undefined) => {
      const params = new URLSearchParams(window.location.search)
      params.delete(name, value);

      return `${window.location.pathname}?${params.toString()}`
    }
  )

export const removeManyQueryString = (
  (name: string) => {
    const params = new URLSearchParams(window.location.search)
    name.split('&').forEach((item) => {
      params.delete(item, undefined)
    })

    return `${window.location.pathname}?${params.toString()}`
  }
)

export const removeAllQueryString = (
  () => {
    const params = new URLSearchParams(window.location.search)
    const keys = params.keys();
    for (const key of Array.from(keys)) {
      params.delete(key, undefined);
    }

    return `${window.location.pathname}?${params.toString()}`
  }
)

export const removeManyAndUpdateQueryString = (
  (name: string, value: string) => {
    const params = new URLSearchParams(window.location.search)

    const keys = Array.from(params.keys());

    // Iterate over the keys array
    for (const key of keys) {
        params.delete(key, undefined);
    }
    
    params.set(name, value);
    return `${window.location.pathname}?${params.toString()}`
  }
)

export const updateAndRemoveQueryString = (
  (add: string, remove: string, value: string) => {
    const params = new URLSearchParams(window.location.search)

    params.set(add, value);
    params.delete(remove, undefined);

    return `${window.location.pathname}?${params.toString()}`
  }
)

export const updateOneRemoveMany = (
  (name: string, value: string, values: any) => {
    const params = new URLSearchParams(window.location.search);
    params.set(name, value);
    values?.map((item: any) => params.delete(item, undefined))

    return `${window.location.pathname}?${params.toString()}`
  }
)

export const updateManyQueryString = (
  (values: any) => {
    const params = new URLSearchParams(window.location.search);
    Object.keys(values).map((key: any) => {
      if(typeof values[key] === "object"){
        const val = JSON.stringify(values[key]);
        return params.set(key, val);
      }
      if(!values[key]) {
        return params.delete(key, undefined)
      };
      params.set(key, values[key])
    })
    return `${window.location.pathname}?${params.toString()}`
  }
)
export const getYears = ({to} : {to: any}) => {
  const currentYear = (new Date()).getFullYear();
  const range = (start: any, stop: any, step: any) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
  return range(currentYear, to, -1)
}