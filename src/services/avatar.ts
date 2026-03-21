const AVATAR_VARIANT_TOTAL = 70;

const hashText = (value: string): number => {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
};

export const getDeterministicAvatar = (seed: string, size = 150): string => {
  const normalizedSeed = seed.trim().toLowerCase() || 'user';
  const variant = (hashText(normalizedSeed) % AVATAR_VARIANT_TOTAL) + 1;

  return `https://i.pravatar.cc/${size}?img=${variant}`;
};

export const getDeterministicPostImage = (
  seed: string | number,
  width = 800,
  height = 800
): string => {
  const normalizedSeed = String(seed).trim().toLowerCase() || 'post';
  return `https://picsum.photos/seed/${normalizedSeed}/${width}/${height}`;
};
