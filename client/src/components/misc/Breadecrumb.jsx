import { Link, useLocation } from "react-router";

function Breadecrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const filteredPath = pathSegments.filter(
    (segment) => !/^[a-f0-9]{24}$/i.test(segment) // Remove MongoDB ObjectIDs
  );

  const BreadcrumbData = filteredPath.map((path) => {
    let label;
    path === ""
      ? (label = "Home")
      : (label = path.charAt(0).toUpperCase() + path.slice(1));
    return {
      label,
      link: `/${path}`,
    };
  });

  // console.log(filteredPath);

  return (
    <nav
      area-label="breadcrumb"
      className="absolute top-1/2 left-1/2  w-[400px] h-[150px] bg-white flex items-center -translate-y-1/2 -translate-x-1/2 p-3 z-[50]"
    >
      <ol className="flex justify-center text-xl text-center w-full font-semibold">
        {BreadcrumbData.map((data, index) => {
          return (
            <li key={index}>
              {index === BreadcrumbData.length - 1 ? (
                <span className="ml-1.5 inline text-main">{data.label}</span>
              ) : (
                <Link to={`${data.link}`} className="inline ml-1.5">
                  {data.label} /
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadecrumb;
