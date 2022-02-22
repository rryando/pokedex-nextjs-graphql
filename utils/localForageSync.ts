import localForage from "localforage";

async function getValue(key: string) {
  let result = await localForage.getItem(key); //wait for the localforage item

  return result;
}

export default getValue;
