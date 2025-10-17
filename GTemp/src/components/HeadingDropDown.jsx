import React from 'react';

const HeadingDropDown = ({ menuItems }) => {
  return (
    <div className="dropdown">
      {menuItems.map((section, idx) => (
        <div key={idx} className="dropdown-section">
          <div className="dropdown-heading">{section.heading}</div>
          {section.items.map((item, itemIdx) => {
            if (item.type === 'button') {
              // Render button for actions like logout
              return (
                <button
                  key={itemIdx}
                  className={`dropdown-item button-item ${item.highlight ? 'highlight' : ''}`}
                  onClick={item.onClick}
                  type="button"
                >
                  {item.label}
                </button>
              );
            }
            // Default: link
            return (
              <a
                key={itemIdx}
                href={item.href}
                className={`dropdown-item ${item.highlight ? 'highlight' : ''}`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default HeadingDropDown;
