export function Sidebar() {

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/logo-white.png" />
      </div>
      <div className="pages">
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
          </svg>
          <a className="link">Home</a>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M11 2a9 9 0 1 0 5.618 16.032l3.675 3.675a1 1 0 0 0 1.414-1.414l-3.675-3.675A9 9 0 0 0 11 2m-6 9a6 6 0 1 1 12 0a6 6 0 0 1-12 0"
              clipRule="evenodd"
            />
          </svg>{" "}
          <a className="link">Browse</a>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path
              fill="currentColor"
              d="M28 64a12 12 0 0 1 12-12h176a12 12 0 0 1 0 24H40a12 12 0 0 1-12-12m12 76h116a12 12 0 0 0 0-24H40a12 12 0 0 0 0 24m68 40H40a12 12 0 0 0 0 24h68a12 12 0 0 0 0-24m143.49-52.55a12 12 0 0 1-14.94 8L212 128.13V192a36 36 0 1 1-24-33.94V112a12 12 0 0 1 15.45-11.49l40 12a12 12 0 0 1 8.04 14.94M188 192a12 12 0 1 0-12 12a12 12 0 0 0 12-12"
            />
          </svg>
          <a className="link">Playlist</a>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4 22q-.825 0-1.412-.587T2 20V8q0-.625.338-1.125t.912-.725L15.9 1l.65 1.65L8.3 6H20q.825 0 1.413.588T22 8v12q0 .825-.587 1.413T20 22zm0-2h16v-7H4zm4-1q1.05 0 1.775-.725T10.5 16.5t-.725-1.775T8 14t-1.775.725T5.5 16.5t.725 1.775T8 19m-4-8h12V9h2v2h2V8H4zm0 9v-7z"
            />
          </svg>
          <a className="link">Radio</a>
        </li>
        <li>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.15.555a.39.39 0 0 0-.399 0a.26.26 0 0 0-.06.34c1.227 2.123 1.486 5.016-.19 6.611a5.5 5.5 0 0 1-1.495-1.994a3.88 3.88 0 0 0-1.995 3.49a4.69 4.69 0 0 0 4.987 4.488c3.211 0 4.877-1.994 4.986-4.488C12.114 6.01 9.99 2.33 6.15.555"
            />
          </svg>
          <a className="link">Trending</a>
        </li>
      </div>
      <div className="signout">
        <button className="signout-btn">Signout</button>
      </div>
    </div>
  );
}
