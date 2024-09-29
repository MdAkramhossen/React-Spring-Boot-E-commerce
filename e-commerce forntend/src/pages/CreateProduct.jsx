import axios from "axios";
import { useState } from "react";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState(false);
  const [colors, setColors] = useState([]);
  const [error, setError] = useState("");

  const colorOptions = ["Red", "Green", "Blue", "Yellow", "Black", "White"];

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert selected colors into objects as required by the backend
    const colorObjects = colors.map((color) => ({ color }));

    const productDTO = {
      name,
      price,
      company,
      description,
      category,
      shipping,
      colors: colorObjects, // This will be an array of objects
    };

    const formData = new FormData();
    formData.append(
      "productDTO",
      new Blob([JSON.stringify(productDTO)], { type: "application/json" })
    );
    formData.append("image", image);
    const token = localStorage.getItem("token");
    try {
      console.log(token);

      const response = await axios.post(
        "http://localhost:8080/api/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Product created successfully:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Failed to create product. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center">Create New Product</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Product Name"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Product Price"
                required
              />
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Company Name"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Category"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Product Description"
              required
            />
          </div>

          {/* Shipping */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="shipping"
              checked={shipping}
              onChange={(e) => setShipping(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label
              htmlFor="shipping"
              className="ml-2 block text-sm text-gray-900"
            >
              Free Shipping
            </label>
          </div>

          {/* Colors (Multi-select) */}
          <div>
            <label
              htmlFor="colors"
              className="block text-sm font-medium text-gray-700"
            >
              Colors
            </label>
            <select
              multiple
              id="colors"
              value={colors}
              onChange={(e) =>
                setColors(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {colorOptions.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
              Product Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
