"use client";

const CategorySelector = ({
  categories,
  selectedCategories,
  setSelectedCategories,
}: {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories((prev) => [...prev, category]);
    }
  };
  const removeCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      const removedList = selectedCategories.filter(
        (data) => data !== category
      );
      setSelectedCategories(removedList);
    }
  };

  const resetCategory = () => {
    setSelectedCategories([]);
  };

  return (
    <div>
      <div className="flex items-center mt-4">
        {categories.map((category) => (
          <div
            key={category}
            onClick={() => {
              if (selectedCategories.includes(category)) {
                removeCategory(category);
              } else {
                addCategory(category);
              }
            }}
            className={`w-fit min-w-fit h-8 mx-2 px-5 py-2 flex flex-row justify-center items-center font-utendo text-md border border-main-black bg-main-black break-keep rounded-3xl cursor-pointer 
                                        ${
                                          selectedCategories.includes(category)
                                            ? "bg-main-black text-white-soft"
                                            : "bg-main-white text-black  "
                                        }`}
          >
            {category}
          </div>
        ))}
        <h1
          className="cursor-pointer text-black underline underline-offset-1 ml-5 hidden md:block"
          onClick={() => resetCategory()}
        >
          Clear
        </h1>
      </div>
    </div>
  );
};

export default CategorySelector;
