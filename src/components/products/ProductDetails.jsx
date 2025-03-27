import { getProductDetails } from "@/redux/slices/productSlice";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { toast } from "sonner";

/* 
const product = {
  id: 1,
  name: "Orange Beverage",
  description:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquid commodi esse magnam quaerat quam. Amet aperiam sint vel dignissimos molestias! Ratione voluptate, cupiditate ea quod assumenda unde quaerat saepe amet modi dolore. Natus fugit odio temporibus veniam in delectus libero?",
  onSale: true,
  price: 15,
  discountPrice: 7.5,
  images: [
    "https://picsum.photos/100/100?random=1",
    "https://picsum.photos/100/100?random=2",
    "https://picsum.photos/100/100?random=3",
  ],
  rating: 5,
  comments: [],
  category: "Beverages",
  brand: "Sunny Grove",
  stock: 80,
  sku: "12LF",
  dietary: ["Vegan", "Gluten-Free"],
  size: "1 Liter",
  promotionId: 1,
};
// Optional: Promotion data to show the linkage

const promotions = [
  {
    id: 1,
    productId: [1, 2], // Applies to Orange Beverage and Horizon Milk
    discount: 50, // 50% off
    startDate: "2025-03-17",
    endDate: "2025-03-19",
    maxUnits: 100, // Total discounted units allowed
    active: true,
  },
];
*/

function ProductDetails() {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState("");

  const { productId } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (productId) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId]);

  function handleQuantity(e) {
    const value = Number(e.target.value);
    if (!value || value <= 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  }

  function handleAddToCart() {
    if (quantity <= 0) {
      setQuantity(1);
    }
    toast.success("Item added to cart", {
      duration: 1000,
    });
    return;
  }

  return (
    <div className="px-[150px] py-[100px]  relative z-[50]">
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <p>error fetching data</p>
      ) : selectedProduct ? (
        <div className="grid grid-cols-2">
          {/* Grid 1 */}
          <div className="flex gap-2 flex-col items-center p-6 ">
            {/* main img */}
            <div className="w-[400px] h-[400px] border border-black rounded-2xl overflow-hidden">
              <img
                src={`${mainImage || selectedProduct?.images[0]}`}
                alt="Product Image"
                className="w-full h-full object-cover"
              />
            </div>
            {/* sec imgs container */}
            <div className="flex items-center gap-10">
              {selectedProduct.images.map((image, i) => (
                <div
                  key={i}
                  className="w-[100px] h-[100px] border border-black rounded-xl object-cover overflow-hidden"
                >
                  <img
                    onClick={() => setMainImage(image)}
                    src={`${image}`}
                    alt="Product Sec Image"
                    className={`w-full cursor-pointer border  ${
                      image === mainImage
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Grid 2 */}
          <div className="p-5">
            <div className="mb-3">
              <p className="font-semibold text-xl mb-3">
                {selectedProduct.name}
              </p>
              <div className="flex gap-5 mb-3">
                <span
                  className={`${
                    selectedProduct.onSale
                      ? "line-through text-gray-400 scale-100"
                      : "text-[var(--color-main)] scale-125"
                  }`}
                >
                  ${selectedProduct.price}
                </span>
                <span
                  className={`${
                    selectedProduct.onSale
                      ? "block scale-125 text-[var(--color-main)]"
                      : "hidden"
                  }`}
                >
                  ${selectedProduct.discountPrice}
                </span>
              </div>
              <p className="text-justify">{selectedProduct.description}</p>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <input
                type="number"
                name="number"
                value={quantity}
                onChange={handleQuantity}
                id=""
                className="border border-[var(--color-main)] p-3 w-[15%] rounded-3xl focus:border-[var(--color-main)] focus:outline-0"
              />
              <button
                onClick={handleAddToCart}
                className=" py-3 px-6 rounded-3xl cursor-pointer bg-[var(--color-main)] text-white font-semibold"
              >
                Add to cart
              </button>
            </div>
            <div className="border-b border-b-gray-500 pb-10">
              <span className="flex mb-1">
                <p>Items:</p>
                <p className="text-[var(--color-main)] ml-2">
                  {selectedProduct.stocks}
                </p>
              </span>
              <span className="flex mb-1">
                <p>Category:</p>
                <p className="text-[var(--color-main)] ml-2">
                  {selectedProduct.category}
                </p>
              </span>
              <span className="flex">
                <p>Sku:</p>
                <p className="text-[var(--color-main)] ml-2">
                  {selectedProduct.sku}
                </p>
              </span>
            </div>

            <div className="">
              <div className="border-b py-3">
                <div
                  onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                  className="flex items-center justify-between mb-2 cursor-pointer"
                >
                  <p>Description</p>
                  <FaChevronDown
                    className={`${
                      isDescriptionOpen ? "-scale-y-100" : "scale-y-100"
                    }`}
                  />
                </div>

                {isDescriptionOpen && (
                  <div className="">{selectedProduct.description}</div>
                )}
              </div>

              <div className="border-b py-3">
                <div
                  onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  className="flex items-center justify-between mb-2 cursor-pointer"
                >
                  <p>Additional details</p>
                  <FaChevronDown
                    className={`${
                      isDetailsOpen ? "-scale-y-100" : "scale-y-100"
                    }`}
                  />
                </div>
                {isDetailsOpen && (
                  <div className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque quia nulla, dignissimos exercitationem laudantium
                    voluptas cupiditate accusamus sint officia rerum explicabo,
                    id facere illum natus!
                  </div>
                )}
              </div>

              <div className="border-b py-3">
                <div
                  onClick={() => setIsReviewOpen(!isReviewOpen)}
                  className="flex items-center justify-between mb-2 cursor-pointer"
                >
                  <p>Rewiews</p>
                  <FaChevronDown
                    className={`${
                      isReviewOpen ? "-scale-y-100" : "scale-y-100"
                    }`}
                  />
                </div>
                {isReviewOpen && (
                  <div className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque quia nulla, dignissimos exercitationem laudantium
                    voluptas cupiditate accusamus sint officia rerum explicabo,
                    id facere illum natus!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No products</p>
      )}
    </div>
  );
}

export default ProductDetails;
