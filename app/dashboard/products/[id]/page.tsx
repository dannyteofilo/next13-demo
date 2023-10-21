import React from 'react'

const DetailProductPage = ({ params }: { params: { id: string } }) => {
  return (
    <h1>Product: {params.id}</h1>
  )
}

export default DetailProductPage
