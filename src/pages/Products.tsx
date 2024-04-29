import React from 'react'
import ProductSection from '../components/ProductsSection'
import Breadcrumb from '../components/Breadcrumbs';
function Products() {
  const breadcrumbsProdPageHome = [
    { label: "Home", path: "/" },
    { label: `Products`, path: "/products" },
  ];

  
  return (
<div className='container'>
  <div className="mt-5 mb-5">
    <Breadcrumb items={breadcrumbsProdPageHome} />
  </div>
    <ProductSection/>
</div>
  )
}

export default Products