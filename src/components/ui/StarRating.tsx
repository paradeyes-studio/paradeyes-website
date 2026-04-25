interface StarRatingProps {
  rating: number;
  total?: number;
  label?: string;
}

export function StarRating({ rating, total = 5, label }: StarRatingProps) {
  return (
    <div
      className="pdy-star-rating"
      role="img"
      aria-label={label || `${rating} sur ${total}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}
