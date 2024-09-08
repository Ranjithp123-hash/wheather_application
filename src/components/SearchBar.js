

const SearchBar = ({ setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Search cities..."
      onChange={handleInputChange}
    />
  );
};

export default SearchBar;
