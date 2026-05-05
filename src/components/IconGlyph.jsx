import PropTypes from 'prop-types';

const icons = {
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </>
  ),
  code: (
    <>
      <path d="M8 9 4 12l4 3" />
      <path d="m16 9 4 3-4 3" />
      <path d="m14 5-4 14" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <rect x="7" y="12" width="3" height="4" rx="1" />
      <rect x="12" y="9" width="3" height="7" rx="1" />
      <rect x="17" y="6" width="3" height="10" rx="1" />
    </>
  ),
  message: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-6a8 8 0 1 1 18-5Z" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M8 14a6 6 0 1 1 8 0c-1.2 1-1.5 2-1.5 4h-5c0-2-.3-3-1.5-4Z" />
    </>
  ),
  checklist: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="m8 9 1.5 1.5L12 8" />
      <path d="M14 9h3" />
      <path d="m8 15 1.5 1.5L12 14" />
      <path d="M14 15h3" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5Z" />
      <path d="M8 6h8" />
      <path d="M8 10h6" />
    </>
  ),
};

const IconGlyph = ({ name }) => (
  <svg className="icon-glyph" viewBox="0 0 24 24" aria-hidden="true">
    {icons[name] || icons.code}
  </svg>
);

IconGlyph.propTypes = {
  name: PropTypes.string.isRequired,
};

export default IconGlyph;
