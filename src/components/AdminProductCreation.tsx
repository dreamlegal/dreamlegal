"use client"
import  AdminProductForm from "./AdminProductForm";
const AdminProductCreation = () => {
  return (
    <div className="font-clarity">
    <h1 className="text-xl font-bold">Add Product</h1>
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 mt-6">
        <div className="w-full col-span-3 shadow border px-5 py-6 rounded-lg">
          <div>
            {/* <ProductInfo editing={false} /> */}
            <AdminProductForm editing= {false}/>


            {/* Add more steps here */}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminProductCreation