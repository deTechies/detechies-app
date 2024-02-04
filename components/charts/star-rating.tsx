import Image from "next/image";

export default function StarRating({ score }: { score: number }) {
  const totalStars = 5;

  // 점수에 따라 별의 상태를 계산하는 함수
  const calculateStars = (score: number) => {
    const stars = {
      full: 0,
      half: 0,
      empty: totalStars
    };

    if (score >= 91) {
      stars.full = 5;
    } else if (score >= 81) {
      stars.full = 4;
      stars.half = 1;
    } else if (score >= 71) {
      stars.full = 4;
    } else if (score >= 61) {
      stars.full = 3;
      stars.half = 1;
    } else if (score >= 51) {
      stars.full = 3;
    } else if (score >= 41) {
      stars.full = 2;
      stars.half = 1;
    } else if (score >= 31) {
      stars.full = 2;
    } else if (score >= 21) {
      stars.full = 1;
      stars.half = 1;
    } else if (score >= 11) {
      stars.full = 1;
    } else if (score >= 1) {
      stars.half = 1;
    }

    stars.empty = totalStars - stars.full - stars.half;
    return stars;
  };

  const { full, half, empty } = calculateStars(score);

  return (
    <div className="flex flex-wrap gap-2">
      {Array(full)
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
      {Array(half)
        .fill(null)
        .map((_, index) => (
          <Image
            key={`half-star-${index}`}
            src="/icons/star_half.png"
            alt="Half Star"
            width="24"
            height="24"
          />
        ))}
      {Array(empty)
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
