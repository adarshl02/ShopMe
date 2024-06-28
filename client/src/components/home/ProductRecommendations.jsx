import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { Link } from "react-router-dom";

const ProductRecommendations = ({products=[]}) => {
  
  const { similarItemsId } = useContext(DataContext);

  const callouts = products.filter(product => similarItemsId.includes(product.id));

  return (
    <div style={{background:'var(--body_background)'}} >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-8 sm:py-12 lg:max-w-none lg:py-16">
          <h2 className="text-2xl font-bold text-gray-900">Based on your previous Orders</h2>

          {callouts && callouts.length > 0 ? (
            <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">


              {callouts.map((product) => (
                  <Link to={`product/${product.id}`} style={{ textDecoration: 'none' }} key={product.id}>
                
                <div key={product.id} className="group relative">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg bg-white  group-hover:opacity-75">
                    <img
                      src={product.url}
                      alt={product.title.shortTitle}
                      className="h-full w-full object-contain object-center"
                    />
                    
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                   
                      <span className="absolute inset-0" />
                      {product.title.shortTitle}
                    
                  </h3>
                  <p className="text-base font-semibold text-gray-900">{product.title.longTitle}</p>
                </div>
                </Link>

              ))}
            </div>
          ) : (
            <>
              <h3>Order something Now</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendations;