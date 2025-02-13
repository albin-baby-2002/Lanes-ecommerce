import CategoryView from "@/sections/admin/categories/views/category-view";

const CategoriesPage = async ({searchParams}:{searchParams:{search:string}}) => {
  return <CategoryView  search={searchParams.search ||''}/>;
};

export default CategoriesPage;
