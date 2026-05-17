import AsyncStorage from
"@react-native-async-storage/async-storage";

const KEY = "recent_rabbits";

export const saveRecentRabbit = async (
  rabbit: any
) => {

  const existing =
    await AsyncStorage.getItem(KEY);

  let rabbits = existing
    ? JSON.parse(existing)
    : [];

  // remove duplicate
  rabbits = rabbits.filter(
    (r: any) => r.id !== rabbit.id
  );

  // newest first
  rabbits.unshift(rabbit);

  // keep only 3
  rabbits = rabbits.slice(0, 3);

  await AsyncStorage.setItem(
    KEY,
    JSON.stringify(rabbits)
  );
};

export const getRecentRabbits =
  async () => {

    const data =
      await AsyncStorage.getItem(KEY);

    return data
      ? JSON.parse(data)
      : [];
};