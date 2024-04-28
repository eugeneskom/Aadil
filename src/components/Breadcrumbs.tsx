import React from 'react';
import { NavLink } from 'react-router-dom';

interface BreadcrumbProps {
  items: Array<{ label: string; path: string }>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  console.log(items, "Breadcrumb items")

  const currentPath = window.location.pathname;

  // Generate breadcrumb items


  console.log('breadcrumbItems',items)

  return (
<div className="bg-gray-100 py-4">
  <div className="container mx-auto">
    <ul className="flex items-center">
      {items.map((item, index) => (
        <li key={index} className="flex items-center">
          {index === items.length - 1 ? (
            <span className="text-gray-600">{item.label}</span>
          ) : (
            <NavLink
              to={item.path}
              className="text-white-500 hover:text-orange-500 font-medium"
            >
              {item.label}
            </NavLink>
          )}
          {index !== items.length - 1 && (
            <span className="mx-2 text-gray-400">/</span>
          )}
        </li>
      ))}
    </ul>
  </div>
</div>
    
  );
};

export default Breadcrumb;