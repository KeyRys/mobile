import { Product } from "@/src/types/product";

export const calculateRabbitScore = (
  current: Product,
  candidate: Product
): number => {

  let score = 0;

  // breed (5)
  if (current.breed === candidate.breed) {
    score += 5;
  }

  // gender (3)
  if (current.gender === candidate.gender) {
    score += 3;
  }

  // color (2)
  if (current.color === candidate.color) {
    score += 2;
  }

  // purpose (5)
  if (
    current.purpose ===
    candidate.purpose
  ) {
    score += 5;
  }

  // price similarity (3)
  const priceDiff = Math.abs(
    current.price - candidate.price
  );

  if (priceDiff <= 50000) {
    score += 3;
  } else if (priceDiff <= 100000) {
    score += 2;
  } else if (priceDiff <= 200000) {
    score += 1;
  }

  // age similarity (2)
  const ageDiff = Math.abs(
    current.age - candidate.age
  );

  if (ageDiff === 0) {
    score += 2;
  } else if (ageDiff <= 1) {
    score += 1;
  }

  return score;
};

export const getRecommendations = (
  recentRabbits: Product[],
  allRabbits: Product[]
) => {

  return allRabbits

    // exclude already viewed rabbits
    .filter(candidate =>
      !recentRabbits.some(
        r => r.id === candidate.id
      )
    )

    .map(candidate => {

      let totalScore = 0;

      for (const rabbit of recentRabbits) {

        totalScore +=
          calculateRabbitScore(
            rabbit,
            candidate
          );
      }

      return {
        ...candidate,
        similarityScore: totalScore
      };
    })

    .sort(
      (a, b) =>
        b.similarityScore -
        a.similarityScore
    );
};