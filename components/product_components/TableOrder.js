export default function TableOrder({ cart }) {
  return (
    <div className="bg-secondary rounded-xl overflow-hidden border border-hover shadow-md">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-600">
              <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">
                Color
              </th>
              <th className="px-4 py-3 text-center text-xs font-bold text-white uppercase tracking-wider">
                Qty
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-right text-xs font-bold text-white uppercase tracking-wider">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-hover">
            {cart.map((item, i) => (
              <tr 
                key={i}
                className="hover:bg-third transition-colors duration-150"
              >
                <td className="px-4 py-3 text-sm font-medium text-primary">
                  {item.name.replace(/_/g, " ")}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    <span 
                      className="w-3 h-3 rounded-full border border-blue-300"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    {item.color}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 text-purple-800 text-sm font-bold">
                    {item.amount}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-primary">
                  ₹{item.price}
                </td>
                <td className="px-4 py-3 text-right text-base font-bold text-primary">
                  ₹{item.price * item.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
