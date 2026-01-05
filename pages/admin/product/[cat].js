import { server } from "../../../config";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AdminProduts from "../../../components/admin/AdminProduts";
import authHandler from "../../../shared/utils/auth/authHandler";

export default function cats({ allProducts, allCategories, query }) {
  const [products, setProducts] = useState(allProducts);
  const [selectedCategory, setSelectedCategory] = useState(query);
  
  //pushing query when category change
  useEffect(() => {
    setProducts(allProducts);
    setSelectedCategory(query);
  }, [query, allProducts]);

  const router = useRouter();
  const queryHandler = (cat) => {
    router.push(`/admin/product/${cat}`);
  };

  return (
    <div className="bg-primary min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-6">Product Management</h1>
          
          {/* Filter Section */}
          <div className="bg-secondary rounded-2xl p-6 border-2 border-hover shadow-lg">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex-1">
                <label className="flex items-center gap-2 text-sm font-bold text-primary mb-3 uppercase tracking-wide">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                  </svg>
                  Filter by Category
                </label>
                <select
                  className="w-full md:min-w-[300px] bg-third text-primary border-2 border-hover rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none font-medium shadow-sm hover:shadow-md cursor-pointer"
                  name="categories"
                  value={selectedCategory}
                  onChange={(e) => {
                    queryHandler(e.target.value);
                  }}
                >
                  {allCategories.map((cat, i) => (
                    <option key={i} value={cat} className="bg-third text-primary py-2">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-3 rounded-xl shadow-md">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                </svg>
                <div>
                  <div className="text-xs font-medium opacity-90">Total Products</div>
                  <div className="text-2xl font-bold">{products.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {products.length > 0 ? (
          <div className="space-y-6">
            {products.map((product, i) => {
              return (
                <AdminProduts
                  key={product._id}
                  product={product}
                  index={i}
                  setProducts={setProducts}
                  products={products}
                />
              );
            })}
          </div>
        ) : (
          <div className="bg-secondary rounded-2xl p-16 border-2 border-dashed border-hover text-center shadow-lg">
            <div className="text-8xl mb-6 opacity-50">🔍</div>
            <h3 className="text-2xl font-bold text-primary mb-3">No Products Found</h3>
            <p className="text-secondary text-lg mb-8 max-w-md mx-auto">
              No products match the selected category "<span className="font-semibold text-primary">{selectedCategory}</span>".
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={() => router.push('/admin/product/create')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg font-bold flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Create New Product
              </button>
              <button
                onClick={() => router.push('/admin/product/all')}
                className="px-8 py-4 bg-third hover:bg-hover text-primary border-2 border-hover rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg font-bold flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
                View All Products
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { authorized } = await authHandler(
    context.req,
    context.res,
    true
  );

  if (authorized) {
    const query = context.params.cat;
    const productsData = await fetch(
      `${server}/api/product/crud?cat=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const catsData = await fetch(`${server}/api/product/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const allProducts = await productsData.json();
    const allCategories = await catsData.json();

    return {
      props: { allProducts, allCategories, query },
    };
  } else {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
}
