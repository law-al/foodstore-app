import { ImQuotesLeft } from "react-icons/im";
import { FaStar } from "react-icons/fa";

function Testimonial() {
  return (
    <section className="mx-auto py-[50px] px-[150px]">
      <p className="text-center text-2xl font-semibold mb-6 text-[var(--color-main)]">
        Testimonial
      </p>
      <h1 className="text-center mb-10 text-4xl font-semibold  text-[var(--color-sec)]">
        What Our Customer Saying
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#F5F9FA] border-t-2  border-t-[var(--color-main)] min-h-[350px] p-10 flex flex-col">
          <div className="mb-10">
            <ImQuotesLeft className="text-5xl text-[var(--color-main)]" />
          </div>

          <div className="">
            <p className="text-justify text-xl italic text-gray-500 mb-5">
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laborum, fugiat blanditiis praesentium dolor ipsa molestias sequi
              quam at nobis tenetur, amet corrupti, officiis iusto incidunt
              dolorum. Asperiores porro perferendis ex!"
            </p>

            <div className="flex items-center mb-5">
              <FaStar className="text-2xl text-[#F2B01E]" />
              <FaStar className="text-2xl text-[#F2B01E]" />
              <FaStar className="text-2xl text-[#F2B01E]" />
              <FaStar className="text-2xl text-[#F2B01E]" />
              <FaStar className="text-2xl text-[#F2B01E]" />
            </div>

            <div className="">
              <strong className="italic text-[var(--color-sec)] text-xl">
                Alina Parker
              </strong>
              <span className="italic text-[var(--color-main)] ml-3">
                CEO, GTD
              </span>
            </div>
          </div>
        </div>
        <div className="bg-[#F5F9FA] border-t-2  border-t-[var(--color-main)] min-h-[350px] p-10 flex flex-col">
          <div className="mb-10">
            <ImQuotesLeft className="text-5xl text-[var(--color-main)]" />
          </div>

          <div className="">
            <p className="text-justify text-xl italic text-gray-500 mb-5">
              "Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Laborum, fugiat blanditiis praesentium dolor ipsa molestias sequi
              quam at nobis tenetur, amet corrupti, officiis iusto incidunt
              dolorum. Asperiores porro perferendis ex!"
            </p>

            <div className="flex items-center mb-5">
              <FaStar className="text-2xl text-[#F2B01E]" />
              <FaStar className="text-2xl text-[#F2B01E]" />
              <FaStar className="text-2xl text-[#F2B01E]" />
              <FaStar className="text-2xl text-[#F2B01E]" />
              <FaStar className="text-2xl text-[#F2B01E]" />
            </div>

            <div className="">
              <strong className="italic text-[var(--color-sec)] text-xl">
                Kevin Andrew
              </strong>
              <span className="italic text-[var(--color-main)] ml-3">
                Manager, Rex
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
