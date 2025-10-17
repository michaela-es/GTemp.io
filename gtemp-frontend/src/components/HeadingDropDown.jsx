import React from 'react';
import { Link } from 'react-router-dom';

const HeadingDropDown = ({ menuItems }) => {
  return (
    <div className="dropdown">
      {menuItems.map((section, idx) => (
        <div key={idx} className="dropdown-section">
          <div className="dropdown-heading">{section.heading}</div>
          {section.items.map((item, itemIdx) => {
            if (item.type === 'button') {
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

            return (
              <Link
                key={itemIdx}
                to={item.href}
                className={`dropdown-item ${item.highlight ? 'highlight' : ''}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default HeadingDropDown;
