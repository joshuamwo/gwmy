export const SuccessIcon: React.FC<React.SVGAttributes<{}>> = (props) => {
  return (
    <svg
      viewBox="0 0 37 37"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2.3"
        d="M30.5 6.5h0c6.6 6.6 6.6 17.4 0 24h0c-6.6 6.6-17.4 6.6-24 0h0c-6.6-6.6-6.6-17.4 0-24h0c6.6-6.7 17.4-6.7 24 0z"
        className="circle path"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        strokeWidth="2.3"
        d="M11.6 20L15.9 24.2 26.4 13.8"
        className="tick path"
      />
    </svg>
  );
};
