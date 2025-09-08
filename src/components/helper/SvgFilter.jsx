const SvgFilter = () => (
  <svg width="0" height="0">
    <defs>
      <filter id="liquid-glass" x="0" y="0" width="100%" height="100%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.02"
          numOctaves="3"
          result="turbulence"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="turbulence"
          scale="30"
          xChannelSelector="R"
          yChannelSelector="G"
        />
        <feGaussianBlur in="turbulence" stdDeviation="5" result="blurred" />
        <feComposite in="SourceGraphic" in2="blurred" operator="in" />
      </filter>
    </defs>
  </svg>
);
export default SvgFilter;
