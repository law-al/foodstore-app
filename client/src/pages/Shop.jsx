import { useEffect, useState } from "react";
import ShopGrid from "../components/products/ShopGrid";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByFilter } from "@/redux/slices/productSlice";
import { TailSpin } from "react-loader-spinner";

function Shop() {
  const [filters, setFilters] = useState({
    category: "all",
    sort: "default",
    page: 1,
    search: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error, totalItems } = useSelector(
    (state) => state.products
  );
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(products.length);

  useEffect(() => {
    dispatch(getProductsByFilter(filters));
  }, [dispatch, filters, searchParams]);

  // Update filters from URL params
  // Get query from URL and update the filter
  // if some query does not exist, set the filter to default
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      sort: params.sort || "default",
      page: +params.page || 1,
      search: params.search || "",
    });
  }, [searchParams]);

  // Updates url when filters changed
  // use URLSearchParms when you want to ulter the url
  useEffect(() => {
    const params = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) params.set(key, filters[key]);
    });
    setSearchParams(params);
    navigate(`/shop?${params.toString()}`);
  }, [filters, setSearchParams, navigate]);

  function handleOptionChange(e) {
    setFilters((prev) => ({ ...prev, sort: e.target.value, page: 1 }));
  }

  function handleCategoryChange(category) {
    setFilters((prev) => ({ ...prev, category, page: 1 }));
  }

  // console.log(products.length);
  let pages = Math.ceil(totalItems / 8);

  function handlePage(action) {
    setFilters((prev) => {
      if (action === "left" && prev.page > 1) {
        return { ...prev, page: prev.page - 1 };
      } else if (action === "right" && prev.page < pages) {
        return { ...prev, page: prev.page + 1 };
      }
      return prev;
    });
  }

  function handlePageChange(pageNumber) {
    setFilters((prev) => ({ ...prev, page: pageNumber }));
  }

  const categories = ["all", "food", "fruit", "health", "meat", "dairy"];

  return (
    <section className="px-[150px] py-[100px] relative z-[50]">
      <div className="w-full flex justify-between items-center mb-20">
        <p>Showing all {totalItems} result</p>

        <div className="flex items-center gap-4">
          {categories.map((category, i) => (
            <div
              key={i}
              onClick={() => handleCategoryChange(category)}
              className={`capitalize font-semibold cursor-pointer hover:text-[var(--color-main)] transition-all duration-150 ${
                filters.category === category
                  ? "text-[var(--color-main)]"
                  : "text-black"
              }`}
            >
              {category}
            </div>
          ))}
        </div>

        <select
          name="sort"
          id="sort-options"
          value={filters.sort}
          onChange={handleOptionChange}
          className="border border-black p-3"
        >
          <option value="default">Default sorting</option>
          <option value="popularity">Sort by Popularity</option>
          <option value="rating">Sort by average rating</option>
          <option value="latest">Sort by latest</option>
          <option value="priceAsc">Sort by price: low to high</option>
          <option value="priceDesc">Sort by price: high to low</option>
        </select>
      </div>

      {loading ? (
        <div className="px-[150px] py-[100px] flex items-center justify-center">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#aacb22"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : error ? (
        <p>Error loading products</p>
      ) : products.length > 0 ? (
        <div className="mb-8">
          <ShopGrid products={products} />
        </div>
      ) : (
        <p>No Products</p>
      )}

      {products?.length > 0 && (
        <div className="flex items-center justify-center gap-8">
          <div className="cursor-pointer" onClick={() => handlePage("left")}>
            &larr;
          </div>

          {(() => {
            // If the current page (filters.page) is near the beginning, show pages 1-10.
            // If the current page is near the end, show the last 10 pages.
            // Otherwise, the current page stays in the middle, displaying 5 pages before and 5 after.

            // Calculate the range to display
            let start, end;

            if (pages <= 10) {
              // If we have 10 or fewer pages, show all
              start = 0;
              end = pages;
            } else {
              // Calculate the range based on current page
              // Show current page in the middle when possible
              const halfDisplay = 5;

              if (filters.page <= halfDisplay) {
                // Near the beginning
                start = 0;
                end = 10;
              } else if (filters.page > pages - halfDisplay) {
                // Near the end
                start = pages - 10;
                end = pages;
              } else {
                // Somewhere in the middle
                start = filters.page - halfDisplay - 1;
                end = filters.page + halfDisplay - 1;
              }
            }

            return Array.from({ length: end - start }, (_, i) => {
              const pageNumber = start + i + 1;
              return (
                <div
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`text-xl font-semibold w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer ${
                    filters.page === pageNumber
                      ? "bg-[var(--color-main)] text-white "
                      : ""
                  }`}
                >
                  {pageNumber}
                </div>
              );
            });
          })()}
          <div onClick={() => handlePage("right")} className="cursor-pointer">
            &rarr;
          </div>
        </div>
      )}

      {/* "use client";

import OrderTabbedComponent from "@/components/OrderTabbedComponent";
import PaginationComponent from "@/components/PaginationComponent";
import OrderTable from "@/components/tables/OrderTable";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import DatePicker from "@/components/utils/DatePicker";
import ExportButton from "@/components/utils/ExportButton";
import GenerateTableHeader from "@/components/utils/GenerateTableHeader";
import ProductDropdown from "@/components/utils/ProductDropdown";
import { orders } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <section>
      <div className="m-2 p-2 md:px-0 md:py-2 md:m-0 bg-white md:bg-none rounded-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
          <div className="font-semibold text-[16px] m-2 md:m-0">
            <OrderTabbedComponent />
          </div>
          <div className="flex flex-wrap md:w-fit items-center justify-between md:justify-start gap-2">
            <div className="order-3 md:order-2 w-full md:w-fit">
              <DatePicker />
            </div>

            <div className="order-2 md:order-3">
              <ExportButton />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2">
        <PaginationComponent items={orders}>
          {({ currentItems }) => (
            <>
              <OrderTable currentItems={currentItems} />
            </>
          )}
        </PaginationComponent>
      </div>
    </section>
  );
} */}
    </section>
  );
}

export default Shop;
