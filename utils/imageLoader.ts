import Image from "next/image";

export const imageLoader = () => {
  return "/200w.gif";
};

export const pokemonImageLoader = (id: string | number | undefined) => {
  if (!id) return "/200w.gif";
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

export const ImageWrapper = Image;
