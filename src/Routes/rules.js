import React from "react";
import { css } from "react-emotion";

export default props => (
  <div
    className={css`
      max-width: 475px;
    `}
  >
    <h1>Rules</h1>
    <p>
      Unstyled is a game with rules about what can and cannot be included in a
      website's design. Many of the fundamentals of web design, such as color,
      imagery, and typographic expression, the rules either prohibit their use
      or place extreme limitations on how they may be used. The goal of Unstyled
      is to design and create within these constraints.
    </p>
    <p>This page lists the rules of the game.</p>
    <h3>Style Properties & CSS</h3>
    <p>
      As a general rule, you may only use styles that are directly relate to
      layout. There are no limits on the method of implementation: files may
      include CSS or inline
      <code>style</code> properties.
    </p>
    <p>Layout-related styles include:</p>
    <ul>
      <li>CSS Grid (full spec)</li>
      <li>Flexbox (full spec)</li>
      <li>
        <code>margin</code>
      </li>
      <li>
        <code>padding</code>
      </li>
      <li>
        <code>width</code>
      </li>
      <li>
        <code>height</code>
      </li>
    </ul>
    <p>It is recommended that you use relative (em) distances.</p>
    <p>Media queries are permitted.</p>
    <h2>Typography</h2>
    <p>
      <strong>What's not allowed:</strong>
    </p>
    <p>
      For the most part, typographic styling is not permitted. You may not style
      elements with custom font sizes, text-decoration, colors, weights,
      typefaces, letter or word spacing.
    </p>
    <p>
      <strong>What is allowed:</strong>
    </p>
    <p>
      You may use the full range of default typography, including all heading
      clases, labels, paragraphs, lists, and inline elements, such as sup,
      small, and strong.
    </p>
    <p>
      You may also use layout-related text styles: tab-size, white-space,
      writing-mode, text-align, text-orientation, direction, and text-transform.
    </p>
    <pre>
      <code>
        {`
input, 
textarea, 
button, 
select {
	padding: 0.5em; 
	font-size: 1em;
}
	`}
      </code>
    </pre>
    <h3>Images</h3>
    <p>Images must not load automatically or without user action.</p>
    <p>Images may be shown when:</p>
    <ul>
      <li>they are linked to, opening in a new or current window</li>
      <li>
        they are loaded through user action, such as a "show image" button
      </li>
    </ul>
    <p>
      In the case of revealed images, an image must not be requested or loaded
      before the action.
    </p>
    <h3>Colors</h3>
    <p>
      Styling with color is not allowed. An Unstyled design should include no
      color apart from colors given by the browser to certain elements, such as
      links or focused inputs.
    </p>
    <div>
      <div
        key={`chip_tone`}
        className={css`
          height: 100px;
          width: 100px;
          background: var(--tone);
          border: var(--border);
          margin: 1em;
        `}
      />
      {["lighter", "light", "base", "dark", "darker"].map(n => {
        let tone = `var(--tone-${n})`;
        return (
          <div
            key={`chip_${n}`}
            className={css`
              height: 100px;
              width: 100px;
              background: ${tone};
              border: var(--border);
              margin: 1em;
            `}
          />
        );
      })}
    </div>

    <h3>Frameworks / Libraries</h3>
    <p>
      Unstyled makes no restrictions on frameworks or libraries, however they
      must not provide rule-breaking styling as part of the library. Styling
      libraries such as <code>emotion</code> are allowed, so long as they are
      used in accordance with the rules below.
    </p>
  </div>
);
