import { useState } from "react";

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [isStockOnly, setStockOnly] = useState(false);

  return (
    <div className="flex-direction-column">
      <SearchBar 
        filterText={filterText} 
        isStockOnly={isStockOnly}
        onFilterTextChange={setFilterText}
        onIsStockOnlyChange={setStockOnly} />
      <ProductTable 
        products={products} 
        filterText={filterText} 
        isStockOnly={isStockOnly}
        onFilterTextChange={setFilterText}
        onIsStockOnlyChange={setStockOnly} />
    </div>
  );
}

function SearchBar({ filterText, isStockOnly, onFilterTextChange, onIsStockOnlyChange }) {
  return (
    <div className="align-left">
      <input 
        type="text" 
        placeholder="Search..." 
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}/>
      <div>
        <input 
          type="checkbox" 
          value={isStockOnly} 
          onChange={(e) => onIsStockOnlyChange(e.target.checked)}/>
        <label htmlFor="">Only show products in stock</label>
      </div>
    </div>
  );
}

function ProductTable({ products, filterText, isStockOnly }) {
  const rows = [];
  let lastCategory = null;

  products.forEach(product => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1)
      return;
    if (isStockOnly && !product.stocked)
      return;
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow key={product.category} category={product.category} />
      );
      lastCategory = product.category;
    }
    rows.push(
      <ProductRow key={product.name} product={product} />
    );
  });

  return (
    <table className="margin-top-20px">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
}

function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

function ProductRow({ product }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function ProductApp() {
  return <FilterableProductTable products={PRODUCTS} />;
}
