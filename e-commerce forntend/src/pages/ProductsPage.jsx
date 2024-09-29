import PageHero from "../components/PageHero";
import Filters from "../components/Filters";
import Sort from "../components/Sort";
import ProductList from "../components/ProductList";

const Product = () => {
  return (
    <div className="mx-auto max-w-7xl px-8 py-20  ">
      <div>
        <Filters />
      </div>

      <div>
        <ProductList />
      </div>
    </div>
  );
};

export default Product;
