import React from 'react'
import { useParams } from 'react-router-dom'

function BrandPage() {
  const {brandId} = useParams()
  return (
    <section className='brand-page'> 
      <div className="container">
      <h1>BrandPage {brandId}</h1>

      </div>
    </section>
  )
}

export default BrandPage