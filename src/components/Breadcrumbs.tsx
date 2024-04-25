import React from 'react';
import { NavLink } from 'react-router-dom';

interface BreadcrumbProps {
  items: Array<{ label: string; path: string }>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  console.log(items, "Breadcrumb items")

  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/').filter(part => part.trim() !== ''); // Split the path and remove empty parts

  // Generate breadcrumb items
  const breadcrumbItems = pathParts.map((part, index) => {
    const label = part.replace(/-/g, ' '); // Convert dash-separated words to space-separated
    const path = `/${pathParts.slice(0, index + 1).join('/')}`; // Construct path up to the current part
    return { label, path };
  });


  console.log('breadcrumbItems')

  return (
    <div className=" ">
    <ul  >
      {items.map((item, index) => (
        <li key={index}  >
          {index === items.length - 1 ? (
            <span >{item.label}</span>
          ) : (
            <NavLink
              to={item.path} 
            >
              {item.label}
            </NavLink>
          )}
          {index !== items.length - 1 && (
            <span  >/</span>
          )}
          </li>
      ))}
    </ul>
  </div>
    
  );
};

export default Breadcrumb;