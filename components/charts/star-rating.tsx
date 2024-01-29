import Image from "next/image";

export default function StarRating({ score }: { score: number }) {
  const totalStars = 5;

  // 점수에 따라 꽉 찬 별의 개수를 계산하는 함수
  const fullStars = (score: number) => {
    if (score >= 90) return 5;
    if (score >= 70) return 4;
    if (score >= 50) return 3;
    if (score >= 30) return 2;
    if (score >= 10) return 1;
    return 0;
  };

  const filledStars = fullStars(score); // 꽉 찬 별의 개수
  const emptyStars = totalStars - filledStars; // 빈 별의 개수

  return (
    <div className="flex flex-wrap gap-2">
      {Array(filledStars)
        .fill(null)
        .map((_, index) => (
          <Image
            key={`filled-star-${index}`}
            src="/icons/star_filled.png"
            alt="Filled Star"
            width="24"
            height="24"
          />
        ))}
      {Array(emptyStars)
        .fill(null)
        .map((_, index) => (
          <Image
            key={`empty-star-${index}`}
            src="/icons/star_empty.png"
            alt="Empty Star"
            width="24"
            height="24"
          />
        ))}
    </div>
  );
}
